import { TestBed } from '@angular/core/testing';
import {
  HttpClientTestingModule,
  HttpTestingController,
} from '@angular/common/http/testing';
import { Weather } from './weather';
 
describe('Weather Service', () => {
  let service: Weather;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [Weather],
    });
    service = TestBed.inject(Weather);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify();
  });

  it('should be created and make expected HTTP calls', () => {
    expect(service).toBeTruthy();

    const locationRequest = httpMock.expectOne(
      (req) => req.method === 'GET' && req.url.includes('locations/search')
    );

    expect(locationRequest).toBeTruthy();

    // Respond with mock location data
    locationRequest.flush({
      location: {
        latitude: [33.8938],
        longitude: [35.5018],
        city: ['Beirut'],
      },
    });

    const weatherRequest = httpMock.expectOne(
      (req) => req.method === 'GET' && req.url.includes('forecast')
    );

    expect(weatherRequest).toBeTruthy();

    weatherRequest.flush({
      'v3-wx-observations-current': {
        dayOfWeek: 'Friday',
        temperature: 30,
        precip24Hour: 10,
        wxPhraseShort: 'Partly Cloudy',
        relativeHumidity: 60,
        sunriseTimeLocal: '2025-06-06T05:00:00',
        sunsetTimeLocal: '2025-06-06T18:30:00',
        uvIndex: 5,
        visibility: 10,
        windSpeed: 7,
      },
      'v3-wx-forecast-daily-15day': {
        dayOfWeek: [
          'Friday',
          'Saturday',
          'Sunday',
          'Monday',
          'Tuesday',
          'Wednesday',
          'Thursday',
        ],
        calendarDayTemperatureMax: [30, 31, 29, 28, 32, 33, 30],
        calendarDayTemperatureMin: [20, 21, 19, 18, 22, 23, 20],
        narrative: [
          'Sunny',
          'Cloudy',
          'Rainy',
          'Sunny',
          'Partly Cloudy',
          'Rainy',
          'Sunny',
        ],
      },
      'v3-wx-forecast-hourly-10day': {
        validTimeLocal: [
          '2025-06-06T10:00:00',
          '2025-06-06T11:00:00',
          '2025-06-06T12:00:00',
          '2025-06-06T13:00:00',
          '2025-06-06T14:00:00',
          '2025-06-06T15:00:00',
          '2025-06-06T16:00:00',
        ],
        temperature: [30, 31, 32, 33, 34, 35, 36],
        wxPhraseShort: [
          'Sunny',
          'Sunny',
          'Partly Cloudy',
          'Cloudy',
          'Rain',
          'Sunny',
          'Windy',
        ],
      },
      'v3-wx-globalAirQuality': {
        globalairquality: {
          airQualityCategoryIndex: 3,
        },
      },
    });
  });
});
