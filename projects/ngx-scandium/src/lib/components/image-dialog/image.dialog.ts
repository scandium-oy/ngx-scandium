import { CommonModule } from '@angular/common';
import { CUSTOM_ELEMENTS_SCHEMA, Component, signal } from '@angular/core';
import { IonicModule, IonicSlides, ModalController, NavParams } from '@ionic/angular';

@Component({
    selector: 'app-image-dialog',
    templateUrl: 'image.dialog.html',
    styleUrls: ['image.dialog.scss'],
    imports: [
        IonicModule,
        CommonModule
    ],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
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
