from django.contrib import admin

from backend.business.models import Appointment, Customer, Service

# Register your models here.
admin.site.register(Customer)
admin.site.register(Service)
admin.site.register(Appointment)