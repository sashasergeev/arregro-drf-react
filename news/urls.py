from .views import CoinViewSet, PostViewSet, TagViewSet, PostFeedViewList, CoinSearchViewList
from rest_framework.routers import DefaultRouter

router = DefaultRouter()
router.register(r"posts", PostViewSet, basename="posts")
router.register(r"coins", CoinViewSet, basename="coins")
router.register(r"tags", TagViewSet, basename="tags")
router.register(r"feed", PostFeedViewList, basename="feed")
router.register(r"coinsearch", CoinSearchViewList, basename="coin_search")

urlpatterns = router.urls