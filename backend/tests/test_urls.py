from django.test import TestCase
from django.urls import reverse, resolve
from . import views

class TestUrls(TestCase):
    def test_get_nearby_food_trucks_url(self):
        # Test URL pattern for get-nearby-food-trucks
        url = reverse('get_nearby_food_trucks')
        self.assertEqual(url, '/get-nearby-food-trucks/')
        # Test that the resolved view function is correct
        resolver = resolve('/get-nearby-food-trucks/')
        self.assertEqual(resolver.func, views.get_nearby_food_trucks)

    def test_get_all_food_trucks_url(self):
        # Test URL pattern for get-all-food-trucks
        url = reverse('get_all_food_trucks')
        self.assertEqual(url, '/get-all-food-trucks/')
        # Test that the resolved view function is correct
        resolver = resolve('/get-all-food-trucks/')
        self.assertEqual(resolver.func, views.get_all_food_trucks)

    def test_get_food_truck_details_url(self):
        # Test URL pattern for get-food-truck-details/<int:locationid>/
        url = reverse('get_food_truck_details', args=[123])  # Replace 123 with a valid locationid
        self.assertEqual(url, '/get-food-truck-details/123/')
        # Test that the resolved view function is correct
        resolver = resolve('/get-food-truck-details/123/')
        self.assertEqual(resolver.func, views.get_food_truck_details)
