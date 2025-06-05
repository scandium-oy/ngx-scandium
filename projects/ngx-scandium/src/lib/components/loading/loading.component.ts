
import { Component } from '@angular/core';
import { IonSpinner } from "@ionic/angular/standalone";

@Component({
  standalone: true,
  selector: 'app-loading',
  templateUrl: 'loading.component.html',
  styleUrls: ['./loading.component.scss'],
  imports: [IonSpinner],
})
export class LoadingComponent { }
