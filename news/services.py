from datetime import timedelta, datetime

from django.db.models import Count, Avg, FloatField
from django.db.models.functions import Cast


class PostHelpers:
    """
        Helper functions for posts views
    """

    @staticmethod
    def filter_by_date(request, queryset):
        filter_from = request.query_params.get("from", None)
        filter_to = request.query_params.get("to", None)
        if filter_from and filter_to:
            queryset = queryset.filter(date_added__range=(filter_from, filter_to))
        elif filter_from:
            queryset = queryset.filter(date_added__gte=filter_from)
        elif filter_to:
            queryset = queryset.filter(date_added__lte=filter_to)
        return queryset

    @staticmethod
    def filter_by_tag(request, queryset):
        filter_tag = request.query_params.get("tag", None)
        if filter_tag:
            queryset = queryset.filter(tag__tag=filter_tag)
        return queryset
    

class TagHelpers:
    """
        Helper functions for tags views
    """

    dates = {
        "TODAY": 1,
        "MONTH": 30,
        "YEAR": 365,
    }

    @classmethod
    def get_stats(cls, queryset, date ,coinid):
        if not date and not coinid:
            tags = queryset
        elif not date and coinid:
            tags = queryset.filter(post__coin__id=coinid)
        elif date and not coinid:
            tags = queryset.filter(post__date_added__gte=datetime.today() - timedelta(days=cls.dates[date]))
        elif date and coinid:
            tags = queryset.filter(post__coin__id=coinid)
            tags = tags.filter(post__date_added__gte=datetime.today() - timedelta(days=cls.dates[date]))


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
                .exclude(price2hr="")
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
        
        return content
