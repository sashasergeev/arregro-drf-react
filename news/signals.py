from django.dispatch import receiver
from django.db.models.signals import post_save
from datetime import datetime, timedelta
from channels.layers import get_channel_layer
from asgiref.sync import async_to_sync

from .models import Post
from accounts.signals import notify
from .tasks import update_post_price

channel_layer = get_channel_layer()


@receiver(post_save, sender=Post)
def post_after_actions(sender, instance, created, **kwargs):

    notify.send(
        sender=None, coin=instance.coin, to_users=list(instance.coin.followers.all())
    )

    async_to_sync(channel_layer.group_send)(
        "new_posts", {"type": "new_post_notify", "message": "new post"}
    )

    # scheduling tasks to be done 1h and 2hrs later
    # this can be moved to signals or overwriting Post model
    update_post_price.apply_async(
        (instance.pk,),
        eta=datetime.utcnow() + timedelta(hours=1),
    )
    update_post_price.apply_async(
        (instance.pk,),
        eta=datetime.utcnow() + timedelta(hours=2),
    )
