import os
from datetime import date, timedelta

from rest_framework.response import Response
from rest_framework import viewsets, mixins, permissions, generics
from rest_framework.decorators import action
from django.http.response import JsonResponse

from . import CustomPagination
from ..serializers import (
    CoinDetailSerializer,
    CoinSerializer,
    CoinSubmitSerializer,
    CoinSearchSerializer,
    CoinTrendingSerializer
)
from ..models import Coin, Github
from ..tasks import observe_github_activity


class CoinViewSet(viewsets.ReadOnlyModelViewSet):
    pagination_class = CustomPagination
    serializer_class = CoinSerializer
    queryset = Coin.objects.all()

    def list(self, request):
        page = self.paginate_queryset(self.queryset)
        serializer = CoinSerializer(page, many=True)
        if page is not None:
            serializer.context["request"] = self.request
            return self.get_paginated_response(serializer.data)
        return Response(serializer.data)

    def retrieve(self, request, *args, **kwargs):
        instance = self.get_object()
        serializer = CoinDetailSerializer(instance)
        serializer.context["request"] = request
        return Response(serializer.data)

    @action(
        methods=["post"],
        detail=False,
        permission_classes=[permissions.IsAuthenticated],
        url_path="following",
        url_name="following",
    )
    def followUnfollow(self, request):
        coin_id = request.data["coin_id"]
        coin = Coin.objects.get(id=coin_id)
        action = request.data["action"]
        if action == "follow":
            request.user.coin_set.add(coin)
        else:
            request.user.coin_set.remove(coin)

        return Response({"status": "followed" if action == "follow" else "unfollowed"})

    @action(
        detail=False,
        methods=["get"],
        url_path=r"gh_plot_data/(?P<github>([A-Za-z0-9_-]+))",
        url_name="gh_plot_data",
    )
    def get_github_activity(self, request, github=None):
        if github is None:
            return Response({"detail": "closed repo"})
        ghObj = Github.objects.get(name=github)

        # case when this data needs to be updated
        # - data needs to be updated 3d after its been created
        threeDaysAgo = date.today() - timedelta(days=3)
        isOutdated = ghObj.updated_at < threeDaysAgo
        if isOutdated:
            observe_github_activity.delay(github, os.environ.get("GITHUB_API_KEY"))

        return Response(ghObj.plotData)


class CoinSearchViewList(mixins.ListModelMixin, viewsets.GenericViewSet):
    queryset = Coin.objects.all()
    serializer_class = CoinSearchSerializer


class CoinSubmitCreate(generics.GenericAPIView):
    serializer_class = CoinSubmitSerializer

    def post(self, request, *args, **kwargs):
        serializer = self.get_serializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        serializer.save()
        return JsonResponse({"status": "submitted"})


class TrendingViewList(mixins.ListModelMixin, viewsets.GenericViewSet):
    def list(self, request):
        queryset = Coin.objects.exclude(prices__price_change24h__isnull=True).order_by(
            "-prices__price_change24h"
        )
        gainers = CoinTrendingSerializer(queryset[:10], many=True)
        losers = CoinTrendingSerializer(queryset.reverse()[:10], many=True)
        return Response({"gainers": gainers.data, "losers": losers.data})
