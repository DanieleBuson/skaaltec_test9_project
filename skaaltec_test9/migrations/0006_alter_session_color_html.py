# Generated by Django 4.2.5 on 2023-10-13 07:43

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('skaaltec_test9', '0005_session'),
    ]

    operations = [
        migrations.AlterField(
            model_name='session',
            name='color_html',
            field=models.CharField(blank=True, max_length=200),
        ),
    ]
