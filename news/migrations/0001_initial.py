# Generated by Django 3.2.6 on 2021-08-07 16:07

from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    initial = True

    dependencies = [
    ]

    operations = [
        migrations.CreateModel(
            name='Coin',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('name', models.CharField(max_length=50)),
                ('tg_link', models.URLField()),
                ('tg_id', models.CharField(max_length=20)),
                ('tg_pure_id', models.CharField(max_length=20)),
                ('cg_link', models.URLField()),
                ('img_link', models.URLField()),
            ],
        ),
        migrations.CreateModel(
            name='Tag',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('tag', models.CharField(max_length=50)),
            ],
        ),
        migrations.CreateModel(
            name='PriceDynamic',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('price', models.CharField(max_length=50)),
                ('coin', models.OneToOneField(on_delete=django.db.models.deletion.CASCADE, related_name='prices', to='news.coin')),
            ],
        ),
        migrations.CreateModel(
            name='Post',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('message', models.TextField()),
                ('date_added', models.DateTimeField(auto_now_add=True)),
                ('price', models.CharField(max_length=50)),
                ('price1hr', models.CharField(blank=True, max_length=50)),
                ('price2hr', models.CharField(blank=True, max_length=50)),
                ('coin', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='posts', to='news.coin')),
                ('tag', models.ManyToManyField(blank=True, to='news.Tag')),
            ],
        ),
    ]
