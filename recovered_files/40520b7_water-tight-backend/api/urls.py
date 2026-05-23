from django.urls import path
from . import views

urlpatterns = [
    path('services/', views.ServiceListAPIView.as_view(), name='services'),
    path('team/', views.TeamListAPIView.as_view(), name='team'),
    path('contact/', views.ContactCreateAPIView.as_view(), name='contact'),
]
