# serializers.py

from rest_framework import serializers
from .models import FoodTruck

class FoodTruckSerializer(serializers.ModelSerializer):
    class Meta:
        model = FoodTruck
        fields = '__all__'
        # fields = [
            # 'locationid',
            # 'applicant',
            # 'facility_type',
            # 'location_description',
            # 'address',
            # 'status',
            # 'food_items',
            # 'latitude',
            # 'longitude',
            # 'dayshours',
        # ]
