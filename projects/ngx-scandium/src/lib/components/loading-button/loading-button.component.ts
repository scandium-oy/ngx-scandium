import { Component, Input, signal } from '@angular/core';
import { IonIcon, IonSpinner } from '@ionic/angular/standalone';

@Component({
  selector: 'app-loading-button',
  template: `
  @if (isLoading()) {
    <ion-spinner></ion-spinner>
  } @else if (isLoaded()) {
    <ion-icon name="checkmark-outline"></ion-icon>
  } @else {
    <ng-content></ng-content>
  }
  `,
  imports: [
    IonSpinner,
    IonIcon,
  ],
})
export class LoadingButtonComponent {

  isLoading = signal(false);
  isLoaded = signal(false);

  @Input()
  set loading(val: boolean) {
    if (val) {
      this.isLoading.set(val);
    } else if (this.isLoading()) {
      setTimeout(() => this.isLoading.set(false), 500);
      this.isLoaded.set(true);
      setTimeout(() => this.isLoaded.set(false), 3000);
    }
  }
}
