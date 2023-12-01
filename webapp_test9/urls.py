"""
URL configuration for webapp_test9 project.

The `urlpatterns` list routes URLs to views. For more information please see:
    https://docs.djangoproject.com/en/4.2/topics/http/urls/
Examples:
Function views
    1. Add an import:  from my_app import views
    2. Add a URL to urlpatterns:  path('', views.home, name='home')
Class-based views
    1. Add an import:  from other_app.views import Home
    2. Add a URL to urlpatterns:  path('', Home.as_view(), name='home')
Including another URLconf
    1. Import the include() function: from django.urls import include, path
    2. Add a URL to urlpatterns:  path('blog/', include('blog.urls'))
"""
from django.contrib import admin
from django.urls import path
from django.conf import settings
from django.conf.urls.static import static
from skaaltec_test9 import views

urlpatterns = [

    path('admin_skaaltec_test9/', admin.site.urls),

    # Commercial website
    path('', views.main, name='main'),
    path('smartVNS/', views.smartVNS, name='smartVNS'),
    path('aboutus/', views.aboutus, name='aboutus'),
    path('news/', views.news, name='news'),
    path('contactus/', views.contactus, name='contactus'),

    # General logout
    path('login/', views.login_user, name='login_user'),
    path('logout/', views.logout_user, name='logout_user'),

    # Therapist portal
    # path('login_therapist/', views.login_therapist, name='login_therapist'),
    # path('main_therapist/', views.main_therapist, name='main_therapist'),
    # path('main_therapist/patients_data/', views.patients_data, name="patients_data"),
    # path('main_therapist/load_messages_therapist/', views.load_messages_therapist, name="load_messages_therapist"),
    # path('main_therapist/load_session_therapist/', views.load_session_therapist, name="load_session_therapist"),
    # path('main_therapist/analysis_dashboard/', views.analysis_dashboard, name="analysis_dashboard"),
    # path('main_therapist/analysis_dashboard/load_patients_analysis/', views.load_patients_analysis, name="load_patients_analysis"),
    # path('main_therapist/analysis_dashboard/load_graphs/<int:patient_pk>', views.load_graphs, name="load_graphs"),
    # path('main_therapist/upload_dashboard/', views.upload_dashboard, name="upload_dashboard"),
    # path('main_therapist/upload_dashboard/load_patients_upload/', views.load_patients_upload, name="load_patients_upload"),
    # path('main_therapist/upload_dashboard/load_session_upload/<int:patient_pk>', views.load_session_upload, name="load_session_upload"),
    # path('main_therapist/messages_dashboard/', views.messages_dashboard, name="messages_dashboard"),
    # path('main_therapist/messages_dashboard/load_messages/', views.load_messages, name="load_messages"),
    # path('main_therapist/messages_dashboard/load_chat/<int:sender_id>', views.load_chat, name="load_chat"),
    # path('main_therapist/sessions_dashboard/', views.sessions_dashboard, name="sessions_dashboard"),
    # path('main_therapist/sessions_dashboard/load_patients/', views.load_patients_session, name="load_patients_session"),
    # path('main_therapist/sessions_dashboard/load_sessions/<int:patient_pk>', views.load_sessions_session, name="load_sessions_session"),

    # therapist dashboard
    path('therapist_dashboard/', views.therapist_dashboard, name="therapist_dashboard"),    
    path('therapist_dashboard/load_patients/', views.load_patients_td, name="load_patient_td"), 
    path('therapist_dashboard/load_admin/', views.load_admin_td, name="load_admin_td"), 
    path('therapist_dashboard/load_admin_info/', views.load_admin_info_td, name="load_admin_info_td"), 
    path('therapist_dashboard/load_analysis/<int:patient_pk>', views.load_analysis_td, name="load_analysis_td"), 
    path('therapist_dashboard/load_sessions/<int:patient_pk>', views.load_sessions_td, name="load_sessions_td"),
    path('therapist_dashboard/load_messages/<int:patient_pk>', views.load_messages_td, name="load_messages_td"),
    
    # Patient portal
    # path('login_patient/', views.login_patient, name='login_patient'),
    path('patient_dashboard/', views.patient_dashboard, name="patient_dashboard"),   
    path('patient_dashboard/load_info/', views.load_info_pd, name="load_info_pd"),  
    path('patient_dashboard/load_analysis/', views.load_analysis_pd, name="load_analysis_pd"), 
    path('patient_dashboard/load_messages/', views.load_messages_pd, name="load_messages_pd"), 

]

urlpatterns += static(settings.STATIC_URL, document_root = settings.STATIC_ROOT)
urlpatterns += static(settings.MEDIA_URL, document_root = settings.MEDIA_ROOT)