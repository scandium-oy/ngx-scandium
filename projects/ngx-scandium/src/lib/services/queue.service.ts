import { Injectable, signal } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { fromEvent, merge, of } from 'rxjs';
import { map, shareReplay, tap } from 'rxjs/operators';
import { FileUpload } from '../models';
import { UploadService } from './upload.service';

export interface QueueItem<T> {
  type: QueueTypes;
  item: T;
  cb?: (imageUrl: string) => void;
}

export enum QueueTypes {
  image = 'image',
};

@Injectable({
  providedIn: 'root',
})
export class QueueService {

  isOnline = signal(true);

  online$ = merge(
    of(null),
    fromEvent(window, 'online'),
    fromEvent(window, 'offline')
  ).pipe(
    map(() => navigator.onLine),
    tap((val) => this.isOnline.set(val)),
    shareReplay(1),
  );

  private queue: QueueItem<any>[] = [];

  constructor(
    private uploadService: UploadService,
  ) {
    this.online$.pipe(
      takeUntilDestroyed(),
    ).subscribe(async () => {
      while (this.queue.length > 0) {
        const queueItem = this.queue.pop();
        switch (queueItem?.type) {
          case QueueTypes.image:
            const imageUrl = await this.uploadImage(queueItem.item);
            if (queueItem.cb) {
              queueItem.cb(imageUrl);
            }
            break;
          default:
            console.warn('Unknown type', queueItem?.type);
            break;
        }
      }
    });
  }

  private uploadImage(fileupload: FileUpload) {
    console.info('Uploading queued item', fileupload.guid);
    return this.uploadService.uploadImage(fileupload).then((downloadUrl) => {
      return downloadUrl;
    });
  }

  addToQueue<T>(value: QueueItem<T>, cb: (imageUrl: string) => void) {
    value.cb = cb;
    this.queue.push(value);
    console.info('Queued', value.item);
    return value;
  }
}
