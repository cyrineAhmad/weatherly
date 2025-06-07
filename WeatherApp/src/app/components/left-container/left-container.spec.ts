import { ComponentFixture, TestBed } from '@angular/core/testing';
import { LeftContainer } from './left-container';
import { Weather } from '../../Services/weather'; // import the service
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';

// Create a mock Weather service for the test
class MockWeatherService {
  cityName = '';
  summaryImage = '';
  celsius = true;
  temperatureData = {
    summaryImage: 'test.jpg',
    temperature: 25,
    day: 'Monday',
    time: '10:00 AM',
    summaryPhrase: 'Sunny',
    rainPercent: '10%',
    location: 'Beirut',
  };

  getData() {}

  celsiusToFahrenheit(temp: number) {
    return (temp * 9) / 5 + 32;
  }
}

describe('LeftContainer', () => {
  let component: LeftContainer;
  let fixture: ComponentFixture<LeftContainer>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [LeftContainer, FontAwesomeModule], // import FontAwesomeModule for the icons
      providers: [
        { provide: Weather, useClass: MockWeatherService }, // provide the mock service
      ],
    }).compileComponents();
 
    fixture = TestBed.createComponent(LeftContainer);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
