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
      (req) =>
        req.method === 'GET' &&
        req.url === 'https://geocoding-api.open-meteo.com/v1/search'
    );
    expect(locationRequest).toBeTruthy();

    locationRequest.flush({
      results: [
        {
          name: 'Beirut',
          latitude: 33.8938,
          longitude: 35.5018,
        },
      ],
    });

    const weatherRequest = httpMock.expectOne(
      (req) => req.method === 'GET' && req.url?.includes('forecast')
    );

    expect(weatherRequest).toBeTruthy();

    weatherRequest.flush({
      current_weather: {
        temperature: 30,
        weathercode: 2,
        windspeed: 7,
      },
      daily: {
        time: [
          '2025-06-06',
          '2025-06-07',
          '2025-06-08',
          '2025-06-09',
          '2025-06-10',
          '2025-06-11',
          '2025-06-12',
        ],
        temperature_2m_max: [30, 31, 29, 28, 32, 33, 30],
        temperature_2m_min: [20, 21, 19, 18, 22, 23, 20],
        weathercode: [2, 3, 61, 0, 45, 85, 95],
        precipitation_sum: [0, 0, 5, 0, 2, 0, 10],
        sunshine_duration: [27000, 25000, 18000, 30000, 15000, 10000, 28000],
        windspeed_10m_max: [15, 20, 25, 10, 18, 22, 12],
        windgusts_10m_max: [25, 30, 35, 20, 28, 32, 22],
        sunrise: [
          '2025-06-06T05:00',
          '2025-06-07T05:01',
          '2025-06-08T05:02',
          '2025-06-09T05:03',
          '2025-06-10T05:04',
          '2025-06-11T05:05',
          '2025-06-12T05:06',
        ],
        sunset: [
          '2025-06-06T18:30',
          '2025-06-07T18:31',
          '2025-06-08T18:32',
          '2025-06-09T18:33',
          '2025-06-10T18:34',
          '2025-06-11T18:35',
          '2025-06-12T18:36',
        ],
        uv_index_max: [5, 6, 7, 4, 6, 5, 7],
      },
      hourly: {
        time: [
          '2025-06-06T10:00',
          '2025-06-06T11:00',
          '2025-06-06T12:00',
          '2025-06-06T13:00',
          '2025-06-06T14:00',
          '2025-06-06T15:00',
          '2025-06-06T16:00',
        ],
        temperature_2m: [30, 31, 32, 33, 34, 35, 36],
        weathercode: [0, 1, 2, 3, 61, 2, 95],
        cloudcover: [20, 30, 40, 50, 60, 70, 80],
        visibility: [10000, 9000, 8000, 10000, 9500, 8500, 9000],
        relative_humidity_2m: [60, 65, 70, 55, 50, 45, 40],
      },
    });
  });
});
