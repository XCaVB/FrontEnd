from django.shortcuts import render
from rest_framework import viewsets
from . serializer import *
from django.contrib.auth.models import User
from .models import Usuario

# Create your views here.
class UserSeri(viewsets.ModelViewSet):
    serializer_class = UserSerializer
    queryset = User.objects.all()

class UsuarioSeri(viewsets.ModelViewSet):
    serializer_class = UsuarioSerializer
    queryset = Usuario.objects.all()