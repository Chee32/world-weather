import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Storage } from '@ionic/storage';
import { Observable } from 'rxjs/Observable';
import { forkJoin } from 'rxjs/observable/forkJoin';
import { timeoutWith } from 'rxjs/operators';
import 'rxjs/add/observable/throw';
 
interface Weather {
    city: string,
    country: string,
    forcast?: string[]
}



@Injectable()
export class WeatherProvider {
 
    public weathers: Weather[] = [];
    public forcastList: string[] = [];
    public forcastLocation: Weather;
    private key: string;
 
    constructor(private http: HttpClient, private storage: Storage) {
 		this.key = 'a0fdaaa186f1d9f3b586e580b50612fb';
    }
 
    addWeather(weather: Weather): void {
 
        this.weathers.push(weather);
        this.fetchWeather();
        this.saveWeather();
 
    }
 
    removeWeather(weather): void {
 
        this.weathers.splice(this.weathers.indexOf(weather), 1);
        this.fetchWeather();
        this.saveWeather();
 
    }
 
    saveWeather(): void {
        this.storage.set('addedWeathers', this.weathers);
    }
 
    loadWeathers(): void {
 
        this.storage.get('addedWeathers').then(weathers => {
 
            if(weathers !== null){
                this.weathers = weathers;
                this.fetchWeather();
            }
        });
 
    }
 
    verifyWeather(weather): Observable<any> {
        return this.http.get('https://api.openweathermap.org/data/2.5/weather?q=' + weather.city + ',' + weather.country + '&APPID=' + this.key).pipe(
            timeoutWith(5000, Observable.throw(new Error('Failed to verify City.')))
        );
    }
 
    fetchWeather(refresher?): void {
 
        let requests = [];
 
        for(let weather of this.weathers){
 
            let request = this.http.get('https://api.openweathermap.org/data/2.5/weather?q=' + weather.city + ',' + weather.country + '&units=imperial&APPID=' + this.key);
 
            requests.push(request);
 
        }
 
        forkJoin(requests).pipe(
            timeoutWith(5000, Observable.throw(new Error('Failed to find City or County.')))
        ).subscribe(results => {

            results.forEach((result: any, index) => {
 
                this.weathers[index].forcast = result.main;

            });
 
            if(typeof(refresher) !== 'undefined'){
                refresher.complete();
            }
 
            this.saveWeather();
 
        }, err => {
 
            if(typeof(refresher) !== 'undefined'){
                refresher.complete();
            }
 
        });
 
    }

    setForcast(forcast: Weather): void {

    	this.forcastLocation = forcast;
    	this.fetchForcast();
    	this.saveForcast();
    }

    saveForcast(): void {
        this.storage.set('forcastLocation', this.forcastLocation);
        this.storage.set('forcastList', this.forcastList);
    }

    loadForcast(): void {

    	this.storage.get('forcastLocation').then(forcast => {
            if(forcast !== null){
                this.forcastLocation = forcast;
            }
        });

        this.storage.get('forcastList').then(list => {
        	if(list !== null){
        		this.forcastList = list;
        		this.fetchForcast();
        	}
        })

    }

    fetchForcast(refresher?): void {
 
        let request = 'https://api.openweathermap.org/data/2.5/forecast?q=' + this.forcastLocation.city + ',' + this.forcastLocation.country + '&units=imperial&APPID=' + this.key;
  
        this.http.get(request).pipe(
            timeoutWith(5000, Observable.throw(new Error('Failed to find City or County.')))
        ).subscribe(result => {

            this.forcastList = result.list;
 
 
            if(typeof(refresher) !== 'undefined'){
                refresher.complete();
            }
 
            this.saveForcast();
 
        }, err => {
 
            if(typeof(refresher) !== 'undefined'){
                refresher.complete();
            }
 
        });
 
    }
 
}