# 🌐 Street-Feast Scout

StreetFeast Scout is a web application designed to help users discover and locate food trucks in various locations. With its intuitive interface and robust functionality, StreetFeast Scout simplifies the process of finding and exploring street food options.

## 🤨 The Problem

StreetFeast Scout aims to address the challenge of discovering and locating food trucks in various locations, particularly in San Francisco. The problem statement outlines the need for a solution that allows users to easily find nearby food trucks based on their current location or specified coordinates.

## ✅ Key Features

- **Find Nearby Food Trucks**: Use your current location or specify coordinates to find nearby food trucks.
- **View Food Truck Details**: Explore detailed information about each food truck, including location, menu, and opening hours.
- **Command-Line Interface (CLI)**: Quickly find nearby food trucks using coordinates from the command line.

## 💻 Tech Stack

- **Backend**: Django
- **Frontend**: Next.js
- **Database**: PostgreSQL
- **CLI**: Python
- **Map**: Leaflet Open street

## Installation

1, **Clone the repository**:

```bash
git clone https://github.com/amanz55/streetfeast-scout.git
cd streetfeast-scout
```

2, **Create a Virtual Environment**: Set up a virtual environment for the project to isolate dependencies.
```bash
python -m venv env
```

3, **Activate the Virtual Environment**: Activate the virtual environment to install and run dependencies locally.
```bash
On Windows:
  .\env\Scripts\activate
On MacOS/Linux:
  source env/bin/activate
```

4, **Install dependencies**:
```bash
pip install -r backend/requirements.txt
cd frontend
npm install
```

5, **Set Up Postgres DB**: Create a Postgresql database and obtain the connection URI/ string. Replace the placeholder values in the .env.example file with your actual connection string and any other required environment variables. Rename the file to .env.

6, **Import Data into Postgres**: Use custom commands to import food truck data from a CSV file into PostgreSQL Database.
```bash
cd backend/api
python manage.py import_food_trucks
```

7, **Run the development server**: To access the backend url at http://localhost:8000
```bash
python backend/manage.py runserver
```

8, **Access the CLI interface**:
```bash
cd backend
python manage.py find_nearby_trucks <latitude> <longitude>
```

9, **Run the frontend server**: To access the web interface at http://localhost:3000/
```bash
cd frontend
npm run dev
```

## 🛠️ Project Flow

### 🤔 1, Understanding the Problem

The project began with a thorough understanding of the problem statement, which involved building a solution to help users find food trucks based on their location in San Francisco.

### 😎 2, Tech Stack Selection

After understanding the requirements, the tech stack was selected. Django was chosen for the backend due to its robustness and ease of development, while React was chosen for the frontend to create a dynamic and interactive user interface.

### 🪧 3, Planning and Architecture

The project was structured as a monolithic repository, with separate directories for frontend and backend code. The architecture was designed to ensure scalability and maintainability.

### 💻 4, Backend Development

Development started with the backend, where Django models were created to represent food trucks. Views and API endpoints were implemented to serve food truck data to the frontend and CLI.

### 🖥 5, Frontend Development

Next, the frontend was developed using React. Components were created to render the user interface, and API calls were made to fetch data from the backend.

### 🌐 6, Integration and Testing

Once both frontend and backend were developed, integration testing was performed to ensure smooth communication between the two. Unit tests were written to verify the functionality of individual components.

### 🖥 7, CLI Implementation

As per the project requirements, a command-line interface (CLI) was developed to provide users with a quick way to find nearby food trucks using coordinates.

### 🗒 8, Documentation and Cleanup

The project was finalized with thorough documentation covering the project flow, setup instructions, and future plans. Code cleanup was done to ensure readability and maintainability.

## 👊 Challenges Faced

### 🗾 1, Map Integration

Integrating a map service into the frontend proved to be challenging due to limited documentation and unfamiliarity with certain packages. However, perseverance and problem-solving skills helped overcome this obstacle.

### 😓2, Data Parsing

Parsing and cleaning the CSV data provided for food truck locations required careful consideration of data formats and structures. Custom functions were developed to ensure accurate data representation in the database.

## ✅ Accomplishments

### 🛠1, Backend Functionality

Successfully implemented Django models, views, and API endpoints to serve food truck data to the frontend and CLI.

### 🧑‍💻2, Frontend Design and Implementation

Designed a user-friendly and intuitive frontend interface using React, with components for viewing food truck details and interactive maps.

### 🖥 3, CLI Integration

Developed a command-line interface (CLI) to provide users with a quick and efficient way to find nearby food trucks using coordinates.

## 🚀 Future Plans

### ⚙️1, Authentication

Implement user authentication to allow users to save favorite locations and view their browsing history.

### 🚀2, Deployment

Deploy the application to make it accessible to a wider audience, potentially using platforms like Heroku or AWS.

### 🗓3, Enhanced Features

Explore additional features such as real-time updates, user reviews, and ratings to enhance the user experience.

### 🌐4, Advanced Map Functionalities

Integrate more advanced features such like routing and direction based navigation. Incorporating more reliable and advanced proximity calculating algorithms.

## 📸 Screenshots

![Screenshot 2024-06-08 131246](https://github.com/amanz55/streetfeast-scout/assets/80655668/a55cae80-8655-4a81-9a84-6ec94343fd30)



![Screenshot 2024-06-08 131233](https://github.com/amanz55/streetfeast-scout/assets/80655668/d544b5f1-5fde-4b3c-a76d-574c96d50d31)



![Screenshot 2024-06-08 131217](https://github.com/amanz55/streetfeast-scout/assets/80655668/5dd363c3-2427-46fd-9c4a-a7061df38fd3)



![Screenshot 2024-06-08 131206](https://github.com/amanz55/streetfeast-scout/assets/80655668/a7ae0f90-8231-45d0-8e32-43e1b341e06a)



![Screenshot 2024-06-08 131141](https://github.com/amanz55/streetfeast-scout/assets/80655668/5f8aba8c-1792-4b1a-9b6c-0f1704a23a91)



![Screenshot 2024-06-08 131301](https://github.com/amanz55/streetfeast-scout/assets/80655668/a7f9aa40-07de-4820-8ec6-20ed587250d4)
 

## License

This project is licensed under the MIT License.
