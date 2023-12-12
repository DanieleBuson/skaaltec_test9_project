import os
import json
from django.shortcuts import render, redirect, get_object_or_404
from django.contrib.auth import login, logout, authenticate
from django.contrib.auth.forms import AuthenticationForm
from django.http import JsonResponse, FileResponse
from django.contrib.auth.decorators import login_required
from datetime import datetime

from skaaltec_test9.functions import Kinematics, extract_dates, patient_data, analysis_code_generator, create_pdf
from webapp_test9.settings import MEDIA_URL
from .models import Analysis, News, Therapist, Patient, PatientHasTherapist, Message, Session
from .forms import ContactForm, AnalysisForm, MessageForm, SessionForm
from django.core.mail import send_mail


# Create your views here.
def main(request):
    return render(request, 'skaaltec_test9/main.html')

def smartVNS(request):
    return render(request, 'skaaltec_test9/smartVNS.html')

def aboutus(request):
    return render(request, 'skaaltec_test9/aboutus.html')

def news(request):
    news = News.objects.all()
    context = {
        'all_news': news,
    }
    return render(request, 'skaaltec_test9/news.html', context)

def contactus(request):
    if request.method == 'POST':
        form = ContactForm(request.POST)
        if form.is_valid():
            # print(form.cleaned_data)
            # send_mail(
            #     subject=form.cleaned_data['subject'],
            #     message=form.cleaned_data['message'],
            #     from_email='csc.project.hslu@gmail.com',
            #     recipient_list=[form.cleaned_data['email']],
            #     fail_silently=False,
            # )
            file = open('message_' + form.cleaned_data['name'] + str(datetime.date.today().strftime("%d%m%Y")) + ".txt", 'w')
            file.write("Message from " + form.cleaned_data['email'] + "Subject:  " + form.cleaned_data['subject'] + "\n" + "Message: " + form.cleaned_data['message'])
            file.close()
            return render(request, 'skaaltec_test9/main.html', {'message': 'We received your message, we will answer as soon as possible. Thanks for you patient!'})
    else:
        form = ContactForm()
    return render(request, "skaaltec_test9/contactus.html", {'form': form})


def login_user(request):
    if request.method == 'GET':
        return render(request, 'skaaltec_test9/login_user.html', {'form_in': AuthenticationForm()})
    else:
        user = authenticate(request, username=request.POST['username'], password=request.POST['password'])
        if user is None:
            return render(request, 'skaaltec_test9/login_user.html', {'form_in': AuthenticationForm(), 'error': 'Username and Password did not match!'})
        else:
            try:
                therapist = get_object_or_404(Therapist, user=user)
                if therapist:
                    login(request, user)
                    return redirect("therapist_dashboard")
            except:
                try: 
                    patient = get_object_or_404(Patient, user=user)
                    if patient: 
                        login(request, user)
                        return redirect("patient_dashboard")
                except:
                    return render(request, 'skaaltec_test9/login_user.html', {'form_in': AuthenticationForm(), 'error': 'Username and Password did not match!'})
            
@login_required
def logout_user(request):
    if request.method == 'POST':
        logout(request)
        return redirect('main')

##############################################################################################################

@login_required
def patient_dashboard(request): 
    form = SessionForm(request.POST or None)
    mForm = MessageForm(request.POST or None)
    patient = get_object_or_404(Patient, user = request.user)
    context = {}
    if request.headers.get('x-requested-with') == 'XMLHttpRequest':
        print(request.POST)
        if form.is_valid() and request.POST['type'] == "book":
            print("dentro Form")
            new_session = form.save(commit=False)
            patient = get_object_or_404(Patient, pk=patient.id)
            therapist_list = PatientHasTherapist.objects.filter(patient=patient)
            if len(therapist_list)==1:
                patientAndTherapist = therapist_list[0]

                new_session.date = form.cleaned_data.get('date')
                new_session.patientAndTherapist = patientAndTherapist
                
                context['status'] = 'ok'
                context['date'] = new_session.date
                new_session.save()
                return JsonResponse(context)
            else:
                context = {
                    'error': 'An error has occurred, more than a single therapist, not yet implemented'
                }
                return JsonResponse(context)
        if mForm.is_valid() and request.POST['type'] == "message":
            print("dentro mForm")
            new_message = mForm.save(commit=False)
            patient = get_object_or_404(Patient, pk=patient.id)
            therapist_list = PatientHasTherapist.objects.filter(patient=patient)
            if len(therapist_list)==1:
                patientAndTherapist = therapist_list[0]
                new_message.textMessage = request.POST['textMessage']
                new_message.patientAndTherapist = patientAndTherapist
                new_message.receiver = patientAndTherapist.therapist.name + " " + patientAndTherapist.therapist.surname
                new_message.sender = patient.name + " " + patient.surname
                new_message.new_message = True
                context['status'] = 'ok'
                new_message.save()
                messages = Message.objects.filter(patientAndTherapist = patientAndTherapist)
                for message in messages:
                    if message.sender == patientAndTherapist.therapist.name + " " + patientAndTherapist.therapist.surname:
                        message.new_message = False
                        message.save(update_fields=['new_message'])
                return JsonResponse(context)
            else: 
                context = {
                    'error': 'more than a single therapist assigned'
                }
                return JsonResponse(context)
    context = {
        'form': form, 
        'mform': mForm,
    }
    return render(request, 'skaaltec_test9/patient_dashboard.html', context)

