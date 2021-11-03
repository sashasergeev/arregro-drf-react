from typing import Type
from django import dispatch
from django.dispatch import receiver
from .models import Notification
from django.utils.translation import ugettext as _


notify = dispatch.Signal(
    providing_args=[
        "coin",
        "to_users",
    ]
)


@receiver(notify, dispatch_uid="notify_user")
def notifier(sender, **kwargs):
    coin = kwargs.get("coin", None)
    to_users = kwargs.get("to_users", None)

    if not coin and not to_users:
        raise TypeError(_("Didn't recieved needed data."))

    notifications = []
    for user in to_users:
        notifications.append(Notification(coin=coin, to_user=user))
    saved_notifications = Notification.objects.bulk_create(notifications)
    return saved_notifications
