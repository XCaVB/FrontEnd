from rest_framework import serializers
from .models import *

class SecretarioAcademicoSerializer(serializers.ModelSerializer):
    class Meta:
        model = SecretarioAcademico
        fields = '__all__'

class PlanificacionAcademicaSerializer(serializers.ModelSerializer):
    class Meta:
        model = PlanificacionAcademica
        fields = '__all__'

class CursoSerializer(serializers.ModelSerializer):
    class Meta:
        model = Curso
        fields = '__all__'
