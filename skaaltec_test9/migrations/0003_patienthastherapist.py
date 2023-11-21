# Generated by Django 4.2.5 on 2023-10-11 13:16

from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        ('skaaltec_test9', '0002_therapist_patient'),
    ]

    operations = [
        migrations.CreateModel(
            name='PatientHasTherapist',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('patient', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='skaaltec_test9.patient')),
                ('therapist', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='skaaltec_test9.therapist')),
            ],
        ),
    ]