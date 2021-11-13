web: daphne arregro.asgi:application --port $PORT --bind 0.0.0.0 -v2
celery: celery -A arregro worker --concurrency 1 -P solo
celerybeat: celery -A arregro beat -l INFO
celeryworker: celery -A arregro beat & celery -A arregro worker --concurrency 1 solo -l INFO & wait -n