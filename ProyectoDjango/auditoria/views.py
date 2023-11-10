from rest_framework import viewsets
from .serializer import *
from .models import *

# Create your views here.
class AuditoriaSeri(viewsets.ModelViewSet):
    serializer_class = AuditoriaSerializer
    queryset = Auditoria.objects.all()



#TEST DE USUARIO


from django.contrib.auth import authenticate

user = authenticate(username="o.salinassilva@uandresbello.edu", password="116220792!")

if user is not None:
    print('CORRECTO')
else:
    print('MAL')