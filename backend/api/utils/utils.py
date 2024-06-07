import re
import datetime

def parse_date(date_str):
    """
    Parse the date string and convert it into the YYYY-MM-DD format.
    """
    if not date_str:
        return None  # Return None for empty date strings
    else:
        # Parse the input date string using the appropriate format
        date_obj = datetime.datetime.strptime(date_str, "%m/%d/%Y %I:%M:%S %p")

        # Format the date object into the desired format (YYYY-MM-DD)
        formatted_date = date_obj.strftime("%Y-%m-%d")

        return formatted_date


def parse_dayshours(dayshours):
    """
    Parse the dayshours string and convert it into a structured format.
    """
    day_map = {
        'Mo': 'Monday', 'Tu': 'Tuesday', 'We': 'Wednesday',
        'Th': 'Thursday', 'Fr': 'Friday', 'Sa': 'Saturday', 'Su': 'Sunday'
    }
    day_hours = {}

    # Split multiple day-hour groups
    day_hour_groups = re.split(r';|/', dayshours)

    for group in day_hour_groups:
        # Check if the group contains the delimiter ':'
        if ':' in group:
            # Split days and hours
            days, hours = group.split(':')
            days = days.split('-')

            # Handle ranges like Mo-Fr
            if len(days) == 2:
                start_day, end_day = days
                start_index = list(day_map.keys()).index(start_day)
                end_index = list(day_map.keys()).index(end_day) + 1
                days = list(day_map.values())[start_index:end_index]
            else:
                days = [day_map[day] for day in days[0].split('/')]

            for day in days:
                if day not in day_hours:
                    day_hours[day] = []
                day_hours[day].append(hours)
        else:
            # Handle the case where the group does not contain the delimiter ':'
            # For example, if only hours are provided without days
            hours = group  # Assume the entire group represents hours

    return day_hours
