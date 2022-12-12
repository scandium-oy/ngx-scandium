import { Component, Input } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { ImageDialogComponent } from '../image-dialog/image.dialog';

@Component({
  selector: 'app-images',
  templateUrl: 'images.component.html',
  styleUrls: ['./images.component.scss'],
})
export class ImagesComponent {
  @Input()
  images: string[] = [];

  constructor(
    private modalCtrl: ModalController,
  ) { }

  openImage(image: string) {
    this.modalCtrl.create({
      component: ImageDialogComponent,
      componentProps: { image, images: this.images },
      cssClass: 'modal-fullscreen',
    }).then((modal) => {
      modal.present();
    });
  }
}
