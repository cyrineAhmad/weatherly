import { ComponentFixture, TestBed } from '@angular/core/testing';
import { WeatherLayout } from './weather-page';
import { LeftContainer } from '../../components/left-container/left-container';
import { RightContainer } from '../../components/right-container/right-container';
import { LoadingSpinner } from '../../components/loading-spinner/loading-spinner'; 
import { Header} from '../../components/header/header';
import { Footer } from '../../components/footer/footer';
import { Router } from '@angular/router';
import { HttpClientTestingModule } from '@angular/common/http/testing';

 
describe('WeatherLayout', () => {
  let component: WeatherLayout;
  let fixture: ComponentFixture<WeatherLayout>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        HttpClientTestingModule,
        WeatherLayout,
        LeftContainer,
        RightContainer,
        LoadingSpinner,
        Header,
        Footer
      ],
      providers: [{ provide: Router, useValue: {} }],
    }).compileComponents();

    fixture = TestBed.createComponent(WeatherLayout);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
  console.log('Component created:', component);
  expect(component).toBeTruthy();
});

});
