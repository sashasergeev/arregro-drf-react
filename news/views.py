from django.http.response import JsonResponse
from django.db.models import Count, Avg, FloatField
from django.db.models.functions import Cast

from datetime import datetime, timedelta

from rest_framework import status, viewsets, mixins, permissions, generics
from rest_framework.response import Response
from rest_framework.pagination import PageNumberPagination
from rest_framework.decorators import action

from .serializers import (
    CoinDetailSerializer,
    CoinSerializer,
    CoinSubmitSerializer,
    CoinTrendingSerializer,
    PostCreateSerializer,
    PostSerializer,
    TagSerializer,
    CoinSearchSerializer,
)
from .models import Coin, Post, Tag


class CustomPagination(PageNumberPagination):
    page_size = 8


class PostViewSet(viewsets.ModelViewSet):
    pagination_class = CustomPagination
    serializer_class = PostSerializer

    def get_queryset(self):
        queryset = Post.objects.select_related("coin").prefetch_related("tag").all()

        # tag filter
        filter_tag = self.request.query_params.get("tag", None)
        if filter_tag:
            queryset = queryset.filter(tag__tag=filter_tag)

        # date filter
        filter_from = self.request.query_params.get("from", None)
        filter_to = self.request.query_params.get("to", None)
        if filter_from and filter_to:
            queryset = queryset.filter(date_added__range=(filter_from, filter_to))
        elif filter_from:
            queryset = queryset.filter(date_added__gte=filter_from)
        elif filter_to:
            queryset = queryset.filter(date_added__lte=filter_to)
        return queryset

    def create(self, request, *args, **kwargs):
        coin = Coin.objects.get(tg_pure_id=request.data["chat_id"])
        data = {
            "coin": coin.pk,
            "tag": Tag.objects.filter(tag__in=request.data.getlist("tags")).values_list(
                "pk", flat=True
            ),
            "price": coin.prices.price,
            "message": request.data["message"],
        }
        serializer = PostCreateSerializer(data=data)
        serializer.is_valid(raise_exception=True)
        self.perform_create(serializer)
        headers = self.get_success_headers(serializer.data)
        return Response(
            serializer.data, status=status.HTTP_201_CREATED, headers=headers
        )


class CoinViewSet(viewsets.ReadOnlyModelViewSet):
    pagination_class = CustomPagination
    serializer_class = CoinSerializer
    queryset = Coin.objects.all()

    def list(self, request):
        queryset = Coin.objects.all()
        page = self.paginate_queryset(queryset)
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


class TagViewSet(viewsets.ViewSet):
    def list(self, request):
        queryset = Tag.objects.annotate(tag_count=Count("post")).order_by("-tag_count")
        serializer = TagSerializer(queryset, many=True)
        return Response(serializer.data)

    @action(
        methods=["get"],
        detail=False,
        url_path="stat",
        url_name="stat",
    )
    def tagStatistic(self, request):
        date = request.GET.get("date", None)
        dates = {
            "TODAY": 1,
            "MONTH": 30,
            "YEAR": 365,
        }
        if date is None or date == "":
            tags = Tag.objects.all()
        else:
            tags = Tag.objects.filter(
                post__date_added__gte=datetime.today() - timedelta(days=dates[date])
            )

        tags = tags.annotate(tag_count=Count("post")).order_by("-tag_count")
        content = []
        for tag in tags:
            onehr = (
                tag.post_set.exclude(price1hr__isnull=True)
                .exclude(price1hr="")
                .annotate(
                    oneHrCh=(
                        Cast("price1hr", FloatField()) / Cast("price", FloatField()) - 1
                    )
                    * 100
                )
                .aggregate(oneHr=Avg("oneHrCh"))
            )
            twohr = (
                tag.post_set.exclude(price2hr__isnull=True)
                .exclude(price1hr="")
                .annotate(
                    twoHrCh=(
                        Cast("price2hr", FloatField()) / Cast("price", FloatField()) - 1
                    )
                    * 100
                )
                .aggregate(twoHr=Avg("twoHrCh"))
            )
            tagContent = {
                "tag": tag.tag,
                "count": tag.tag_count,
                "oneHrChangeAvg": onehr["oneHr"],
                "twoHrChangeAvg": twohr["twoHr"],
            }
            content.append(tagContent)
        return Response(content)


class PostFeedViewList(mixins.ListModelMixin, viewsets.GenericViewSet):
    permission_classes = [permissions.IsAuthenticated]
    pagination_class = CustomPagination
    serializer_class = PostSerializer

    def list(self, request):
        queryset = Post.objects.filter(coin__in=request.user.coin_set.all())
        page = self.paginate_queryset(queryset)
        if page is not None:
            serializer = PostSerializer(page, many=True)
            return self.get_paginated_response(serializer.data)
        serializer = PostSerializer(queryset, many=True)
        return Response(serializer.data)


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
