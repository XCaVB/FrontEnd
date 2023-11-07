from django.shortcuts import render
from rest_framework import viewsets
from . serializer import *
from . models import *

# Create your views here.
class ProfesorSeri(viewsets.ModelViewSet):
    serializer_class = ProfesorSerializer
    queryset = Profesor.objects.all()

