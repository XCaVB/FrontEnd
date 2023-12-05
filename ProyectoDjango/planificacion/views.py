from django.shortcuts import render
from rest_framework import viewsets, filters
from .serializer import *
from .models import *


# Create your views here.
class SecretarioAcademicoSeri(viewsets.ModelViewSet):
    serializer_class = SecretarioAcademicoSerializer
    queryset = SecretarioAcademico.objects.all()

class PlanificacionAcademicaSeri(viewsets.ModelViewSet):
    serializer_class = PlanificacionAcademicaSerializer
    queryset = PlanificacionAcademica.objects.all()
    filter_backends = [filters.SearchFilter]
    search_fields = ['=profesor__id']

class CursoSeri(viewsets.ModelViewSet):
    serializer_class = CursoSerializer
    queryset = Curso.objects.all()
