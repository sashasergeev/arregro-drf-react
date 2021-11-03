from django.db import models
from django.contrib.auth.models import User
from news.models import Coin


class Notification(models.Model):
    coin = models.ForeignKey(Coin, related_name="nots", on_delete=models.CASCADE)
    to_user = models.ForeignKey(
        User, related_name="notifications", on_delete=models.CASCADE
    )
    read = models.BooleanField(default=False)
    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return f"{self.coin} notification to {self.to_user}"
