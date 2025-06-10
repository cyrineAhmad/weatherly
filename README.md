Weatherly  
A responsive weather forecasting application built with Angular and Node.js.  
It features user authentication, Open-Meteo API integration, modular architecture, and component/unit test readiness.    

Key Features    

JWT Authentication (login/signup with session persistence)  
Weather API Integration using Open-Meteo (current, hourly, daily forecasts)  
Responsive & Accessible UI/UX  
Well-Structured Project Architecture (Pages, Components, Services)  
Unit-Test Friendly component-based design  
Environment-Specific Configs for API endpoints    

Pages    

Login Page   
Allows users to authenticate using their credentials.  
Implements reactive state tracking via Angular Signals.  
Protected redirection to the main weather page upon success.  
Handles and displays error messages.    

Signup Page   
Enables new users to create an account.  
Authenticates immediately after signup.  
Error handling for invalid submissions or API issues.  
Includes navigation UX enhancements.    

Weather Page   
The homepage of the application.  
Pulls in weather data and displays it in two responsive containers:  
LeftContainer: Location, temperature, current conditions.  
RightContainer: Forecasts and highlights.  
Displays a loading spinner while data is being fetched.    

Components    

Header   
App name.  
Includes Logout button if logged in.  
Appears on all pages.    

Footer   
API source  
Links for contact     

LeftContainer  
Displays:  
Current city and temperature.  
Rain percentage    

RightContainer  
Shows the 7-day forecast with dynamic icons based on weather code.  
Converts raw data into visually meaningful summaries.  
Daily highlights (sunrise, sunset, UV, humidity, etc.).    

LoadingSpinner  
A simple and reusable loading animation used across the app.  
Activated during data fetches.    

Services    

AuthService  
Handles user login, signup, and logout.  
Stores JWT token in localStorage.  
Uses Angular Signals to manage login state globally.  
Exposes methods:  
login(credentials)  
signup(data)  
logout()    

Weather Service  
Manages all weather-related logic and data processing.  
Integrates with Open-Meteo’s Weather & Geocoding APIs.  
Methods include:  
getLocationDetails(cityName)  
getWeatherReport(lat, lon)  
getData(): includes API calls, stores structured weather data.  
Data processing methods:  
fillTemperatureDataModel()  
fillWeekData()  
fillTodayData()  
fillTodaysHighlight()  
Utility methods:  
celsiusToFahrenheit(), fahrenheitToCelsius()  
getWeatherDescription(code), getSummaryImage(code, index)    

Testing    
Manual Testing:  
User authentication flow  
Token persistence and session state  
API calls and weather rendering  
UI responsiveness across screen sizes    

API Integrations  
Open-Meteo Weather API  
Retrieves weather forecasts, hourly and daily breakdowns.    

Open-Meteo Geocoding API  
Converts city names into lat/lon coordinates.    

UI/UX    
Consistent design across all pages.  
Responsive across mobile, tablet, and desktop.  
Clear error feedback for failed login/signup.  
Loading states for smooth experience.  
Logical layout using LeftContainer and RightContainer.    

Setup Instructions    

1. Clone the Repository  
git clone https://github.com/cyrineAhmad/weatherly.git    

2. Install Backend Dependencies  
cd backend  
npm install    

3. Run Backend Server  
npm start  
Server runs on http://localhost:5000    

4. Install Angular App Dependencies  
cd ../WeatherApp  
npm install    

6. Run Angular App  
ng serve --open  
App runs on http://localhost:4200  
