from django.urls import path

from . import views

urlpatterns = [
    path('logindocente/', views.loginDocente),
    path('loginsecretario/', views.loginSecretario),
]