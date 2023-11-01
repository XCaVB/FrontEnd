from django.db import models
from django.contrib.auth.models import User

# Create your models here.
class Admin(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE)

    def __str__ (self):
        return self.user

class Auditoria(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE, default='')
    evento = models.CharField(max_length=255)
    fechaHora = models.CharField(max_length=255)

    def __str__ (self):
        return self.user