from django.shortcuts import render
from rest_framework import viewsets
from .serializer import *
from .models import *

# Create your views here.
class AuditoriaSeri(viewsets.ModelViewSet):
    serializer_class = AuditoriaSerializer
    queryset = Auditoria.objects.all()