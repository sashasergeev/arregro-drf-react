# Generated by Django 3.2.6 on 2021-09-18 19:13

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('news', '0003_coin_followers'),
    ]

    operations = [
        migrations.CreateModel(
            name='CoinSubmit',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('coin', models.CharField(max_length=90)),
                ('cg_link', models.URLField()),
            ],
        ),
    ]
