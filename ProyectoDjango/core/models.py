from django.db import models
from django.contrib.auth.models import User

# Create your models here.
class Usuario(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    rut = models.CharField(max_length=45)
    cargo = models.CharField(max_length=45, default="")