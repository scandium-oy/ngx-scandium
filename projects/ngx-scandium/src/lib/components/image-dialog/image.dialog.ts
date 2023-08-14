import { CommonModule } from '@angular/common';
import { CUSTOM_ELEMENTS_SCHEMA, Component } from '@angular/core';
import { IonicModule, IonicSlides, ModalController, NavParams } from '@ionic/angular';
import { Zoom } from 'swiper/modules';

@Component({
  standalone: true,
  selector: 'app-image-dialog',
  templateUrl: 'image.dialog.html',
  styleUrls: ['image.dialog.scss'],
  imports: [
    IonicModule,
    CommonModule,
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class ImageDialogComponent {

  swiperModules = [Zoom, IonicSlides];
  imageUrls: string[];

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
  }

  dismiss() {
    this._modal.dismiss();
  }
}
