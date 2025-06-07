import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { Weather } from '../../Services/weather';
@Component({
  standalone: true,
  selector: 'app-right-container',
  imports: [CommonModule, FontAwesomeModule],
  templateUrl: './right-container.html',
  styleUrl: './right-container.css',
})
export class RightContainer {
  constructor(public weatherService: Weather) {}

  onTodayClick() {
    this.weatherService.today = true;
    this.weatherService.week = false;
  }

  onWeekClick() {
    this.weatherService.today = false;
    this.weatherService.week = true;
  }

  onCelsiusClick() {
    this.weatherService.celsius = true;
    this.weatherService.fahrenheit = false;
  }

  onFahrenheitClick() {
    this.weatherService.celsius = false;
    this.weatherService.fahrenheit = true;
  }
}
