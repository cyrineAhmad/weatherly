import { Component } from '@angular/core';
import { faMagnifyingGlass } from '@fortawesome/free-solid-svg-icons';
import { faCloud } from '@fortawesome/free-solid-svg-icons';
import { faCloudRain } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { Weather } from '../../Services/weather';
@Component({ 
  standalone: true,
  selector: 'app-left-container',
  imports: [FontAwesomeModule],
  templateUrl: './left-container.html',
  styleUrl: './left-container.css',
})
export class LeftContainer {
  faMagnifyingGlass: any = faMagnifyingGlass;
  faCloud: any = faCloud;
  faCloudRain: any = faCloudRain;
  constructor(public weatherService: Weather) {}
  public onSearch(location: string) {
    this.weatherService.cityName = location;
    this.weatherService.getData();
  }
}
