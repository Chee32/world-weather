import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { WeatherProvider } from '../../providers/weather/weather';

/**
 * Generated class for the ForcastPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage({
    defaultHistory: ['HomePage']
})
@Component({
  selector: 'page-forcast',
  templateUrl: 'forcast.html',
})
export class ForcastPage {

  constructor(public navCtrl: NavController, public navParams: NavParams, private weatherProvider: WeatherProvider) {
  	this.weatherProvider.loadForcast();
  	console.log(this.weatherProvider);
  }

  ionViewDidLoad() {  	

  }

  refreshForcast(refresher): void {
    this.weatherProvider.fetchForcast(refresher);
  }

}
