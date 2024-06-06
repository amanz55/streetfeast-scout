from django.urls import path
from . import views

urlpatterns = [
    path('', views.index, name='streetfeast'),
    path('food-trucks/', views.GetAllTrucks, name='streetfeast'),
]