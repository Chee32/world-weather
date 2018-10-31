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
    	console.log(this.weatherProvider);
    }
 
    ionViewDidLoad(): void {
        this.weatherProvider.loadWeathers();
        console.log(this.weatherProvider);
    }
 
    addWeather(): void {
        this.navCtrl.push('AddWeatherPage');
    }
 
    seeForcast(city,country,forcast): void {

    	let forcastInfo = {
            city: city,
            country: country,
            forcast: forcast
        };

    	this.weatherProvider.setForcast(forcastInfo);
    	this.navCtrl.push('ForcastPage');
    }

    refreshWeathers(refresher): void {
        this.weatherProvider.fetchWeather(refresher);
    }

    Test(): void {
    	console.log(this.weatherProvider.weathers);
    }
 
}
