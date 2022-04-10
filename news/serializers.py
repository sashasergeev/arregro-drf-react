from rest_framework import serializers
from .models import Coin, CoinSubmit, Post, Tag
from django.db.models import Exists


class CoinSerializer(serializers.ModelSerializer):
    currPrice = serializers.SlugRelatedField(
        many=False, source="prices", slug_field="price", read_only="True"
    )
    doesUserFollow = serializers.SerializerMethodField("_isFollow")

    def _isFollow(self, obj):
        request = self.context.get("request", None)
        try:
            Exists(request.user.coin_set.get(id=obj.id))
            return True
        except:
            return False

    class Meta:
        model = Coin
        fields = (
            "id",
            "ticker",
            "name",
            "currPrice",
            "tg_link",
            "cg_link",
            "img_link",
            "doesUserFollow",
        )


class CoinSearchSerializer(serializers.ModelSerializer):
    class Meta:
        model = Coin
        fields = ("id", "name", "ticker")


class PostSerializer(serializers.ModelSerializer):
    coin = CoinSerializer(many=False)
    tag = serializers.StringRelatedField(many=True)
    message = serializers.CharField(source="fuckquestions")
    date_added = serializers.CharField(source="whenpublished")

    class Meta:
        model = Post
        fields = (
            "id",
            "coin",
            "message",
            "date_added",
            "price",
            "price1hr",
            "price2hr",
            "tag",
        )


class PostCreateSerializer(serializers.ModelSerializer):
    class Meta:
        model = Post
        fields = ("id", "coin", "message", "price", "tag")


class CoinDetailSerializer(serializers.ModelSerializer):
    posts = PostSerializer(many=True)
    currPrice = serializers.SlugRelatedField(
        many=False, source="prices", slug_field="price", read_only="True"
    )
    cg_id = serializers.SlugRelatedField(
        many=False, source="prices", slug_field="cg_id", read_only="True"
    )
    price_change24h = serializers.SlugRelatedField(
        many=False, source="prices", slug_field="price_change24h", read_only="True"
    )
    github = serializers.SlugRelatedField(
        many=False, source="gh", slug_field="name", read_only="True"
    )
    doesUserFollow = serializers.SerializerMethodField("_isFollow")

    def _isFollow(self, obj):
        request = self.context.get("request", None)
        try:
            Exists(request.user.coin_set.get(id=obj.id))
            return True
        except:
            return False

    class Meta:
        model = Coin
        fields = (
            "id",
            "ticker",
            "name",
            "currPrice",
            "price_change24h",
            "tg_link",
            "cg_link",
            "img_link",
            "posts",
            "github",
            "cg_id",
            "doesUserFollow",
        )


class TagSerializer(serializers.ModelSerializer):
    tag_count = serializers.IntegerField()

    class Meta:
        model = Tag
        fields = ("id", "tag", "tag_count")


class CoinSubmitSerializer(serializers.ModelSerializer):
    class Meta:
        model = CoinSubmit
        fields = "__all__"


class CoinTrendingSerializer(serializers.ModelSerializer):
    currPrice = serializers.SlugRelatedField(
        many=False, source="prices", slug_field="price", read_only="True"
    )
    price_change24h = serializers.SlugRelatedField(
        many=False, source="prices", slug_field="price_change24h", read_only="True"
    )

    class Meta:
        model = Coin
        fields = (
            "id",
            "ticker",
            "name",
            "img_link",
            "currPrice",
            "price_change24h",
        )
