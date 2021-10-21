from .views import (
    CoinViewSet,
    PostViewSet,
    TagViewSet,
    PostFeedViewList,
    CoinSearchViewList,
    CoinSubmitCreate,
    TrendingViewList,
)
from rest_framework.routers import DefaultRouter
from django.urls import path

router = DefaultRouter()
router.register(r"posts", PostViewSet, basename="posts")
router.register(r"coins", CoinViewSet, basename="coins")
router.register(r"tags", TagViewSet, basename="tags")
router.register(r"feed", PostFeedViewList, basename="feed")
router.register(r"trending", TrendingViewList, basename="trending")
router.register(r"coinsearch", CoinSearchViewList, basename="coin_search")

urlpatterns = router.urls

urlpatterns += [path("submit-coin/", CoinSubmitCreate.as_view())]
