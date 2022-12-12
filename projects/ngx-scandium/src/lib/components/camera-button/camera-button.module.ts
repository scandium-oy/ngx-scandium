import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { IonicModule } from '@ionic/angular';
import { TranslateModule } from '@ngx-translate/core';
import { CameraButtonComponent } from './camera-button.component';

@NgModule({
  declarations: [CameraButtonComponent],
  imports: [
    CommonModule,
    IonicModule,
    TranslateModule.forChild(),
  ],
  exports: [CameraButtonComponent],
})
export class CameraButtonModule { }
