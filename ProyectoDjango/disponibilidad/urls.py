from django.urls import path, include
from rest_framework.documentation import include_docs_urls
from rest_framework import routers
from . import views

router = routers.DefaultRouter()
router.register(r'profesor', views.ProfesorSeri, 'Profesor')
router.register(r'profesor-curso', views.ProfesorCursoSeri, 'ProfesorCurso')


urlpatterns = [
    path('disponibilidad/', include(router.urls)),
    path('docs/', include_docs_urls(title='Profesor API'))
]

