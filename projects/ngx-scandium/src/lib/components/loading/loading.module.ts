import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { IonicModule } from '@ionic/angular';
import { LoadingComponent } from './loading.component';

@NgModule({
  declarations: [LoadingComponent],
  imports: [
    CommonModule,
    IonicModule,
  ],
  exports: [LoadingComponent],
})
export class LoadingModule { }
