from django.db import models
from django.contrib.auth.models import User
from disponibilidad.models import Profesor

# Create your models here.
class SecretarioAcademico(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    carrera = models.CharField(max_length=255)

    def __str__ (self):
        return self.user

class Curso(models.Model):
    materia = models.CharField(max_length=255)
    Curso = models.CharField(max_length=255)
    nombreAsignatura = models.CharField(max_length=255)

    def __str__ (self):
        return self.nombreAsignatura

class PlanificacionAcademica(models.Model):
    profesor = models.ForeignKey(Profesor, on_delete=models.CASCADE, default='')
    curso = models.ForeignKey(Curso, on_delete=models.CASCADE, default='')
    periodo = models.CharField(max_length=255)
    campus = models.CharField(max_length=255)
    jornada = models.CharField(max_length=255)

"""
class HorarioCurso(models.Model):
    curso = models.ForeignKey(Curso, on_delete=models.CASCADE)
    horaInicio = models.CharField(max_length=255)
    horaFin = models.CharField(max_length=255)
    dia = models.CharField(max_length=255)

class programaAcademico(models.Model):
    programa = models.CharField(max_length=255)
    fechaInicio = models.DateField()
    fechaFin = models.DateField()
"""