from rest_framework import viewsets, status, mixins, permissions
from rest_framework.response import Response


from . import CustomPagination
from ..services import PostHelpers
from ..serializers import (
    PostCreateSerializer,
    PostSerializer,
)
from ..models import Coin, Post, Tag


class PostViewSet(viewsets.ModelViewSet):
    pagination_class = CustomPagination
    serializer_class = PostSerializer

    def get_queryset(self):
        queryset = Post.objects.select_related("coin").prefetch_related("tag").all()

        # tag filter
        queryset = PostHelpers.filter_by_tag(self.request, queryset)

        # return filtered by date
        return PostHelpers.filter_by_date(self.request, queryset)

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


class PostFeedViewList(mixins.ListModelMixin, viewsets.GenericViewSet):
    permission_classes = [permissions.IsAuthenticated]
    pagination_class = CustomPagination
    serializer_class = PostSerializer

    def list(self, request):
        queryset = Post.objects.filter(coin__in=request.user.coin_set.all())
        
        # tag filter
        request = PostHelpers.filter_by_tag(self.request, queryset)
        # date filter
        queryset = PostHelpers.filter_by_date(self.request, queryset)

        page = self.paginate_queryset(queryset)
        if page is not None:
            serializer = PostSerializer(page, many=True)
            return self.get_paginated_response(serializer.data)
        serializer = PostSerializer(queryset, many=True)
        return Response(serializer.data)
