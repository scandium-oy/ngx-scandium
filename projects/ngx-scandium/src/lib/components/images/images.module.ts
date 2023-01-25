import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { IonicModule } from '@ionic/angular';
import { CameraButtonModule } from '../camera-button/camera-button.module';
import { ImageDialogModule } from '../image-dialog/image-dialog.module';
import { ImagesComponent } from './images.component';

@NgModule({
  declarations: [ImagesComponent],
  imports: [
    CommonModule,
    IonicModule,
    ImageDialogModule,
    CameraButtonModule,
  ],
  exports: [ImagesComponent],
})
export class ImagesModule { }