@login_required
def load_info_pd(request):
    if request.headers.get('x-requested-with') == 'XMLHttpRequest':
        patient = get_object_or_404(Patient, user=request.user)
        patient_info = {
            'id': patient.id,
            'patient_name': patient.name + " " + patient.surname,
            'patient_age': patient.age,
            'patient_phoneNumber': patient.phoneNumber,
            'patient_email': patient.mail
        }
        print(patient_info)
        patientAndTherapist = PatientHasTherapist.objects.filter(patient=patient)
        if len(patientAndTherapist)==1:
            sessions = Session.objects.filter(patientAndTherapist=patientAndTherapist[0])
            session_list = []
            for session in sessions:
                session_list.append(
                    {
                        'title': "Session with " + session.patientAndTherapist.therapist.name + " " + session.patientAndTherapist.therapist.surname,
                        'start': session.date,
                    }
                )
        elif len(patientAndTherapist)>1:
            session_list = []
            for pAt in patientAndTherapist:
                sessions = Session.objects.filter(patientAndTherapist=pAt)
                for session in sessions:
                    session_list.append(
                        {
                            'title': "Session with " + session.pAt.therapist.name + " " + session.pAt.therapist.surname,
                            'start': session.date,
                        }
                    )
        print(session_list)
        data = {
            'patient_info': patient_info,
            'session_list': session_list
        }
        return JsonResponse(data)

