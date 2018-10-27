import { Component } from '@angular/core';
import { IonicPage, NavController } from 'ionic-angular';
import { WeatherProvider } from '../../providers/weather/weather';
 
@IonicPage({
    defaultHistory: ['HomePage']
})
@Component({
    selector: 'page-add-weather',
    templateUrl: 'add-weather.html'
})
export class AddWeatherPage {
    private weatherUnavailable: boolean = false;
    private checkingValidity: boolean = false;
    private noConnection: boolean = false;
    private city: string;
    private country: string;
 
    constructor(private navCtrl: NavController, private weatherProvider: WeatherProvider) {
 
    }
 
    addWeather(): void {
        this.weatherUnavailable = false;
        this.noConnection = false;
        this.checkingValidity = true;
 
        let weather = {
            city: this.city,
            country: this.country,
        };
 
        this.weatherProvider.verifyWeather(weather).subscribe((result) => {
 
            this.checkingValidity = false;
 
            this.weatherProvider.addWeather(weather);
            this.navCtrl.pop();
 
        }, (err) => {   
 			if("city not found" == err.message) {
 				this.weatherUnavailable = true;
 			} else {
            	this.noConnection = true;
            }
            this.checkingValidity = false;
 
        });
 
    }
 
}
