import os
from celery import Celery

os.environ.setdefault("DJANGO_SETTINGS_MODULE", "arregro.settings")
app = Celery("arregro")
app.config_from_object("django.conf:settings", namespace="CELERY")

app.conf.beat_schedule = {
    "get_coins_price_60s": {
        "task": "news.tasks.get_coins_price",
        "schedule": 60.0,
    }
}
app.autodiscover_tasks()
