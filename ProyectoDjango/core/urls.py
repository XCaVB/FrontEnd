from django.urls import path, include
from rest_framework.documentation import include_docs_urls
from rest_framework import routers
from . import views

router = routers.DefaultRouter()
router.register(r'user', views.UserSeri, 'user')
router.register(r'rut', views.UsuarioSeri, 'rut')

urlpatterns = [
    path('core/', include(router.urls)),
    path('docs/', include_docs_urls(title='Core API'))
]