@login_required 
def load_analysis_pd(request):
    patient = get_object_or_404(Patient, user=request.user)
    therapist_list = PatientHasTherapist.objects.filter(patient=patient)
    
    if request.headers.get('x-requested-with') == 'XMLHttpRequest':
        list_of_files = os.listdir(MEDIA_URL + "static/skaaltec_test9/IMU/")
        if len(therapist_list) == 1:
            patientAndTherapist = therapist_list[0]
            size = Analysis.objects.filter(patientAndTherapist=patientAndTherapist).count()  
        elif len(therapist_list) > 1:
            size = 0
            for therapist in therapist_list:
                patientAndTherapist = get_object_or_404(therapist=therapist, patient=patient)
                size += Analysis.objects.filter(patientAndTherapist=patientAndTherapist).count()

        list_of_patient_files = patient_data(list_of_files, int(patient.id))
        date_files = extract_dates(list_of_patient_files)
        dates = list(sorted(date_files.keys()))
        timestamps = []
        for date in dates:
            element = datetime.strptime(date,"%Y-%m-%d")
            timestamps.append(datetime.timestamp(element))
        files = list(sorted(date_files.values()))
        calibration_file = MEDIA_URL + "static/skaaltec_test9/IMU/calibration.csv"
        
        general_data = []
        for file in files:
            print(file)
            kinematic = Kinematics()
            input_file = MEDIA_URL + "static/skaaltec_test9/IMU/" + file
            general_data.append(kinematic.get_variables(input_file=input_file, calibration_file=calibration_file))

        number_of_movements = 0
        nom = []
        average_duration = 0
        dur = []
        upper_dur = []
        lower_dur = []
        std_duration = 0
        average_mean_velocity = 0
        mean_vel = []
        upper_mean_vel = []
        lower_mean_vel = []
        std_mean_velocity = 0
        average_max_velocity = 0
        max_vel = []
        upper_max_vel = []
        lower_max_vel = []
        std_max_velocity = 0
        average_zero_crossings = 0
        zero_c = []
        upper_zero_c = []
        lower_zero_c = []
        std_zero_crossings = 0
        average_distance_traveled = 0
        distance_t = []
        upper_distance_t = []
        lower_distance_t = []
        std_distance_traveled = 0
        average_max_acceleration = 0
        max_acc = []
        upper_max_acc = []
        lower_max_acc = []
        std_max_acceleration = 0

        for i in range(len(general_data)):
            number_of_movements += (1/len(general_data))*(general_data[i].NumberofMovements)
            nom.append(general_data[i].NumberofMovements)
            average_duration += (1/len(general_data))*(general_data[i].Avg_Duration)
            dur.append(general_data[i].Avg_Duration)
            std_duration += (1/len(general_data))*(general_data[i].Std_Duration)
            upper_dur.append(general_data[i].Avg_Duration + general_data[i].Std_Duration)
            lower_dur.append(general_data[i].Avg_Duration - general_data[i].Std_Duration)
            average_mean_velocity += (1/len(general_data))*(general_data[i].Avg_Mean_Velocity)
            mean_vel.append(general_data[i].Avg_Mean_Velocity)
            std_mean_velocity += (1/len(general_data))*(general_data[i].Std_Mean_Velocity)
            upper_mean_vel.append(general_data[i].Avg_Mean_Velocity + general_data[i].Std_Mean_Velocity)
            lower_mean_vel.append(general_data[i].Avg_Mean_Velocity - general_data[i].Std_Mean_Velocity)
            average_max_velocity += (1/len(general_data))*(general_data[i].Avg_Max_Velocity)
            max_vel.append(general_data[i].Avg_Max_Velocity)
            upper_max_vel.append(general_data[i].Avg_Max_Velocity + general_data[i].Std_Max_Velocity)
            lower_max_vel.append(general_data[i].Avg_Max_Velocity - general_data[i].Std_Max_Velocity)
            std_max_velocity += (1/len(general_data))*(general_data[i].Std_Max_Velocity)
            average_zero_crossings += (1/len(general_data))*(general_data[i].Avg_Zero_Crossings)
            zero_c.append(general_data[i].Avg_Zero_Crossings)
            upper_zero_c.append(general_data[i].Avg_Zero_Crossings + general_data[i].Std_Zero_Crossings)
            lower_zero_c.append(general_data[i].Avg_Zero_Crossings - general_data[i].Std_Zero_Crossings)
            std_zero_crossings += (1/len(general_data))*(general_data[i].Std_Zero_Crossings)
            average_distance_traveled += (1/len(general_data))*(general_data[i].Avg_Distance_Traveled)
            distance_t.append(general_data[i].Avg_Distance_Traveled)
            std_distance_traveled += (1/len(general_data))*(general_data[i].Std_Distance_Traveled)
            upper_distance_t.append(general_data[i].Avg_Distance_Traveled + general_data[i].Std_Distance_Traveled)
            lower_distance_t.append(general_data[i].Avg_Distance_Traveled - general_data[i].Std_Distance_Traveled)
            average_max_acceleration += (1/len(general_data))*(general_data[i].Avg_Max_Acceleration)
            max_acc.append(general_data[i].Avg_Max_Acceleration)
            std_max_acceleration += (1/len(general_data))*(general_data[i].Std_Max_Acceleration)
            upper_max_acc.append(general_data[i].Avg_Max_Acceleration + general_data[i].Std_Max_Acceleration)
            lower_max_acc.append(general_data[i].Avg_Max_Acceleration - general_data[i].Std_Max_Acceleration)


        general_data={}
        general_data['average_number_of_movements'] = round(number_of_movements)
        general_data['average_distance_traveled'] = round(average_distance_traveled, 2)
        general_data['average_duration'] = round(average_duration, 2)
        general_data['average_max_acceleration'] = round(average_max_acceleration, 2)
        general_data['average_zero_crossings'] = round(average_zero_crossings, 2)
        general_data['average_max_velocity'] = round(average_max_velocity, 2)
        general_data['average_mean_velocity'] = round(average_mean_velocity, 2)
        general_data['std_distance_traveled'] = round(std_distance_traveled, 2)
        general_data['std_duration'] = round(std_duration, 2)
        general_data['std_max_acceleration'] = round(std_max_acceleration, 2)
        general_data['std_max_velocity'] = round(std_max_velocity, 2)
        general_data['std_mean_velocity'] = round(std_mean_velocity, 2)
        general_data['std_zero_crossings'] = round(std_zero_crossings, 2)

        dict_dur = {"dates":dates, 
                    "dur": dur, 
                    'upper': upper_dur,
                    'lower': lower_dur}
        dict_mean_vel = {"dates":dates,
                        "mean_vel":mean_vel,
                        'upper':upper_mean_vel,
                        'lower':lower_mean_vel}
        dict_max_vel = {"dates":dates, 
                        "max_vel":max_vel,
                        'upper':upper_max_vel,
                        'lower':lower_max_vel}
        dict_zero_c = {"dates":dates,
                    "zero_c":zero_c,
                    'upper':upper_zero_c,
                    'lower':lower_zero_c}
        dict_distance_t = {"dates":dates,
                        "distance_t":distance_t,
                        'upper':upper_distance_t,
                        'lower':lower_distance_t}
        dict_max_acc = {"dates": dates,
                        "max_acc":max_acc,
                        'upper': upper_max_acc,
                        'lower': lower_max_acc}
        dict_nom = {"dates":dates, 
                    "nom": nom}
        
        context = {'patient_id':patient.id,
                'patient_name': patient.name + " " + patient.surname,
                'timestamps': timestamps,
                'general_data':general_data,
                "duration": dict_dur,
                "mean_velocity": dict_mean_vel,
                "max_velocity": dict_max_vel,
                "zero_crossings":dict_zero_c,
                "distance_traveled": dict_distance_t,
                "max_acceleration": dict_max_acc,
                "number_of_movements":dict_nom,
                "size":size }

        return JsonResponse(context)

