from rest_framework import serializers
from django.contrib.auth.models import User
from .models import *

class UserSerializer(serializers.ModelSerializer):
    groups = serializers.SerializerMethodField()

    class Meta:
        model = User
        fields = ('id','username','first_name','last_name','email','groups')

    # Obtener los nombres de cada grupo que pertenece el User y devolverlos como lista
    def get_groups(self, usuario):
        try:
            group = usuario.groups.values_list('name', flat = True)
            l_lista = list(group)
            return l_lista
        except AttributeError:
            return None

class UsuarioSerializer(serializers.ModelSerializer):
    class Meta:
        model = UserData
        fields = '__all__'

class AdminSerializer(serializers.ModelSerializer):
    class Meta:
        model = Admin
        fields = '__all__'