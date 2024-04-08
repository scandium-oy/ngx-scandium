import { CommonModule, NgOptimizedImage } from '@angular/common';
import { NgModule } from '@angular/core';
import { IonicModule } from '@ionic/angular';
import { LogoComponent } from './logo.component';

@NgModule({
  declarations: [LogoComponent],
  imports: [
    CommonModule,
    IonicModule,
    NgOptimizedImage,
  ],
  exports: [LogoComponent],
})
export class LogoModule { }