@login_required
def load_messages_pd(request):
    patient = get_object_or_404(Patient, user=request.user)
    patientAndTherapist = PatientHasTherapist.objects.filter(patient = patient)
    if len(patientAndTherapist) == 1: 
        patientAndTherapist = patientAndTherapist[0]
        messagesObj = Message.objects.filter(patientAndTherapist = patientAndTherapist).order_by("date")
        messages = []
        for message in messagesObj:
            messages.append({
                'sender': message.sender,
                'text': message.textMessage,
                'time': str(message.date.strftime("%d-%m-%Y %H:%M"))
            })
            if message.sender == patientAndTherapist.therapist.name + " " + patientAndTherapist.therapist.surname:
                message.new_message = False
                message.save(update_fields=['new_message'])

        if request.headers.get('x-requested-with') == 'XMLHttpRequest':
            data = {
                'therapist_name': patientAndTherapist.therapist.name + " " + patientAndTherapist.therapist.surname,
                'therapist_mail': patientAndTherapist.therapist.mail,
                'therapist_phone': patientAndTherapist.therapist.phoneNumber,
                'patient_id': patient.id,
                'patient_name': patient.name + " " + patient.surname,
                'messages':messages,
            }
            context = {
                'data':data,
            }
            return JsonResponse(context)
    else:
        if request.headers.get('x-requested-with') == 'XMLHttpRequest':
            data = {
                'error_string': "more than just one, not yet implemented",
            }
            return JsonResponse(context)

@login_required
def donwload_pdf(request):
    patient = get_object_or_404(Patient, user=request.user)
    therapist_list = PatientHasTherapist.objects.filter(patient=patient)
    list_of_files = os.listdir(MEDIA_URL + "static/skaaltec_test9/IMU/")
    if len(therapist_list) == 1:
        patientAndTherapist = therapist_list[0]
        therapist = get_object_or_404(Therapist, pk=patientAndTherapist.therapist.id)
        size = Analysis.objects.filter(patientAndTherapist=patientAndTherapist).count()  
    elif len(therapist_list) > 1:
        size = 0
        for therapist in therapist_list:
            patientAndTherapist = get_object_or_404(therapist=therapist, patient=patient)
            size += Analysis.objects.filter(patientAndTherapist=patientAndTherapist).count()
        return None
    list_of_patient_files = patient_data(list_of_files, int(patient.id))
    date_files = extract_dates(list_of_patient_files)
    dates = list(sorted(date_files.keys()))
    timestamps = []
    for date in dates:
        element = datetime.strptime(date,"%Y-%m-%d")
        timestamps.append(datetime.timestamp(element))
    files = list(sorted(date_files.values()))
    calibration_file = MEDIA_URL + "static/skaaltec_test9/IMU/calibration.csv"
    
    general_data = []
    for file in files:
        print(file)
        kinematic = Kinematics()
        input_file = MEDIA_URL + "static/skaaltec_test9/IMU/" + file
        general_data.append(kinematic.get_variables(input_file=input_file, calibration_file=calibration_file))
    
    number_of_movements = []
    duration = []
    mean_velocity = []
    max_velocity = []
    zero_crossings = []
    distance_traveled = []
    max_acceleration = []
    for data in general_data:
        number_of_movements.append(data.NumberofMovements)
        duration.append(data.Avg_Duration)
        mean_velocity.append(data.Avg_Mean_Velocity)
        max_velocity.append(data.Avg_Max_Velocity)
        zero_crossings.append(data.Avg_Zero_Crossings)
        distance_traveled.append(data.Avg_Distance_Traveled)
        max_acceleration.append(data.Avg_Max_Acceleration)

    create_pdf(patient, therapist, dates, number_of_movements)
    pdf_file = open(f"{patient.id}_therapy_report.pdf", 'rb')
    
    return FileResponse(pdf_file, as_attachment=True)

###############################################################################################################

