from django.contrib import admin
from .models import News, Therapist, Patient, PatientHasTherapist, Message, Session,Analysis

# Register your models here.
admin.site.register(News)
admin.site.register(Therapist)
admin.site.register(Patient)
admin.site.register(PatientHasTherapist)
admin.site.register(Message)
admin.site.register(Session)
admin.site.register(Analysis)