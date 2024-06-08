from django.test import TestCase
from .models import FoodTruck

class FoodTruckModelTest(TestCase):
    @classmethod
    def setUpTestData(cls):
        # Create a FoodTruck instance for testing
        FoodTruck.objects.create(
            locationid=1,
            applicant="Test Food Truck",
            facility_type="Truck",
            latitude=37.123456,
            longitude=-122.987654,
        )

    def test_str_representation(self):
        # Test the __str__() method
        food_truck = FoodTruck.objects.get(locationid=1)
        self.assertEqual(str(food_truck), "Test Food Truck")

    def test_default_values(self):
        # Test default values for optional fields
        food_truck = FoodTruck.objects.get(locationid=1)
        self.assertIsNone(food_truck.location_description)
        self.assertIsNone(food_truck.address)
        self.assertIsNone(food_truck.status)
        self.assertIsNone(food_truck.food_items)
        self.assertIsNone(food_truck.dayshours)
        self.assertIsNone(food_truck.expiration_date)
        self.assertIsNone(food_truck.location)

    def test_model_fields(self):
        # Test the field types and attributes
        food_truck = FoodTruck.objects.get(locationid=1)
        self.assertIsInstance(food_truck.locationid, int)
        self.assertIsInstance(food_truck.applicant, str)
        self.assertIsInstance(food_truck.facility_type, str)
        self.assertIsInstance(food_truck.latitude, float)
        self.assertIsInstance(food_truck.longitude, float)
        self.assertIsInstance(food_truck.location_description, str)
        self.assertIsInstance(food_truck.address, str)
        self.assertIsInstance(food_truck.status, str)
        self.assertIsInstance(food_truck.food_items, list)
        self.assertIsInstance(food_truck.dayshours, dict)
        self.assertIsInstance(food_truck.expiration_date, type(None))
        self.assertIsInstance(food_truck.location, str)

    # Add more test methods as needed
