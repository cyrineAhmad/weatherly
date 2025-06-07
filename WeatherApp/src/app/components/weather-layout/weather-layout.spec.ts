import { ComponentFixture, TestBed } from '@angular/core/testing';
import { WeatherLayout } from './weather-layout';
import { LeftContainer } from '../left-container/left-container';
import { RightContainer } from '../right-container/right-container';
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
      ],
      providers: [{ provide: Router, useValue: {} }],
    }).compileComponents();

    fixture = TestBed.createComponent(WeatherLayout);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
