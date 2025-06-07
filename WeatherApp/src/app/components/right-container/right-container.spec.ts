import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RightContainer } from './right-container';
import { Weather } from '../../Services/weather';
import { CommonModule } from '@angular/common';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';

// Mock Weather service 
class MockWeatherService {
  today = false;
  week = false;
  celsius = false;
  fahrenheit = false;

  weekData = [
    { day: 'Mon', summaryImage: 'mock1.png', tempMin: 10, tempMax: 20 },
    { day: 'Tue', summaryImage: 'mock2.png', tempMin: 11, tempMax: 21 },
  ];

  todayData = [
    { time: '9 AM', summaryImage: 'mock-today1.png', temperature: 15 },
    { time: '12 PM', summaryImage: 'mock-today2.png', temperature: 18 },
  ];

  todaysHighlight = {
    uvIndex: 5,
    windStatus: 10,
    sunrise: '6:00',
    sunset: '7:00',
    humidity: 45,
    visibility: 10,
    airQuality: 80,
  };

  celsiusToFahrenheit(temp: number): number {
    return (temp * 9) / 5 + 32;
  }
}

describe('RightContainer', () => {
  let component: RightContainer;
  let fixture: ComponentFixture<RightContainer>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RightContainer, CommonModule, FontAwesomeModule],
      providers: [{ provide: Weather, useClass: MockWeatherService }],
    }).compileComponents();

    fixture = TestBed.createComponent(RightContainer);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
