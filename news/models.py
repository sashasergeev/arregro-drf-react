from django.db import models
from django.utils import timezone
import math
from django.contrib.auth.models import User


class Coin(models.Model):
    name = models.CharField(max_length=50)
    ticker = models.CharField(max_length=10, blank=True)
    tg_link = models.URLField()
    tg_id = models.CharField(max_length=20)
    tg_pure_id = models.CharField(max_length=20)
    cg_link = models.URLField()
    img_link = models.URLField()
    followers = models.ManyToManyField(User)

    def __str__(self):
        return self.name


class Tag(models.Model):
    tag = models.CharField(max_length=50)

    def __str__(self):
        return self.tag


class Post(models.Model):
    coin = models.ForeignKey(Coin, related_name="posts", on_delete=models.CASCADE)
    message = models.TextField()
    date_added = models.DateTimeField(auto_now_add=True)
    price = models.CharField(max_length=50)
    price1hr = models.CharField(max_length=50, blank=True)
    price2hr = models.CharField(max_length=50, blank=True)
    tag = models.ManyToManyField(Tag, blank=True)

    class Meta:
        ordering = ["-date_added"]

    def __str__(self):
        return f"{self.coin.name} - {self.message[:50]}"

    def fuckquestions(self):
        text = self.message.replace("?", "")
        return text

    def whenpublished(self):
        now = timezone.now()

        diff = now - self.date_added

        if diff.days == 0 and diff.seconds >= 0 and diff.seconds < 60:
            seconds = diff.seconds

            if seconds == 1:
                return str(seconds) + " second ago"

            else:
                return str(seconds) + " seconds ago"

        if diff.days == 0 and diff.seconds >= 60 and diff.seconds < 3600:
            minutes = math.floor(diff.seconds / 60)

            if minutes == 1:
                return str(minutes) + " minute ago"

            else:
                return str(minutes) + " minutes ago"

        if diff.days == 0 and diff.seconds >= 3600 and diff.seconds < 86400:
            hours = math.floor(diff.seconds / 3600)

            if hours == 1:
                return str(hours) + " hour ago"

            else:
                return str(hours) + " hours ago"

        # 1 day to 30 days
        if diff.days >= 1 and diff.days < 30:
            days = diff.days

            if days == 1:
                return str(days) + " day ago"

            else:
                return str(days) + " days ago"

        if diff.days >= 30 and diff.days < 365:
            months = math.floor(diff.days / 30)

            if months == 1:
                return str(months) + " month ago"

            else:
                return str(months) + " months ago"

        if diff.days >= 365:
            years = math.floor(diff.days / 365)

            if years == 1:
                return str(years) + " year ago"

            else:
                return str(years) + " years ago"


class PriceDynamic(models.Model):
    coin = models.OneToOneField(Coin, related_name="prices", on_delete=models.CASCADE)
    price = models.CharField(max_length=50)

    def __str__(self):
        return f"{self.coin.name} - {self.price}"


class CoinSubmit(models.Model):
    coin = models.CharField(max_length=90)
    cg_link = models.URLField()

    def __str__(self):
        return self.coin
