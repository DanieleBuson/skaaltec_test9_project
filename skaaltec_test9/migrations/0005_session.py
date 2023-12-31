# Generated by Django 4.2.5 on 2023-10-13 07:11

from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        ('skaaltec_test9', '0004_message'),
    ]

    operations = [
        migrations.CreateModel(
            name='Session',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('date', models.DateTimeField()),
                ('completed', models.BooleanField(default=False)),
                ('color_html', models.CharField(max_length=200)),
                ('patientAndTherapist', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='skaaltec_test9.patienthastherapist')),
            ],
        ),
    ]
