import re
from rest_framework import generics, mixins, permissions, views, viewsets
from rest_framework.response import Response
from knox.models import AuthToken
from rest_framework.renderers import JSONRenderer
from rest_framework.decorators import action

from accounts.models import Notification


from .serializers import (
    LoginSerializer,
    NotificationSerializer,
    UserSerializer,
    RegisterSerializer,
)

# REGISTER API
class RegisterApi(generics.GenericAPIView):
    serializer_class = RegisterSerializer

    def post(self, request, *args, **kwargs):
        serializer = self.get_serializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        user = serializer.save()
        return Response(
            {
                "user": UserSerializer(
                    user, context=self.get_serializer_context()
                ).data,
                "token": AuthToken.objects.create(user)[1],
            }
        )


# LOGIN API
class LoginApi(generics.GenericAPIView):
    serializer_class = LoginSerializer

    def post(self, request, *args, **kwargs):
        serializer = self.get_serializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        user = serializer.validated_data
        return Response(
            {
                "user": UserSerializer(
                    user, context=self.get_serializer_context()
                ).data,
                "token": AuthToken.objects.create(user)[1],
            }
        )


# GET USER API
class UserApi(generics.RetrieveAPIView):
    permission_classes = [permissions.IsAuthenticated]
    serializer_class = UserSerializer

    def get_object(self):
        return self.request.user


# NOTIFICATIONS
class NotificationListView(mixins.ListModelMixin, viewsets.GenericViewSet):
    permission_classes = [permissions.IsAuthenticated]

    def list(self, request):
        queryset = self.request.user.notifications
        serializer = NotificationSerializer(queryset, many=True)
        return Response(serializer.data)

    @action(
        methods=["get"],
        detail=False,
        permission_classes=[permissions.IsAuthenticated],
        url_path="clear",
        url_name="clear",
    )
    def clearNotifications(self, request):
        pk = request.GET.get("pk", None)
        if pk:
            # clear one notification by pk
            notification = Notification.objects.get(pk=pk)
            notification.read = True
            notification.save()
            return Response({"status": "one"})
        else:
            # clear all notifications
            notifications = request.user.notifications.filter(read=False)
            for n in notifications:
                n.read = True
                n.save()
            return Response({"status": "all"})

    @action(
        methods=["get"],
        detail=False,
        permission_classes=[permissions.IsAuthenticated],
        url_path="count",
        url_name="count",
    )
    def countNotifications(self, request):
        content = {"not_count": request.user.notifications.filter(read=False).count()}
        return Response(content)
