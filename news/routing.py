from django.urls import path

from .consumers import NewPostCunsumer, PriceConsumer

ws_urlpatterns = [
    path("ws/prices/", PriceConsumer.as_asgi()),
    path("ws/new-post/", NewPostCunsumer.as_asgi()),
]
