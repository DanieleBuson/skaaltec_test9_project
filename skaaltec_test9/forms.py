from django import forms
from django.core.validators import EmailValidator
from django.contrib.auth.forms import AuthenticationForm, UsernameField
from .models import Analysis, Message, Session


class ContactForm(forms.Form):
    name = forms.CharField(max_length=100)
    email = forms.CharField(validators=[EmailValidator()])
    phone = forms.CharField(max_length=15)
    subject = forms.CharField(max_length=100)
    message = forms.CharField(widget=forms.Textarea(attrs={'class':'form-control'}))

    class Meta:

        widgets = {
            'name': forms.TextInput(attrs={'class': 'form-control'}),
            'email': forms.TextInput(attrs={'class': 'form-control'}),
            'phone': forms.TextInput(attrs={'class': 'form-control'}),
            'subject': forms.TextInput(attrs={'class': 'form-control'}),
        }

class AnalysisForm(forms.ModelForm):
    
    class Meta:
        model = Analysis
        fields = ["date", "data_file"]
        widgets = {
            'date': forms.DateInput(
                attrs={'type': 'date', 'placeholder': 'yyyy-mm-dd (DOB)', 'class': 'form-control'}
            )
        }

class MessageForm(forms.ModelForm):

    class Meta:
        model = Message
        exclude = ['date', 'sender', 'receiver', 'patientAndTherapist', 'new_message']

        widgets = {
            'textMessage': forms.TextInput(
                attrs={'placeholder':'Type your message...', 'class': 'form-control'}
            )
        }

class SessionForm(forms.ModelForm):

    class Meta:
        model = Session
        exclude = ['patientAndTherapist', 'completed']

        widgets = {
            'date': forms.DateTimeInput(
                attrs={
                    'type': 'datetime-local',
                    'placeholder': 'yyyy-mm-ddTHH:MM',
                    'class': 'form-control',
            })
        }
