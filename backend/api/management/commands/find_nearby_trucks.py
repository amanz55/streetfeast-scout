# backend/api/management/commands/find_nearby_supermarkets.py

from django.core.management.base import BaseCommand
import requests

class Command(BaseCommand):
    help = 'Find 6 nearby food trucks based on your latitude and longitude'

    def add_arguments(self, parser):
        parser.add_argument('latitude', type=float, help='Latitude of your location')
        parser.add_argument('longitude', type=float, help='Longitude of your location')

    def handle(self, *args, **kwargs):
        latitude = kwargs['latitude']
        longitude = kwargs['longitude']
        base_url = 'http://127.0.0.1:8000/food-trucks/'

        params = {
            'latitude': latitude,
            'longitude': longitude
        }

        response = requests.get(base_url, params=params)
        if response.status_code == 200:
            food_trucks = response.json()
            if food_trucks:
                for food_truck in food_trucks:
                    print(food_truck, ":", food_trucks[food_truck])
                    self.stdout.write(self.style.SUCCESS(
                        "This is me from the command line"
                    ))
            else:
                self.stdout.write(self.style.WARNING("No food trucks found nearby."))
        else:
            self.stdout.write(self.style.ERROR(
                f"Failed to retrieve food trucks. Status code: {response.status_code}"
            ))
