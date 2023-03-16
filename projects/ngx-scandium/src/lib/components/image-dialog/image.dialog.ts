import { Component, ViewChild } from '@angular/core';
import { IonicSlides, ModalController, NavParams } from '@ionic/angular';
import SwiperCore, { Pagination, SwiperOptions, Zoom } from 'swiper';
import { SwiperComponent } from 'swiper/angular';

// install Swiper modules
SwiperCore.use([Pagination, Zoom, IonicSlides]);

@Component({
  selector: 'app-image-dialog',
  templateUrl: 'image.dialog.html',
  styleUrls: ['image.dialog.scss'],
})
export class ImageDialogComponent {
  @ViewChild('swiper')
  swiper: SwiperComponent | undefined;

  imageUrls: string[];

  config: SwiperOptions = {
    pagination: true,
    zoom: true,
  };

  constructor(
    private modal: ModalController,
    navParams: NavParams,
  ) {
    const currentImg = navParams.get('image');
    this.imageUrls = [currentImg];
    const images: string[] = navParams.get('images');
    if (images) {
      this.imageUrls.push(...images.filter((it) => it !== currentImg));
    }
  }

  dismiss() {
    this.modal.dismiss();
  }
}
