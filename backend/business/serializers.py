from rest_framework import serializers
from .models import *

class CustomerSerializer(serializers.ModelSerializer):
    user = serializers.SerializerMethodField()
    first_name = serializers.SerializerMethodField()
    last_name = serializers.SerializerMethodField()
    status = serializers.SerializerMethodField()
    class Meta:
        model = Customer
        fields = ('pk', 'user', 'first_name', 'last_name', 'gender', 'status')

    def get_user(self, obj):
        return obj.user.username
    def get_first_name(self, obj):
        return obj.user.first_name
    def get_last_name(self, obj):
        return obj.user.last_name
    def get_status(self, obj):
        return obj.get_status_display()

class ServiceSerializer(serializers.ModelSerializer):
    class Meta:
        model = Service
        fields = ('pk', 'name', 'cost')

class AppointmentSerializer(serializers.ModelSerializer):
    service = serializers.SerializerMethodField()
    customer = serializers.SerializerMethodField()
    status = serializers.SerializerMethodField()

    class Meta:
        model = Appointment
        fields = ('pk', 'customer', 'service', 'status', 'date', 'time')

    def get_customer(self, obj):
        return obj.customer.user.username

    def get_service(self, obj):
        return obj.service.name