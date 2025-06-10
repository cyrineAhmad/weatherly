import { Component } from '@angular/core';
import { LeftContainer } from '../../components/left-container/left-container';
import { RightContainer } from '../../components/right-container/right-container';
import { Header} from '../../components/header/header';
import { Footer } from '../../components/footer/footer';
import { Weather } from '../../Services/weather';
import { CommonModule } from '@angular/common';
import { LoadingSpinner } from '../../components/loading-spinner/loading-spinner'; 
@Component({
  standalone: true,
  selector: 'app-weather-page',
  imports: [CommonModule, LeftContainer, RightContainer, Header,Footer,LoadingSpinner],
  templateUrl: './weather-page.html',
  styleUrl: './weather-page.css',
})
export class WeatherLayout {
   constructor(public weatherService: Weather) {}
}
