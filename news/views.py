from django.http.response import JsonResponse
from django.shortcuts import get_object_or_404
from django.db.models import Count

from rest_framework import serializers, viewsets, mixins, permissions, generics

from rest_framework.response import Response
from rest_framework.pagination import PageNumberPagination
from rest_framework.decorators import action

from .serializers import (
    CoinDetailSerializer,
    CoinSerializer,
    CoinSubmitSerializer,
    PostSerializer,
    PostsByTagSerializer,
    TagSerializer,
    CoinSearchSerializer,
)
from .models import Coin, Post, Tag


class CustomPagination(PageNumberPagination):
    page_size = 8


class PostViewSet(viewsets.ReadOnlyModelViewSet):
    pagination_class = CustomPagination
    serializer_class = PostSerializer

    def get_queryset(self):
        queryset = Post.objects.all()
        filter_value = self.request.query_params.get("tag", None)
        if filter_value is not None:
            queryset = queryset.filter(tag__tag=filter_value)
        return queryset


class CoinViewSet(viewsets.ReadOnlyModelViewSet):
    pagination_class = CustomPagination
    serializer_class = CoinSerializer
    queryset = Coin.objects.all()

    def list(self, request):
        queryset = Coin.objects.all()
        page = self.paginate_queryset(queryset)
        if page is not None:
            serializer = CoinSerializer(page, many=True)
            serializer.context["request"] = self.request
            return self.get_paginated_response(serializer.data)
        serializer = CoinSerializer(queryset, many=True)
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

    def retrieve(self, request, pk=None):
        queryset = Tag.objects.all()
        tag = get_object_or_404(queryset, pk=pk)
        serializer = PostsByTagSerializer(tag)
        return Response(serializer.data)


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
    queryset = Coin.objects.only("id", "name", "ticker", "img_link")
    serializer_class = CoinSearchSerializer


class CoinSubmitCreate(generics.GenericAPIView):
    serializer_class = CoinSubmitSerializer

    def post(self, request, *args, **kwargs):
        serializer = self.get_serializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        serializer.save()
        return JsonResponse({"status": "submitted"})
