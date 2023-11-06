from django.urls import path, include
from rest_framework.documentation import include_docs_urls
from rest_framework import routers
from . import views

router = routers.DefaultRouter()
router.register(r'auditoria', views.AuditoriaSeri, 'Auditoria')

urlpatterns = [
    path('auditoria/', include(router.urls)),
    path('docs/', include_docs_urls(title='Auditoria API'))
]