@login_required
def therapist_dashboard(request):
    form = SessionForm(request.POST or None)
    uForm = AnalysisForm(request.POST or None, request.FILES or None)
    mForm = MessageForm(request.POST or None)
    data = {}
    print("inside the function")
    if request.headers.get('x-requested-with') == 'XMLHttpRequest':
        print(request.POST['type'])
        if form.is_valid() and request.POST['type'] == "book":
            new_session = form.save(commit=False)
            if 'patient_id' in request.POST:
                patient_id = request.POST['patient_id']
            patient = get_object_or_404(Patient, pk=patient_id)
            therapist = get_object_or_404(Therapist, user = request.user)
            patientAndTherapist = get_object_or_404(PatientHasTherapist, patient=patient, therapist=therapist)

            new_session.date = form.cleaned_data.get('date')
            new_session.patientAndTherapist = patientAndTherapist
            
            data['status'] = 'ok'
            data['date'] = new_session.date
            new_session.save()
            return JsonResponse(data)
        if uForm.is_valid() and request.POST['type'] == "upload":
            new_upload = uForm.save(commit=False)
            if 'patient_id' in request.POST:
                patient_id = request.POST['patient_id']
            patient = get_object_or_404(Patient, pk=patient_id)
            therapist = get_object_or_404(Therapist, user = request.user)
            patientAndTherapist = get_object_or_404(PatientHasTherapist, patient=patient, therapist=therapist)
            new_upload.analysis_code = analysis_code_generator("imu", patientAndTherapist.patient.id, form.cleaned_data.get('date').strftime("%Y-%m-%d"))
            new_upload.patientAndTherapist = patientAndTherapist
            new_upload.date = form.cleaned_data.get('date')
            new_upload.data_file = request.FILES['data_file']
            data['date'] = form.cleaned_data.get("date")
            data['status'] = 'ok'
            new_upload.save()
            return JsonResponse(data)
        if mForm.is_valid() and request.POST['type'] == "message":
            print("is valid mForm")
            new_message = mForm.save(commit=False)
            if 'patient_id' in request.POST:
                patient_id = request.POST['patient_id']
            patient = get_object_or_404(Patient, pk=patient_id)
            therapist = get_object_or_404(Therapist, user = request.user)
            patientAndTherapist = get_object_or_404(PatientHasTherapist, patient=patient, therapist=therapist)
            new_message.textMessage = request.POST['textMessage']
            new_message.patientAndTherapist = patientAndTherapist
            new_message.sender = therapist.name + " " + therapist.surname
            new_message.receiver = patient.name + " " + patient.surname
            new_message.new_message = True
            data['status'] = 'ok'
            new_message.save()
            print("saved")
            messages = Message.objects.filter(patientAndTherapist = patientAndTherapist)
            for message in messages:
                if message.sender == patient.name + " " + patient.surname:
                    message.new_message = False
                    message.save(update_fields=['new_message'])
            return JsonResponse(data)
    context = {
        'form': form, 
        'uform': uForm,
        'mform': mForm,
    }
    return render(request, "skaaltec_test9/therapist_dashboard.html", context)

@login_required
def load_patients_td(request):
    therapist = get_object_or_404(Therapist, user=request.user)
    patient_list = PatientHasTherapist.objects.filter(therapist=therapist)
    patients = []
    for patient in patient_list:
        patients.append(get_object_or_404(Patient, id = patient.patient.id))
    if request.headers.get('x-requested-with') == 'XMLHttpRequest':
        size = len(patients)
        data = []
        for patient in patients:
            item = {
                'id':patient.id,
                'patient_name':patient.name + " " + patient.surname,
                'age': patient.age,
            }
            data.append(item)
        
        context = {
            'data':data,
            'size': size,
        }
        return JsonResponse(context)
    
@login_required
def load_admin_td(request):
    therapist = get_object_or_404(Therapist, user=request.user)
    patient_list = PatientHasTherapist.objects.filter(therapist=therapist)
    patients = []
    sessions_total = 0
    sessions_completed = 0
    messages_count = 0
    for patient in patient_list:
        patients.append(get_object_or_404(Patient, id = patient.patient.id))
        sessions = Session.objects.filter(patientAndTherapist = patient)
        sessions_total += len(sessions)
        for session in sessions:
            if session.completed:
                sessions_completed += 1
        messages = Message.objects.filter(patientAndTherapist = patient)
        for message in messages:
            if message.sender != (therapist.name + " " + therapist.surname) and message.new_message:
                messages_count += 1
    analyses = Analysis.objects.all().order_by("date")
    dates = []
    for analysis in analyses:
        if analysis.date not in dates:
            dates.append(analysis.date)
    analyses_count = []
    for date in dates:
        analyses_count.append(len(Analysis.objects.filter(date=date)))

    if request.headers.get('x-requested-with') == 'XMLHttpRequest':
        patients_size = len(patients)
        
        context = {
            'patients_size': patients_size,
            'sessions_total': sessions_total,
            'sessions_completed': sessions_completed,
            'messages_count': messages_count,
            'dates': dates,
            'analyses_count': analyses_count
        }
        return JsonResponse(context)
    
