import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { IonicModule } from '@ionic/angular';
import { SwiperModule } from 'swiper/angular';
import { ImageDialogComponent } from './image.dialog';

@NgModule({
  imports: [
    IonicModule,
    CommonModule,
    SwiperModule,
  ],
  declarations: [ImageDialogComponent],
})
export class ImageDialogModule { }
