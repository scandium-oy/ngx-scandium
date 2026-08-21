
import { Component, ChangeDetectionStrategy } from '@angular/core';
import { IonSpinner } from "@ionic/angular/standalone";

@Component({
  standalone: true,
  selector: 'app-loading',
  templateUrl: 'loading.component.html',
  styleUrls: ['./loading.component.scss'],
  changeDetection: ChangeDetectionStrategy.Eager,
  imports: [IonSpinner],
})
export class LoadingComponent { }
