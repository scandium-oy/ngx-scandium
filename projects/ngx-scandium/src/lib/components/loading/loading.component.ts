import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { IonicModule } from '@ionic/angular';

@Component({
  selector: 'app-loading',
  templateUrl: 'loading.component.html',
  styleUrls: ['./loading.component.scss'],
  imports: [
    CommonModule,
    IonicModule,
  ],
})
export class LoadingComponent { }
