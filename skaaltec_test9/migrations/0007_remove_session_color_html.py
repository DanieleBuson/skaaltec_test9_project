# Generated by Django 4.2.5 on 2023-10-13 07:44

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('skaaltec_test9', '0006_alter_session_color_html'),
    ]

    operations = [
        migrations.RemoveField(
            model_name='session',
            name='color_html',
        ),
    ]