@login_required
def load_admin_info_td(request):
    therapist = get_object_or_404(Therapist, user=request.user)
    patient_list = PatientHasTherapist.objects.filter(therapist=therapist)
    sessions = []
    messages = []
    total_count = 0
    for patientAndTherapist in patient_list:
        sessions_patient = Session.objects.filter(patientAndTherapist = patientAndTherapist)
        messages_list = Message.objects.filter(patientAndTherapist = patientAndTherapist).order_by("date")
        count_message = 0
        temporary_message_list = []
        for session in sessions_patient:
            sessions.append({
                'title': session.patientAndTherapist.patient.name + " " + session.patientAndTherapist.patient.surname,
                'start': session.date,
            })
        for message in messages_list:
            temporary_message_list.append(get_object_or_404(Message, id = message.id))
            if message.new_message and message.sender == message.patientAndTherapist.patient.name + " " + message.patientAndTherapist.patient.surname:
                count_message += 1
        if len(temporary_message_list)>0:
            last_message = temporary_message_list[-1]
            date = last_message.date.strftime("%d-%m-%Y %H:%M")
            last_message_date = last_message.date.strftime("%Y-%m-%d %H:%M")

            messages.append({
                'id':last_message.id,
                'patient_id': last_message.patientAndTherapist.patient.id,
                'sender': last_message.sender,
                'patient': last_message.patientAndTherapist.patient.name + " " + last_message.patientAndTherapist.patient.surname,
                'therapist': last_message.patientAndTherapist.therapist.name + " " + last_message.patientAndTherapist.therapist.surname,
                'text': last_message.textMessage if len(last_message.textMessage)<75 else last_message.textMessage[0:75] + "...",
                'count_new': count_message,
                'date': date,
                'orderdate': last_message_date
            })
        if len(messages) > 0:
            messages = sorted(messages, key=lambda x: x['orderdate'], reverse=True)
        total_count += count_message

    if request.headers.get('x-requested-with') == 'XMLHttpRequest':
        data = {
            'therapist_name': therapist.name + " " + therapist.surname,
            'therapist_mail': therapist.mail,
            'therapist_phone': therapist.phoneNumber,
            'sessions': sessions,
            'messages':messages,
            'total_count': total_count
        }

        context = {
            'data':data,
        }
        return JsonResponse(context)

