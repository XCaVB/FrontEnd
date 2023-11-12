from django.db import models
from django.contrib.auth.models import User

# Create your models here.
class UserData(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    rut = models.CharField(max_length=45)
    #Cargo mas alto
    cargo = models.CharField(max_length=45, default="")
    #adjunto o regular
    tipo_cargo = models.CharField(max_length=45, default="")

    def __str__ (self):
        return self.user

class Admin(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE)

    def __str__ (self):
        return self.user