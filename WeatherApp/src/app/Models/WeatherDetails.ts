export interface WeatherDetails {
  latitude: number;
  longitude: number;
  generationtime_ms: number;
  utc_offset_seconds: number;
  timezone: string;
  timezone_abbreviation: string;
  elevation: number;

  current_weather: {
    temperature: number;
    windspeed: number;
    winddirection: number;
    weathercode: number;
    time: string;
    windgusts?: number;
  };

  hourly?: {
  time: string[];
  temperature_2m: number[];
  apparent_temperature?: number[];
  visibility?: number[];
  weathercode: number[];
  relative_humidity_2m?: number[];
  windgusts_10m?: number[];
  cloudcover?: number[];
  pm2_5?: number[];
};


  daily?: {
    time: string[];
    weathercode: number[];
    temperature_2m_max: number[];
    temperature_2m_min: number[];
    sunrise: string[];
    sunset: string[];
    uv_index_max: number[];
    windgusts_10m_max?: number[];
    precipitation_sum?: number[];
    windspeed_10m_max?: number[]; 
    sunshine_duration?: number[]; 
  };
}
