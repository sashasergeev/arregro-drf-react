from django.urls import path

from .consumers import PriceConsumer

ws_urlpatterns = [
    path("ws/prices/", PriceConsumer.as_asgi()),
]
