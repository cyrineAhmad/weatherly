import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { LocationDetails } from '../Models/LocationDetails';
import { WeatherDetails } from '../Models/WeatherDetails';
import { TemperatureData } from '../Models/TemperatureData';
import { TodayData } from '../Models/TodayData';
import { WeekData } from '../Models/WeekData';
import { TodaysHighlight } from '../Models/TodaysHighlight';
import { Observable } from 'rxjs';
import { EnvironmentalVariables } from '../Environment/EnvironmentalVariables';

@Injectable({
  providedIn: 'root',
})
export class Weather {
  public loading: boolean = true;
  locationDetails?: LocationDetails;
  weatherDetails?: WeatherDetails;
  temperatureData: TemperatureData = new TemperatureData();
  todayData: TodayData[] = [];
  weekData: WeekData[] = [];
  todaysHighlight?: TodaysHighlight = new TodaysHighlight();

  cityName: string = 'Beirut';
  language: string = 'en';
  date: string = '2025-06-06';
  temperatureUnit: string = 'celsius';

  currentTime: Date;
  today: boolean = false;
  week: boolean = true;
  celsius: boolean = true;
  fahrenheit: boolean = false;

  constructor(private httpClient: HttpClient) {
    this.getData();
  }

  getSummaryImage(weatherCode: number, dayIndex: number = 0): string {
  const daily = this.weatherDetails?.daily;
  if (!daily) return '/cloudySunny.png';

  const tempMax = daily.temperature_2m_max?.[dayIndex] ?? 0;
  const tempMin = daily.temperature_2m_min?.[dayIndex] ?? 0;
  const precipitation = daily.precipitation_sum?.[dayIndex] ?? 0;
  const windSpeed = daily.windspeed_10m_max?.[dayIndex] ?? 0;
  const sunshine = daily.sunshine_duration?.[dayIndex] ?? 0;
  const cloudCover = this.weatherDetails?.hourly.cloudcover?.[dayIndex] ?? 50;

  // Logic to adjust image
  if (precipitation > 10) return '/rainy.png';
  if (tempMax < 5) return '/snow.png';
  if (windSpeed > 50) return '/windy.png';
  if (cloudCover > 70) return '/cloudy.png';
  if (sunshine > 25000 && cloudCover < 30) return '/sunny.png';

  if (weatherCode >= 0 && weatherCode <= 3) return '/sunny.png';
  if (weatherCode === 4) return '/cloudy.png';
  if (weatherCode === 45 || weatherCode === 48) return '/fog.png';
  if (weatherCode >= 51 && weatherCode <= 67) return '/rainy.png';
  if (weatherCode >= 71 && weatherCode <= 77) return '/snow.png';
  if (weatherCode >= 80 && weatherCode <= 82) return '/rainy.png';
  if (weatherCode >= 95 && weatherCode <= 99) return '/thunderstorm.png';

  return '/cloudySunny.png';
}


  getWeatherDescription(weatherCode: number): string {
    const codes: { [key: number]: string } = {
      0: 'Clear sky',
      1: 'Mainly clear',
      2: 'Partly cloudy',
      3: 'Overcast',
      45: 'Fog',
      48: 'Depositing rime fog',
      51: 'Light drizzle',
      53: 'Moderate drizzle',
      55: 'Dense drizzle',
      56: 'Light freezing drizzle',
      57: 'Dense freezing drizzle',
      61: 'Slight rain',
      63: 'Moderate rain',
      65: 'Heavy rain',
      66: 'Light freezing rain',
      67: 'Heavy freezing rain',
      71: 'Slight snow fall',
      73: 'Moderate snow fall',
      75: 'Heavy snow fall',
      77: 'Snow grains',
      80: 'Slight rain showers',
      81: 'Moderate rain showers',
      82: 'Violent rain showers',
      85: 'Slight snow showers',
      86: 'Heavy snow showers',
      95: 'Thunderstorm',
      96: 'Thunderstorm with slight hail',
      99: 'Thunderstorm with heavy hail'
    };
    return codes[weatherCode] || 'Unknown weather';
  }

  fillTemperatureDataModel() {
    if (!this.weatherDetails?.current_weather) return;

    const current = this.weatherDetails.current_weather;
    this.currentTime = new Date();

    this.temperatureData.day = this.currentTime.toLocaleDateString('en-US', { weekday: 'long' });
    this.temperatureData.time = `${String(this.currentTime.getHours()).padStart(2, '0')}:${String(this.currentTime.getMinutes()).padStart(2, '0')}`;
    this.temperatureData.temperature = current.temperature;
    this.temperatureData.location = this.cityName;
    this.temperatureData.rainPercent = this.weatherDetails.daily?.precipitation_sum?.[0] ?? 0;
    this.temperatureData.summaryPhrase = this.getWeatherDescription(current.weathercode);
    this.temperatureData.summaryImage = this.getSummaryImage(current.weathercode);
  }

