from django.urls import path
from . import views

urlpatterns = [
    # path('', views.index, name='streetfeast'),
    path('get-nearby-food-trucks/', views.get_nearby_food_trucks, name='get_nearby_food_trucks'),
    path('get-all-food-trucks/', views.get_all_food_trucks, name='get_nearby_food_trucks'),
    path('get-food-truck-details/<int:locationid>/', views.get_food_truck_details, name='get_food_truck_details'),
]