from django.urls import path, include
from rest_framework.documentation import include_docs_urls
from rest_framework import routers
from . import views

router = routers.DefaultRouter()
router.register(r'secretario-academico', views.SecretarioAcademicoSeri, 'SecretarioAcademico')
router.register(r'planificaion-academica', views.PlanificacionAcademicaSeri, 'Planificacion Academica')
router.register(r'curso', views.CursoSeri, 'Curso')

urlpatterns = [
    path('planificacion/', include(router.urls)),
    path('docs/', include_docs_urls(title='Secretario Academico API'))
]

