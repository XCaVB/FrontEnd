from django.db import models
from django.contrib.auth.models import User

# Create your models here
class Auditoria(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE, default='')
    fechaHora = models.CharField(max_length=255)
    evento = models.CharField(max_length=255, default='')
    objetivo = models.CharField(max_length=255, default='')

    def __str__ (self):
        return self.user