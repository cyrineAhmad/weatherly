Weatherly  
A weather app built with Angular and Node.js. Includes user authentication and third-party API integration for live weather updates.  

Key Features  

Authentication  

1)JWT-based login/signup (JWT is issued upon successful login or signup)  
2)AuthGuard for route protection  
3)Session persistence using localStorage  
4)Angular Signals used to track login state reactively  

Weather API Integration    

1)Integrated with API Dojo’s Weather API via RapidAPI   
2)Fetches real-time weather details like temperature, conditions, and forecasts  
3)Uses Angular HttpClient to send authenticated GET requests  
4)Displays: City name, Current temperature, Forecast, Sunrise/Sunset ,Wind and humidity levels  

Angular Signals for Authentication    

1)Used to track and manage login state reactively in the AuthService.  
2)Simplifies session management and improves performance by reducing unnecessary checks.    

Testing    

Manual testing performed across various features including:  
1)Login/Signup functionality  
2)AuthGuard protection for restricted routes  
3)Real-time weather data fetching  
4)UI responsiveness across screen sizes    

UI/UX Design    

1)Fully responsive layout  
2)Modular component-based structure  
3)Clean, intuitive UI    

Setup Instructions  
1. Clone the Repository  
git clone https://github.com/cyrineAhmad/weatherly.git    

2. Install Backend Dependencies  
cd backend  
npm install    

3. Run Backend Server  
npm start 
# Server runs on http://localhost:5000    

4. Install Angular App Dependencies  
cd ../WeatherApp  
npm install    

5. Run Angular App  
ng serve --open  
# App runs on http://localhost:4200  
