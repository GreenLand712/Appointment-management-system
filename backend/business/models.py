from django.db import models
from django.contrib.auth.models import User

# Create your models here.
class Customer(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE, null=True)
    gender = models.CharField(max_length=20, null=True)
    status = models.CharField(max_length=20, null=True, choices=(('confirmed', 'confirmed'), ('paid', 'paid'), ('canceled', 'canceled')))

    def __str__(self):
        return self.user.username

class Service(models.Model):
    name = models.CharField(max_length=30, null=True)
    cost = models.IntegerField(null=True)

    def __str__(self):
        return self.name

class Appointment(models.Model):
    service = models.ForeignKey(Service, on_delete=models.CASCADE, null=True)
    customer = models.ForeignKey(Customer, on_delete=models.CASCADE, null=True)
    status = models.CharField(max_length=20, null=True, choices=(('confirmed', 'confirmed'), ('paid', 'paid'), ('canceled', 'canceled')))
    date = models.DateField(null=True)
    time = models.TimeField(null=True)
    location = models.TextField(max_length=200)

    def __str__(self):
        return self.customer.user.username + " " + self.service.name