@login_required
def load_analysis_td(request, patient_pk):
    therapist = get_object_or_404(Therapist, user=request.user)
    patient = get_object_or_404(Patient, pk=patient_pk)
    patient_list = PatientHasTherapist.objects.filter(therapist=therapist)
    for element in patient_list:
        if patient == element.patient:
            patientAndTherapist = element
            print("Fino a qui tutto bene")
    if request.headers.get('x-requested-with') == 'XMLHttpRequest':
        sessions_list = Session.objects.filter(patientAndTherapist=patientAndTherapist)
        sessions = []
        for element in sessions_list:
            sessions.append({
                'title': element.patientAndTherapist.patient.name + " " + element.patientAndTherapist.patient.surname,
                'start': element.date
            })
            patient_info = {
                'name': patient.name + " " + patient.surname,
                'email': patient.mail,
                'phoneNumber': patient.phoneNumber,
                'age': patient.age,
                'weight': patient.weight,
                'height': patient.height
            }
        list_of_files = os.listdir(MEDIA_URL + "static/skaaltec_test9/IMU/")
        size = Analysis.objects.filter(patientAndTherapist=patientAndTherapist).count()
        list_of_patient_files = patient_data(list_of_files, int(patient_pk))
        date_files = extract_dates(list_of_patient_files)
        dates = list(sorted(date_files.keys()))
        timestamps = []
        for date in dates:
            element = datetime.strptime(date,"%Y-%m-%d")
            timestamps.append(datetime.timestamp(element))
        files = list(sorted(date_files.values()))
        calibration_file = MEDIA_URL + "static/skaaltec_test9/IMU/calibration.csv"
        
        general_data = []
        for file in files:
            print(file)
            kinematic = Kinematics()
            input_file = MEDIA_URL + "static/skaaltec_test9/IMU/" + file
            general_data.append(kinematic.get_variables(input_file=input_file, calibration_file=calibration_file))

        number_of_movements = 0
        nom = []
        average_duration = 0
        dur = []
        upper_dur = []
        lower_dur = []
        std_duration = 0
        average_mean_velocity = 0
        mean_vel = []
        upper_mean_vel = []
        lower_mean_vel = []
        std_mean_velocity = 0
        average_max_velocity = 0
        max_vel = []
        upper_max_vel = []
        lower_max_vel = []
        std_max_velocity = 0
        average_zero_crossings = 0
        zero_c = []
        upper_zero_c = []
        lower_zero_c = []
        std_zero_crossings = 0
        average_distance_traveled = 0
        distance_t = []
        upper_distance_t = []
        lower_distance_t = []
        std_distance_traveled = 0
        average_max_acceleration = 0
        max_acc = []
        upper_max_acc = []
        lower_max_acc = []
        std_max_acceleration = 0

        for i in range(len(general_data)):
            number_of_movements += (1/len(general_data))*(general_data[i].NumberofMovements)
            nom.append(general_data[i].NumberofMovements)
            average_duration += (1/len(general_data))*(general_data[i].Avg_Duration)
            dur.append(general_data[i].Avg_Duration)
            std_duration += (1/len(general_data))*(general_data[i].Std_Duration)
            upper_dur.append(general_data[i].Avg_Duration + general_data[i].Std_Duration)
            lower_dur.append(general_data[i].Avg_Duration - general_data[i].Std_Duration)
            average_mean_velocity += (1/len(general_data))*(general_data[i].Avg_Mean_Velocity)
            mean_vel.append(general_data[i].Avg_Mean_Velocity)
            std_mean_velocity += (1/len(general_data))*(general_data[i].Std_Mean_Velocity)
            upper_mean_vel.append(general_data[i].Avg_Mean_Velocity + general_data[i].Std_Mean_Velocity)
            lower_mean_vel.append(general_data[i].Avg_Mean_Velocity - general_data[i].Std_Mean_Velocity)
            average_max_velocity += (1/len(general_data))*(general_data[i].Avg_Max_Velocity)
            max_vel.append(general_data[i].Avg_Max_Velocity)
            upper_max_vel.append(general_data[i].Avg_Max_Velocity + general_data[i].Std_Max_Velocity)
            lower_max_vel.append(general_data[i].Avg_Max_Velocity - general_data[i].Std_Max_Velocity)
            std_max_velocity += (1/len(general_data))*(general_data[i].Std_Max_Velocity)
            average_zero_crossings += (1/len(general_data))*(general_data[i].Avg_Zero_Crossings)
            zero_c.append(general_data[i].Avg_Zero_Crossings)
            upper_zero_c.append(general_data[i].Avg_Zero_Crossings + general_data[i].Std_Zero_Crossings)
            lower_zero_c.append(general_data[i].Avg_Zero_Crossings - general_data[i].Std_Zero_Crossings)
            std_zero_crossings += (1/len(general_data))*(general_data[i].Std_Zero_Crossings)
            average_distance_traveled += (1/len(general_data))*(general_data[i].Avg_Distance_Traveled)
            distance_t.append(general_data[i].Avg_Distance_Traveled)
            std_distance_traveled += (1/len(general_data))*(general_data[i].Std_Distance_Traveled)
            upper_distance_t.append(general_data[i].Avg_Distance_Traveled + general_data[i].Std_Distance_Traveled)
            lower_distance_t.append(general_data[i].Avg_Distance_Traveled - general_data[i].Std_Distance_Traveled)
            average_max_acceleration += (1/len(general_data))*(general_data[i].Avg_Max_Acceleration)
            max_acc.append(general_data[i].Avg_Max_Acceleration)
            std_max_acceleration += (1/len(general_data))*(general_data[i].Std_Max_Acceleration)
            upper_max_acc.append(general_data[i].Avg_Max_Acceleration + general_data[i].Std_Max_Acceleration)
            lower_max_acc.append(general_data[i].Avg_Max_Acceleration - general_data[i].Std_Max_Acceleration)


        general_data={}
        general_data['average_number_of_movements'] = round(number_of_movements)
        general_data['average_distance_traveled'] = round(average_distance_traveled, 2)
        general_data['average_duration'] = round(average_duration, 2)
        general_data['average_max_acceleration'] = round(average_max_acceleration, 2)
        general_data['average_zero_crossings'] = round(average_zero_crossings, 2)
        general_data['average_max_velocity'] = round(average_max_velocity, 2)
        general_data['average_mean_velocity'] = round(average_mean_velocity, 2)
        general_data['std_distance_traveled'] = round(std_distance_traveled, 2)
        general_data['std_duration'] = round(std_duration, 2)
        general_data['std_max_acceleration'] = round(std_max_acceleration, 2)
        general_data['std_max_velocity'] = round(std_max_velocity, 2)
        general_data['std_mean_velocity'] = round(std_mean_velocity, 2)
        general_data['std_zero_crossings'] = round(std_zero_crossings, 2)

        dict_dur = {"dates":dates, 
                    "dur": dur, 
                    'upper': upper_dur,
                    'lower': lower_dur}
        dict_mean_vel = {"dates":dates,
                        "mean_vel":mean_vel,
                        'upper':upper_mean_vel,
                        'lower':lower_mean_vel}
        dict_max_vel = {"dates":dates, 
                        "max_vel":max_vel,
                        'upper':upper_max_vel,
                        'lower':lower_max_vel}
        dict_zero_c = {"dates":dates,
                    "zero_c":zero_c,
                    'upper':upper_zero_c,
                    'lower':lower_zero_c}
        dict_distance_t = {"dates":dates,
                        "distance_t":distance_t,
                        'upper':upper_distance_t,
                        'lower':lower_distance_t}
        dict_max_acc = {"dates": dates,
                        "max_acc":max_acc,
                        'upper': upper_max_acc,
                        'lower': lower_max_acc}
        dict_nom = {"dates":dates, 
                    "nom": nom}
        
        context = {'patient_id':patient.id,
                'patient_name': patient.name + " " + patient.surname,
                'timestamps': timestamps,
                'general_data':general_data,
                "duration": dict_dur,
                "mean_velocity": dict_mean_vel,
                "max_velocity": dict_max_vel,
                "zero_crossings":dict_zero_c,
                "distance_traveled": dict_distance_t,
                "max_acceleration": dict_max_acc,
                "number_of_movements":dict_nom,
                "sessions": sessions,
                'patient_info': patient_info,
                "size":size }

        return JsonResponse(context)

