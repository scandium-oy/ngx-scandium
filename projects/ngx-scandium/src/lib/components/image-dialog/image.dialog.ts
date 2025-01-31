import { CommonModule } from '@angular/common';
import { Component, CUSTOM_ELEMENTS_SCHEMA, signal } from '@angular/core';
import { IonButton, IonCol, IonContent, IonFooter, IonIcon, IonicSlides, IonRow, ModalController, NavParams } from '@ionic/angular/standalone';

@Component({
  standalone: true,
  selector: 'app-image-dialog',
  templateUrl: 'image.dialog.html',
  styleUrls: ['image.dialog.scss'],
  imports: [
    CommonModule,
    IonContent,
    IonFooter,
    IonRow,
    IonCol,
    IonButton,
    IonIcon,
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class ImageDialogComponent {

  swiperModules = [IonicSlides];
  imageUrls: string[];
  videoS = signal<string | null>(null);

  constructor(
    private _modal: ModalController,
    navParams: NavParams,
  ) {
    const currentImg = navParams.get('image');
    const images: string[] = navParams.get('images');
    if (images) {
      this.imageUrls = [currentImg, ...images.filter((it) => it !== currentImg)];
    } else {
      this.imageUrls = [currentImg];
    }
    this.videoS.set(navParams.get('video'));
  }

  dismiss() {
    this._modal.dismiss();
  }
}
