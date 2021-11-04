from django.db import models
from rest_framework import serializers
from django.contrib.auth.models import User
from django.contrib.auth import authenticate
from .models import Notification


# USER SERIALIZER
class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ("id", "username", "email")


# REGISTER SERIALIZER
class RegisterSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ("id", "username", "email", "password")
        extra_kwargs = {"password": {"write_only": True}}

    def create(self, validated_data):
        user = User.objects.create_user(
            validated_data["username"],
            validated_data["email"],
            validated_data["password"],
        )
        return user


# LOGIN SERIALIZER
class LoginSerializer(serializers.ModelSerializer):
    username = serializers.CharField()
    password = serializers.CharField()

    class Meta:
        model = User
        fields = ["username", "password"]

    def validate(self, data):
        user = authenticate(**data)
        if user and user.is_active:
            return user
        raise serializers.ValidationError("Incorrect credentials!")


# NOTIFICATION
class NotificationSerializer(serializers.ModelSerializer):

    coinName = serializers.SlugRelatedField(
        many=False, source="coin", slug_field="name", read_only="True"
    )
    coinImg = serializers.SlugRelatedField(
        many=False, source="coin", slug_field="img_link", read_only="True"
    )

    class Meta:
        model = Notification
        fields = ["pk", "coin", "coinName", "coinImg", "read"]
