from django.test import TestCase, RequestFactory
from django.urls import reverse
from rest_framework.test import APIRequestFactory
from .models import FoodTruck
from .views import get_nearby_food_trucks, get_all_food_trucks, get_food_truck_details

class TestViews(TestCase):
    def setUp(self):
        # Create a sample FoodTruck instance for testing
        self.food_truck = FoodTruck.objects.create(
            locationid=1,
            applicant="Test Food Truck",
            facility_type="Truck",
            latitude=37.123456,
            longitude=-122.987654,
            dayshours={
                "Monday": ["7AM-7PM"],
                "Tuesday": ["7AM-7PM"],
                "Wednesday": ["7AM-7PM"],
            }
        )

    def test_get_nearby_food_trucks(self):
        # Test GET request to get-nearby-food-trucks
        url = reverse('get_nearby_food_trucks')
        data = {'latitude': 37.123456, 'longitude': -122.987654}  # Provide valid latitude and longitude
        request = APIRequestFactory().post(url, data, format='json')
        response = get_nearby_food_trucks(request)
        self.assertEqual(response.status_code, 200)
        # Add more assertions to validate response data

    def test_get_all_food_trucks(self):
        # Test GET request to get-all-food-trucks
        url = reverse('get_all_food_trucks')
        request = APIRequestFactory().get(url)
        response = get_all_food_trucks(request)
        self.assertEqual(response.status_code, 200)
        # Add more assertions to validate response data

    def test_get_food_truck_details(self):
        # Test GET request to get-food-truck-details/<int:locationid>/
        url = reverse('get_food_truck_details', args=[self.food_truck.locationid])
        request = APIRequestFactory().get(url)
        response = get_food_truck_details(request, locationid=self.food_truck.locationid)
        self.assertEqual(response.status_code, 200)
        # Add more assertions to validate response data
