import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { ForcastPage } from './forcast';

@NgModule({
  declarations: [
    ForcastPage,
  ],
  imports: [
    IonicPageModule.forChild(ForcastPage),
  ],
})
export class ForcastPageModule {}
