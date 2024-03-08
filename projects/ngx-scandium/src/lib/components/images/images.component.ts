import { Component, EventEmitter, Input, OnChanges, Output, SimpleChanges, signal } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { FileUpload } from '../../models';
import { QueueItem } from '../../services/queue.service';
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
  showVideo: boolean = false;

  @Input()
  images: string[] = [];

  @Input()
  videos: string[] = [];

  @Input()
  showDetails: boolean = false;

  @Input()
  canDelete: boolean = false;

  @Input()
  thumbs: {
    img: string;
    thumb: string;
  }[] = [];

  @Output()
  onDelete = new EventEmitter<string>();

  @Output()
  onCamera = new EventEmitter<string>();

  @Output()
  onQueue = new EventEmitter<QueueItem<FileUpload>>();

  mainImage = signal<{ full: string; url: string; type: 'image' | 'video' } | null>(null);

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
        this.toMain(images[0], 'image');
      }
    }
    if (changes['thumbs']) {
      const images = changes['thumbs'].currentValue;
      if (images?.length > 0) {
        this.toMain(images[0].thumb, 'image', images[0].img);
      }
    }
    if (changes['videos']) {
      const videos = changes['videos'].currentValue;
      if (videos?.length > 0) {
        this.toMain(videos[0], 'video');
      }
    }
  }

  onImageUrl(imageUrl: string) {
    this.onCamera.emit(imageUrl);
  }

  onQueueItem(item: QueueItem<FileUpload>) {
    item.cb = (imgUrl) => console.log('2', imgUrl);
    this.onQueue.emit(item);
  }

  toMain(url: string, type: 'image' | 'video', full?: string) {
    if (type === 'video') {
      this.mainImage.set(null);
    }
    setTimeout(() => {
      if (full == null) {
        full = url;
      }
      this.mainImage.set({ full, url, type });
    });
  }

  openImage(image: string) {
    this.modalCtrl.create({
      component: ImageDialogComponent,
      componentProps: { image, images: this.images },
      cssClass: ['modal-fullscreen', 'transparent-modal'],
    }).then((modal) => {
      modal.present();
    });
  }

  delete(image: string) {
    this.onDelete.emit(image);
  }
}
