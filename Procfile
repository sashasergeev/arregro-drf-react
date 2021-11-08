web: gunicorn arregro.wsgi --log-file -
celery: celery -A arregro worker --concurrency 1 -P solo
celerybeat: celery -A arregro beat -l INFO
celeryworker: celery -A arregro beat & celery -A arregro worker --concurrency 1 solo -l INFO & wait -n