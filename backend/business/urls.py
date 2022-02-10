from django.conf.urls import url
from django.urls import include, path
from .views import *

urlpatterns = [
    path('login/', Login.as_view(), name='login'),
    path('signup/', Signup.as_view(), name='signup'),
    path('admin-login/', Admin_login.as_view(), name='admin-login'),
    path('business/', BusinessView.as_view(), name='business'),
    path('service/', ServiceView.as_view(), name='service'),
    path('', AppointmentView.as_view(), name='appointment'),
    path('customer/', CustomerView.as_view(), name='customer'),
    path('appointment-date/', AppointmentDateView.as_view(), name='appointment-date'),
    path('add/', AddAppointment.as_view(), name='add-appointment'),
    url(r'^(?P<id>\d+)/$', RUDAppointment.as_view(), name='rud-appointment'),
]