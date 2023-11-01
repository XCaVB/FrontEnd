from django.db import models
from django.contrib.auth.models import User
from planificacion.models import PlanificacionAcademica

diurno = "[[0,0,0,0,0,0],[0,0,0,0,0,0],[0,0,0,0,0,0],[0,0,0,0,0,0],[0,0,0,0,0,0],[0,0,0,0,0,0],[0,0,0,0,0,0],[0,0,0,0,0,0],[0,0,0,0,0,0],[0,0,0,0,0,0],[0,0,0,0,0,0],[0,0,0,0,0,0],[0,0,0,0,0,0],[0,0,0,0,0,0]]"
vespertino = "[[0,0,0,0,0,0],[0,0,0,0,0,0],[0,0,0,0,0,0],[0,0,0,0,0,0],[0,0,0,0,0,0],[0,0,0,0,0,0]]"

# Create your models here.
class Profesor(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    carrera = models.CharField(max_length=45)
    departamento = models.CharField(max_length=45)
    jornada = models.CharField(max_length=45)
    #Tipo adjunto o regular
    tipo = models.CharField(max_length=45, default="")
    horarioDiurno = models.CharField(max_length=250, default=diurno)
    horarioVespertino = models.CharField(max_length=250, default=vespertino)

    def __str__ (self):
        return str(self.user)

class ProfesorCurso(models.Model):
    profesor = models.ForeignKey(Profesor, on_delete=models.CASCADE)
    planificacionAcademica = models.ForeignKey(PlanificacionAcademica, on_delete=models.CASCADE, default='')