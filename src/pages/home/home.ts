import { Component } from '@angular/core';
import { NavController, IonicPage } from 'ionic-angular';
import { WeatherProvider } from '../../providers/weather/weather';
 
@IonicPage()
@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {
 
    constructor(private navCtrl: NavController, private weatherProvider: WeatherProvider) {

    }
 
    ionViewDidLoad(): void {
        this.weatherProvider.loadWeathers();
    }
 
    addWeather(): void {
        this.navCtrl.push('AddWeatherPage');
    }
 
    goToCryptonator(): void {
        window.open('https://openweathermap.org', '_system');
    }
 
    refreshWeathers(refresher): void {
        this.weatherProvider.fetchWeather(refresher);
    }
 
}
