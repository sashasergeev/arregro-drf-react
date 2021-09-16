from rest_framework import serializers
from .models import Coin, Post, Tag
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
            "name",
            "currPrice",
            "tg_link",
            "cg_link",
            "img_link",
            "doesUserFollow",
        )


class PostSerializer(serializers.ModelSerializer):
    coin = CoinSerializer(many=False)
    tag = serializers.StringRelatedField(many=True)
    message = serializers.CharField(source="fuckquestions")
    date_added = serializers.CharField(source="whenpublished")

    class Meta:
        model = Post
        fields = ("coin", "message", "date_added", "price", "tag")


class CoinDetailSerializer(serializers.ModelSerializer):
    posts = PostSerializer(many=True)
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
            "name",
            "currPrice",
            "tg_link",
            "cg_link",
            "img_link",
            "posts",
            "doesUserFollow",
        )


class TagSerializer(serializers.ModelSerializer):
    tag_count = serializers.IntegerField()

    class Meta:
        model = Tag
        fields = ("id", "tag", "tag_count")


class PostsByTagSerializer(serializers.ModelSerializer):
    post_set = PostSerializer(many=True)

    class Meta:
        model = Tag
        fields = ("id", "tag", "post_set")
