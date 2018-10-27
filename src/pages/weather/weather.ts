import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { WeatherProvider } from '../../providers/weather/weather';

/**
 * Generated class for the WeatherPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-weather',
  templateUrl: 'weather.html',
})
export class WeatherPage {
	dataWeather: string[];
	pageWeather: string[];

  constructor(public navCtrl: NavController, public navParams: NavParams, private weatherProvider: WeatherProvider) {
  	this.dataWeather = navParams.get('data');
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad WeatherPage');
    this.pageWeather = this.weatherProvider.loadWeather(this.pageWeather);
  }



}
