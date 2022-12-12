import { Component } from '@angular/core';
import { ModalController, NavParams } from '@ionic/angular';

@Component({
  selector: 'app-image-dialog',
  templateUrl: 'image.dialog.html',
  styleUrls: ['image.dialog.scss'],
})
export class ImageDialogComponent {

  imageUrls: string[];

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
