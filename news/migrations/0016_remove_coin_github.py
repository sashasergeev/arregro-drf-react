# Generated by Django 3.2.6 on 2022-02-10 05:21

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('news', '0015_github_coin'),
    ]

    operations = [
        migrations.RemoveField(
            model_name='coin',
            name='github',
        ),
    ]