  fillWeekData() {
  if (
    !this.weatherDetails?.daily ||
    !this.weatherDetails.daily.time ||
    !this.weatherDetails.daily.temperature_2m_max ||
    !this.weatherDetails.daily.temperature_2m_min ||
    !this.weatherDetails.daily.weathercode
  ) {
    console.warn('Missing daily data in weatherDetails:', this.weatherDetails?.daily);
    return;
  }

  this.weekData = [];

  for (let i = 0; i < 7; i++) {
    // guard against missing indices
    if (
      !this.weatherDetails.daily.time[i] ||
      this.weatherDetails.daily.temperature_2m_max[i] === undefined ||
      this.weatherDetails.daily.temperature_2m_min[i] === undefined ||
      this.weatherDetails.daily.weathercode[i] === undefined
    ) {
      console.warn(`Missing daily entry at index ${i}`);
      continue;
    }

    const dayData = new WeekData();
    const date = new Date(this.weatherDetails.daily.time[i]);
    dayData.day = date.toLocaleDateString(this.language, { weekday: 'short' });
    dayData.tempMax = this.weatherDetails.daily.temperature_2m_max[i];
    dayData.tempMin = this.weatherDetails.daily.temperature_2m_min[i];

    const code = this.weatherDetails.daily.weathercode[i];
    console.log(`Day ${i}: Weather code = ${code}`);

    dayData.summaryImage = this.getSummaryImage(code, i);

    this.weekData.push(dayData);
  }
}



  fillTodayData() {
    if (!this.weatherDetails?.hourly) return;

    this.todayData = [];
    const now = new Date();
    const currentHour = now.getHours();

    for (let i = currentHour; i < currentHour + 7; i++) {
      if (i >= this.weatherDetails.hourly.time.length) break;

      const hourData = new TodayData();
      hourData.time = this.weatherDetails.hourly.time[i].substring(11, 16);
      hourData.temperature = this.weatherDetails.hourly.temperature_2m[i];
      hourData.summaryImage = this.getSummaryImage(this.weatherDetails.hourly.weathercode[i]);

      this.todayData.push(hourData);
    }
  }

  private fillTodaysHighlight() {
    if (!this.weatherDetails?.daily || !this.weatherDetails.current_weather) return;

    const daily = this.weatherDetails.daily;
    const current = this.weatherDetails.current_weather;

    this.todaysHighlight.sunrise = daily.sunrise?.[0]?.substring(11, 16) ?? 'N/A';
    this.todaysHighlight.sunset = daily.sunset?.[0]?.substring(11, 16) ?? 'N/A';
    this.todaysHighlight.windStatus = daily.windgusts_10m_max?.[0] ?? current.windspeed;
   this.todaysHighlight.humidity = this.weatherDetails.hourly?.relative_humidity_2m?.[0] ?? 0;
    this.todaysHighlight.uvIndex = daily.uv_index_max?.[0] ?? 0;
   this.todaysHighlight.visibility = Number(((this.weatherDetails?.hourly?.visibility?.[0] ?? 0) / 1000).toFixed(1));
   this.todaysHighlight.cloudCover = this.weatherDetails?.hourly?.cloudcover?.[0];



  }

  prepareData(): void {
    this.fillTemperatureDataModel();
    this.fillWeekData();
    this.fillTodayData();
    this.fillTodaysHighlight();

    console.log('Weather Data:', {
      weatherDetails: this.weatherDetails,
      temperatureData: this.temperatureData,
      weekData: this.weekData,
      todayData: this.todayData,
      todaysHighlight: this.todaysHighlight
    });
  }

  celsiusToFahrenheit(celsius: number): number {
    return +(celsius * 1.8 + 32).toFixed(2);
  }

  fahrenheitToCelsius(fahrenheit: number): number {
    return +((fahrenheit - 32) * 0.555).toFixed(2);
  }

  getLocationDetails(cityName: string): Observable<{ results: LocationDetails[] }> {
    return this.httpClient.get<{ results: LocationDetails[] }>(
      `${EnvironmentalVariables.geocodingApiBaseURL}search`,
      {
        params: new HttpParams()
          .set('name', cityName)
          .set('count', '1')
          .set('language', this.language)
          .set('format', 'json')
      }
    );
  }

  getWeatherReport(latitude: number, longitude: number): Observable<WeatherDetails> {
    const params = new HttpParams()
      .set('latitude', latitude.toString())
      .set('longitude', longitude.toString())
      .set('timezone', 'auto')
      .set('current_weather', 'true')
      .set('hourly', 'temperature_2m,weathercode,visibility,apparent_temperature,cloudcover,relative_humidity_2m')
      .set('temperature_unit', this.temperatureUnit)
      .set('daily', 'temperature_2m_max,temperature_2m_min,precipitation_sum,sunshine_duration,windspeed_10m_max,windgusts_10m_max,sunrise,sunset,uv_index_max,weathercode')

    return this.httpClient.get<WeatherDetails>(
      `${EnvironmentalVariables.weatherApiBaseURL}forecast`,
      { params }
    );
  }

  getData() {
    this.loading = true;
    this.todayData = [];
    this.weekData = [];
    this.temperatureData = new TemperatureData();
    this.todaysHighlight = new TodaysHighlight();

    this.getLocationDetails(this.cityName).subscribe({
      next: (response) => {
        if (response.results && response.results.length > 0) {
          this.locationDetails = response.results[0];
          this.getWeatherReport(
            this.locationDetails.latitude,
            this.locationDetails.longitude
          ).subscribe({
            next: (weatherResponse) => {
              this.weatherDetails = weatherResponse;
              console.log('API weatherDetails:', this.weatherDetails); 
              this.prepareData();
              this.loading = false;
            },
            error: (weatherError) => {
              console.error('Error fetching weather data:', weatherError);
            }
          });
        }
      },
      error: (locationError) => {
        console.error('Error fetching location:', locationError);
      }
    });
  }
}
