from django.shortcuts import render
from rest_framework import viewsets
from .serializer import *
from .models import *

# Create your views here.
class AdminSeri(viewsets.ModelViewSet):
    serializer_class = AdminSerializer
    queryset = Admin.objects.all()

class AuditoriaSeri(viewsets.ModelViewSet):
    serializer_class = AuditoriaSerializer
    queryset = Auditoria.objects.all()