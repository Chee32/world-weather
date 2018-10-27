import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { AddWeatherPage } from './add-weather';

@NgModule({
  declarations: [
    AddWeatherPage,
  ],
  imports: [
    IonicPageModule.forChild(AddWeatherPage),
  ],
})
export class AddWeatherPageModule {}
