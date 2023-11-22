from rest_framework.decorators import api_view
from rest_framework.response import Response
from rest_framework import status

from django.shortcuts import get_object_or_404
from django.contrib.auth.models import User

from .serializers import UserSerializer

@api_view(['POST'])
def loginDocente(request):
    user = get_object_or_404(User, username=request.data['username'])
    if not user.check_password(request.data['password']):
        return Response("missing user", status=status.HTTP_404_NOT_FOUND)
    serializer = UserSerializer(user)
    print(serializer.data['groups'])
    if 1 in serializer.data['groups']:
        print('es docente valido')
        return Response({'user': serializer.data}, status=status.HTTP_200_OK)
    return Response(status=status.HTTP_401_UNAUTHORIZED)
    

@api_view(['POST'])
def loginSecretario(request):
    user = get_object_or_404(User, username=request.data['username'])
    if not user.check_password(request.data['password']):
        return Response("missing user", status=status.HTTP_404_NOT_FOUND)
    serializer = UserSerializer(user)
    if 2 in serializer.data['groups']:
        print('es secretario valido')
        return Response({'user': serializer.data}, status=status.HTTP_200_OK)
    return Response(status=status.HTTP_401_UNAUTHORIZED)
