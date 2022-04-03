from rest_framework import viewsets
from rest_framework.response import Response
from rest_framework.decorators import action
from django.db.models import Count
from django.core.cache import cache

from ..serializers import TagSerializer
from ..models import Tag
from ..services import TagHelpers


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
        coinid = request.GET.get("coinid", None)

        cacheKey = f"{date}-{coinid or -1}"
        content = cache.get(cacheKey) 

        # this function is takes some time to execute,
        # so i wrapped it in cache to boost performance
        if not content:
            tags = Tag.objects.all()
            content = TagHelpers.get_stats(tags, date, coinid)
            cache.set(cacheKey, content, 1800)

        return Response(content)
