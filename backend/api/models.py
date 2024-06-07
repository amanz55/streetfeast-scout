# backend/api/models.py

from django.db import models
from django.contrib.postgres.fields import ArrayField

class FoodTruck(models.Model):
    locationid = models.IntegerField(primary_key=True)
    applicant = models.CharField(max_length=255)
    facility_type = models.CharField(max_length=50)
    location_description = models.TextField(blank=True, null=True)
    address = models.CharField(max_length=255, blank=True, null=True)
    status = models.CharField(max_length=50, blank=True, null=True)
    food_items = ArrayField(models.CharField(max_length=255), blank=True, null=True)
    latitude = models.DecimalField(max_digits=9, decimal_places=6)
    longitude = models.DecimalField(max_digits=9, decimal_places=6)
    dayshours = models.JSONField(blank=True, null=True)
    expiration_date = models.DateField(blank=True, null=True)
    location = models.CharField(max_length=255, blank=True, null=True)

    def __str__(self):
        return self.applicant
