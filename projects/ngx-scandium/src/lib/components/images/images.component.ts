import { Component, EventEmitter, Input, OnChanges, Output, SimpleChanges } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { memo } from '../../utility';
import { ImageDialogComponent } from '../image-dialog/image.dialog';


@Component({
  selector: 'app-images',
  templateUrl: 'images.component.html',
  styleUrls: ['./images.component.scss'],
})
export class ImagesComponent implements OnChanges {

  @Input()
  showCamera: string = '';

  @Input()
  images: string[] = [];

  @Input()
  showDetails: boolean = false;

  @Input()
  canDelete: boolean = false;

  @Output()
  onDelete = new EventEmitter<string>();

  @Output()
  onCamera = new EventEmitter<string>();

  mainImage: string = '';

  getDetails = memo((image: string) => this._getDetails(image));

  constructor(
    private modalCtrl: ModalController,
  ) { }

  private _getDetails(image: string): string {
    const path = image.split('?')[0];
    const part = path.split('/')[path.split('/').length - 1];
    const [_, year, month, date] = part.split('-');
    const day = date.split('T')[0];
    return `${day}.${month}.${year}`;
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['images']) {
      const images = changes['images'].currentValue;
      if (images?.length > 0) {
        this.mainImage = images[0];
      }
    }
  }

  onImageUrl(imageUrl: string) {
    this.onCamera.emit(imageUrl);
  }

  toMain(image: string) {
    this.mainImage = image;
  }

  openImage(image: string) {
    this.modalCtrl.create({
      component: ImageDialogComponent,
      componentProps: { image, images: this.images },
      cssClass: 'modal-fullscreen',
    }).then((modal) => {
      modal.present();
    })
  }

  delete(image: string) {
    this.onDelete.emit(image);
  }
}
