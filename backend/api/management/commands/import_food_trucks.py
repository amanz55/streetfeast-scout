from django.core.management.base import BaseCommand
from api.models import FoodTruck
from api.utils.utils import parse_dayshours, parse_date
import csv

class Command(BaseCommand):
    help = 'Import food trucks from CSV file'

    def handle(self, *args, **kwargs):
        with open('./api/data/food-truck-data.csv', newline='', encoding='utf-8') as csvfile:
            reader = csv.DictReader(csvfile)
            for row in reader:
                try:
                    latitude = float(row['Latitude'])
                    longitude = float(row['Longitude'])

                    if not (-90 <= latitude <= 90) or not (-180 <= longitude <= 180):
                        self.stdout.write(self.style.WARNING(f"Skipping invalid row due to invalid latitude/longitude: {row}"))
                        continue

                except ValueError:
                    self.stdout.write(self.style.WARNING(f"Skipping invalid row: {row}"))
                    continue

                food_items = row['FoodItems'].split(':')
                food_items = [item.strip() for item in food_items]

                dayshours = parse_dayshours(row['dayshours'])

                expiration_date = parse_date(row['ExpirationDate'])

                # Check if a food truck with the same locationid already exists
                existing_food_truck = FoodTruck.objects.filter(locationid=row['locationid']).first()

                if existing_food_truck:
                    # Food truck with the same locationid already exists, skip
                    self.stdout.write(self.style.WARNING(f"Food truck with locationid {row['locationid']} already exists. Skipping..."))
                    continue
                else:
                    # Create a new food truck object and save it to the database
                    FoodTruck.objects.create(
                        locationid=row['locationid'],
                        applicant=row['Applicant'],
                        facility_type=row['FacilityType'],
                        location_description=row['LocationDescription'],
                        address=row['Address'],
                        status=row['Status'],
                        food_items=food_items,
                        latitude=latitude,
                        longitude=longitude,
                        dayshours=dayshours,
                        expiration_date=expiration_date,
                        location=row['Location']
                    )
                    self.stdout.write(self.style.SUCCESS(f"Imported food truck with locationid {row['locationid']}"))

        self.stdout.write(self.style.SUCCESS('Successfully imported food trucks'))
