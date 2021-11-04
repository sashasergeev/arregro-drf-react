from django.urls import path, include

from .views import (
    LoginApi,
    NotificationListView,
    RegisterApi,
    UserApi,
)
from knox import views as knox_views
from rest_framework.routers import DefaultRouter

urlpatterns = [
    path("auth", include("knox.urls")),
    path("auth/register", RegisterApi.as_view()),
    path("auth/login", LoginApi.as_view()),
    path("auth/user", UserApi.as_view()),
    path("auth/logout", knox_views.LogoutView.as_view(), name="knox_logout"),
]

router = DefaultRouter()
router.register(r"notifications", NotificationListView, basename="notifications")
urlpatterns += router.urls
