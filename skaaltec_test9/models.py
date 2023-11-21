import os
import datetime
from django.db import models
from django.contrib.auth.models import User
from webapp_test9.settings import STATIC_URL

class News(models.Model):
    news_type = models.CharField(max_length=250)
    url = models.CharField(max_length=1000)
    title = models.CharField(max_length=250)
    description = models.CharField(max_length=1000)
    image = models.ImageField(upload_to="", blank=True)

    def __str__(self) -> str:
        return self.title
    
class Therapist(models.Model):
    name = models.CharField(max_length=150, blank=False)
    surname = models.CharField(max_length=150, blank=False)
    age = models.IntegerField(blank=False)
    mail = models.CharField(max_length=200, blank=True)
    phoneNumber = models.CharField(max_length=15, blank=True)
    user = models.ForeignKey(User, on_delete=models.CASCADE)

    def __str__(self) -> str:
        return self.name + " " + self.surname
    
class Patient(models.Model):
    name = models.CharField(max_length=150, blank=False)
    surname = models.CharField(max_length=150, blank=False)
    age = models.IntegerField(blank=False)
    mail = models.CharField(max_length=200, blank=True)
    phoneNumber = models.CharField(max_length=15, blank=True)
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    weight = models.IntegerField(blank=False)
    height = models.IntegerField(blank=False)

    def __str__(self) -> str:
        return self.name + " " + self.surname
    
class PatientHasTherapist(models.Model):
    therapist = models.ForeignKey(Therapist, on_delete=models.CASCADE)
    patient = models.ForeignKey(Patient, on_delete=models.CASCADE)

    def __str__(self) -> str:
        return self.therapist.name + " " + self.therapist.surname + ", " + self.patient.name + " " + self.patient.surname


class Message(models.Model):
    date = models.DateTimeField(auto_now_add=True)
    textMessage = models.TextField(blank=False)
    sender = models.CharField(max_length=250)
    receiver = models.CharField(max_length=250)
    new_message = models.BooleanField(default=True)
    patientAndTherapist = models.ForeignKey(PatientHasTherapist, on_delete=models.CASCADE)

    def __str__(self) -> str:
        return self.sender + " at " + str(self.date)
    
class Session(models.Model):
    date = models.DateTimeField(blank=False)
    patientAndTherapist = models.ForeignKey(PatientHasTherapist, on_delete=models.CASCADE)
    completed = models.BooleanField(blank=False, default=False)

    def __str__(self) -> str:
        return self.patientAndTherapist.patient.name + " " + self.patientAndTherapist.patient.surname + " " + str(self.date)
    
def update_filename(instance, filename):
    path = STATIC_URL + "skaaltec_test9/IMU/"
    filename = "imu_id_" + str(instance.patientAndTherapist.patient.id) + "_date_" + str(instance.date).replace("-", "") + "-" + datetime.datetime.now().strftime("%H:%M:%S") + ".csv"
    return os.path.join(path, filename)

class Analysis(models.Model):
    analysis_code = models.CharField(blank=False, max_length=100)
    date = models.DateField(blank = False)
    data_file = models.FileField(blank=True, upload_to=update_filename)
    patientAndTherapist = models.ForeignKey(PatientHasTherapist, on_delete=models.CASCADE)

    def __str__(self) -> str:
        return self.analysis_code