@login_required
def load_sessions_td(request, patient_pk):
    therapist = get_object_or_404(Therapist, user=request.user)
    patient = get_object_or_404(Patient, pk=patient_pk)
    patient_list = PatientHasTherapist.objects.filter(therapist=therapist)
    patientSessions = []
    otherPatientsSessions = []
    sessionsToComplete = []
    for patientAndTherapist in patient_list:
        if patientAndTherapist.patient == patient:
            sessions_patient = Session.objects.filter(patientAndTherapist = patientAndTherapist)
            for session in sessions_patient:
                patientSessions.append({
                    'title': session.patientAndTherapist.patient.name + " " + session.patientAndTherapist.patient.surname,
                    'start': session.date,
                })
                if not session.completed:
                    sessionsToComplete.append({
                        'id': session.id,
                        'title': session.date,
                    })
        else:
            sessions_patient = Session.objects.filter(patientAndTherapist = patientAndTherapist)
            for session in sessions_patient:
                otherPatientsSessions.append({
                    'title': session.patientAndTherapist.patient.name + " " + session.patientAndTherapist.patient.surname,
                    'start': session.date,
                })
    if request.headers.get('x-requested-with') == 'XMLHttpRequest':
        data = {
            'patientSessions': patientSessions,
            'otherPatientsSessions': otherPatientsSessions,
            'sessionsToComplete': sessionsToComplete,
        }

        context = {
            'data':data,
        }
        return JsonResponse(context)
    
@login_required
def load_messages_td(request, patient_pk):
    therapist = get_object_or_404(Therapist, user=request.user)
    patient = get_object_or_404(Patient, pk=patient_pk)
    patientAndTherapist = get_object_or_404(PatientHasTherapist, patient = patient, therapist = therapist)
    messagesObj = Message.objects.filter(patientAndTherapist = patientAndTherapist).order_by("date")
    messages = []
    for message in messagesObj:
        messages.append({
            'sender': message.sender,
            'text': message.textMessage,
            'time': str(message.date.strftime("%d-%m-%Y %H:%M"))
        })
        if message.sender == patient.name + " " + patient.surname:
            message.new_message = False
            message.save(update_fields=['new_message'])

    if request.headers.get('x-requested-with') == 'XMLHttpRequest':
        data = {
            'therapist_name': therapist.name + " " + therapist.surname,
            'therapist_mail': therapist.mail,
            'therapist_phone': therapist.phoneNumber,
            'patient_id': patient.id,
            'patient_name': patient.name + " " + patient.surname,
            'messages':messages,
        }
        context = {
            'data':data,
        }
        return JsonResponse(context)
    
@login_required
def completeSession(request, session_pk):
    if request.headers.get('x-requested-with') == 'XMLHttpRequest':
        sessionCompleted = get_object_or_404(Session, pk=session_pk)

        sessionCompleted.completed = True
        sessionCompleted.save()
        context = {
            'message': 'Successfully updated!',
        }
        return JsonResponse(context)
    
@login_required
def deleteSession(request, session_pk):
    if request.headers.get('x-requested-with') == 'XMLHttpRequest':
        sessionToDelete = get_object_or_404(Session, pk=session_pk)

        sessionToDelete.delete()
        context = {
            'message': 'Successfully deleted!',
        }
        return JsonResponse(context)