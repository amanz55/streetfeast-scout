from django.core.management.base import BaseCommand
from api.models import FoodTruck
from api.views import haversine_distance

class Command(BaseCommand):
    help = 'Find the 10 closest food trucks based on the given latitude and longitude'

    def add_arguments(self, parser):
        parser.add_argument('latitude', type=float, help='Latitude of the location')
        parser.add_argument('longitude', type=float, help='Longitude of the location')

    def handle(self, *args, **kwargs):
        latitude = kwargs['latitude']
        longitude = kwargs['longitude']

        # Find the 10 closest food trucks
        food_trucks = FoodTruck.objects.all()

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
                "distance_km": distance  # Include the distance in kilometers
            })

        # Print the result
        for index, food_truck in enumerate(result, start=1):
            self.stdout.write(f"{index}. {food_truck['applicant']} - Distance: {food_truck['distance_km']} km")
