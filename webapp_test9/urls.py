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

    # therapist dashboard
    path('therapist_dashboard/', views.therapist_dashboard, name="therapist_dashboard"),    
    path('therapist_dashboard/load_patients/', views.load_patients_td, name="load_patient_td"), 
    path('therapist_dashboard/load_admin/', views.load_admin_td, name="load_admin_td"), 
    path('therapist_dashboard/load_admin_info/', views.load_admin_info_td, name="load_admin_info_td"), 
    path('therapist_dashboard/load_analysis/<int:patient_pk>', views.load_analysis_td, name="load_analysis_td"), 
    path('therapist_dashboard/load_sessions/<int:patient_pk>', views.load_sessions_td, name="load_sessions_td"),
    path('therapist_dashboard/load_messages/<int:patient_pk>', views.load_messages_td, name="load_messages_td"),
    path('therapist_dashboard/complete_session/<int:session_pk>', views.completeSession, name="completeSession"),
    path('therapist_dashboard/delete_session/<int:session_pk>', views.deleteSession, name="deleteSession"),

    
    # Patient portal
    # path('login_patient/', views.login_patient, name='login_patient'),
    path('patient_dashboard/', views.patient_dashboard, name="patient_dashboard"),   
    path('patient_dashboard/load_info/', views.load_info_pd, name="load_info_pd"),  
    path('patient_dashboard/load_analysis/', views.load_analysis_pd, name="load_analysis_pd"), 
    path('patient_dashboard/load_messages/', views.load_messages_pd, name="load_messages_pd"), 
    path('patient_dashboard/download_report/', views.donwload_pdf, name="download_pdf")

]

urlpatterns += static(settings.STATIC_URL, document_root = settings.STATIC_ROOT)
urlpatterns += static(settings.MEDIA_URL, document_root = settings.MEDIA_ROOT)