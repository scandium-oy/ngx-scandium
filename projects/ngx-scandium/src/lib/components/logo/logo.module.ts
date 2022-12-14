import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { IonicModule } from '@ionic/angular';
import { LogoComponent } from './logo.component';

@NgModule({
  declarations: [LogoComponent],
  imports: [
    CommonModule,
    IonicModule,
  ],
  exports: [LogoComponent],
})
export class LogoModule { }
