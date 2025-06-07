import { Component } from '@angular/core';
import { LeftContainer } from '../left-container/left-container';
import { RightContainer } from '../right-container/right-container';

@Component({
  standalone: true,
  selector: 'app-weather-layout',
  imports: [LeftContainer, RightContainer],
  templateUrl: './weather-layout.html',
  styleUrl: './weather-layout.css',
})
export class WeatherLayout {}
