from django.contrib import admin
from .models import Post, Coin, PriceDynamic, Tag, CoinSubmit

# Register your models here.

admin.site.register(Coin)
admin.site.register(Post)
admin.site.register(Tag)
admin.site.register(PriceDynamic)
admin.site.register(CoinSubmit)
