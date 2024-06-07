# backend/api/views.py

from rest_framework.decorators import api_view
from rest_framework.response import Response
from rest_framework import status
from .models import FoodTruck
from math import radians, sin, cos, sqrt, atan2
from datetime import datetime
from .serializers import FoodTruckSerializer

def is_food_truck_open(dayshours, check_datetime=None):
    """
    Check if a food truck is open at the given datetime.
    """
    if check_datetime is None:
        check_datetime = datetime.now()

    check_day = check_datetime.strftime('%A')
    check_time = check_datetime.strftime('%H:%M')

    if check_day not in dayshours:
        return False

    time_ranges = dayshours[check_day]
    for time_range in time_ranges:
        start_time, end_time = time_range.split('-')
        if start_time <= check_time <= end_time:
            return True

    return False

def haversine_distance(lat1, lon1, lat2, lon2):
    """
    Calculate the distance between two points on the Earth's surface
    using the Haversine formula.
    """
    # Convert latitude and longitude from degrees to radians
    lat1, lon1, lat2, lon2 = map(radians, [lat1, lon1, lat2, lon2])

    # Radius of the Earth in kilometers
    R = 6371.0

    # Calculate the differences in latitude and longitude
    dlat = lat2 - lat1
    dlon = lon2 - lon1

    # Calculate the distance using the Haversine formula
    a = sin(dlat / 2) ** 2 + cos(lat1) * cos(lat2) * sin(dlon / 2) ** 2
    c = 2 * atan2(sqrt(a), sqrt(1 - a))
    distance = R * c

    return distance

@api_view(['POST'])
def get_nearby_food_trucks(request):
    """
    Get nearby food trucks based on the given latitude and longitude.
    """
    # Parse latitude and longitude from request data
    latitude = request.data.get('latitude')
    longitude = request.data.get('longitude')

    # Validate latitude and longitude
    try:
        latitude = float(latitude)
        longitude = float(longitude)
    except (ValueError, TypeError):
        return Response({"error": "Invalid latitude or longitude"}, status=status.HTTP_400_BAD_REQUEST)

    if not (-90 <= latitude <= 90) or not (-180 <= longitude <= 180):
        return Response({"error": "Latitude must be between -90 and 90 and longitude must be between -180 and 180"}, status=status.HTTP_400_BAD_REQUEST)

    # Example: A function to find nearby food trucks.
    # You can implement your own logic to find nearby food trucks.
    food_trucks = FoodTruck.objects.all()  # Replace with actual query logic

    # Calculate distances and sort by distance
    food_trucks_with_distance = []
    for food_truck in food_trucks:
        distance = haversine_distance(latitude, longitude, food_truck.latitude, food_truck.longitude)
        food_trucks_with_distance.append((food_truck, distance))

    # Sort food trucks by distance
    food_trucks_with_distance.sort(key=lambda x: x[1])

    # Get the first 10 food trucks with closest distance
    result = []
    for food_truck, distance in food_trucks_with_distance[:10]:
        dayshours = food_truck.dayshours
        is_open = is_food_truck_open(dayshours)

        result.append({
            "locationid": food_truck.locationid,
            "applicant": food_truck.applicant,
            "facility_type": food_truck.facility_type,
            "location_description": food_truck.location_description,
            "address": food_truck.address,
            "status": food_truck.status,
            "food_items": food_truck.food_items,
            "latitude": food_truck.latitude,
            "longitude": food_truck.longitude,
            "dayshours": food_truck.dayshours,
            "is_open": is_open,
            "distance_km": distance  # Include the distance in kilometers
        })

    return Response(result, status=status.HTTP_200_OK)

@api_view(['GET'])
def get_all_food_trucks(request):
    """
    Get all food trucks.
    """
    food_trucks = FoodTruck.objects.all()

    result = []
    for food_truck in food_trucks:
        result.append({
            "locationid": food_truck.locationid,
            "applicant": food_truck.applicant,
            "facility_type": food_truck.facility_type,
            "location_description": food_truck.location_description,
            "address": food_truck.address,
            "status": food_truck.status,
            "food_items": food_truck.food_items,
            "latitude": food_truck.latitude,
            "longitude": food_truck.longitude,
            "dayshours": food_truck.dayshours,
        })

    return Response(result, status=status.HTTP_200_OK)

@api_view(['GET'])
# def get_food_truck_details(request, locationid):
def get_food_truck_details(request, locationid, *args, **kwargs):
    """
    Get details of a specific food truck based on the locationid.
    """
    try:
        food_truck = FoodTruck.objects.get(locationid=locationid)
        serializer = FoodTruckSerializer(food_truck)
        return Response(serializer.data, status=status.HTTP_200_OK)
    except FoodTruck.DoesNotExist:
        return Response({"error": "Food truck not found"}, status=status.HTTP_404_NOT_FOUND)
