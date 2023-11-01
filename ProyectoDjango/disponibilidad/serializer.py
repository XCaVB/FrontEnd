from rest_framework import serializers
from . models import *

class ProfesorSerializer(serializers.ModelSerializer):
    class Meta:
        model = Profesor
        fields = '__all__'

class ProfesorCursoSerializer(serializers.ModelSerializer):
    class Meta:
        model = ProfesorCurso
        fields = '__all__'