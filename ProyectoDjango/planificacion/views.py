from django.shortcuts import render
from rest_framework import viewsets
from .serializer import *
from .models import *

# Create your views here.
class SecretarioAcademicoSeri(viewsets.ModelViewSet):
    serializer_class = SecretarioAcademicoSerializer
    queryset = SecretarioAcademico.objects.all()

class PlanificacionAcademicaSeri(viewsets.ModelViewSet):
    serializer_class = PlanificacionAcademicaSerializer
    queryset = PlanificacionAcademica.objects.all()

class CursoSeri(viewsets.ModelViewSet):
    serializer_class = CursoSerializer
    queryset = Curso.objects.all()
