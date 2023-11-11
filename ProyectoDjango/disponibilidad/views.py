from django.shortcuts import render
from rest_framework import viewsets, filters
from . serializer import *
from . models import *

# Create your views here.
class ProfesorSeri(viewsets.ModelViewSet):
    serializer_class = ProfesorSerializer
    queryset = Profesor.objects.all()
    filter_backends = [filters.SearchFilter]
    search_fields = ['user__id']

