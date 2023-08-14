import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { IonicModule } from '@ionic/angular';
import { CameraButtonModule } from '../camera-button/camera-button.module';
import { ImageDialogComponent } from '../image-dialog/image.dialog';
import { ImagesComponent } from './images.component';

@NgModule({
  declarations: [ImagesComponent],
  imports: [
    CommonModule,
    IonicModule,
    CameraButtonModule,
    ImageDialogComponent,
  ],
  exports: [ImagesComponent],
})
export class ImagesModule { }
