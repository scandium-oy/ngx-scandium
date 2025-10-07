import { inject, Injectable, signal } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { combineLatest, fromEvent, merge, of, ReplaySubject } from 'rxjs';
import { debounceTime, map, shareReplay, tap } from 'rxjs/operators';
import { FileUpload } from '../models';
import { UploadService } from './upload.service';

export interface QueueItem<T> {
  type: QueueTypes;
  item: T;
  cb?: (imageUrl: string) => void;
}

export enum QueueTypes {
  image = 'image',
  video = 'video',
};

@Injectable({
  providedIn: 'root',
})
export class QueueService {
  private uploadService = inject(UploadService);

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

  update$ = new ReplaySubject<void>(1);

  private queue: QueueItem<any>[] = [];
  queueLength = signal(this.queue.length);

  constructor() {
    combineLatest([this.online$, this.update$.asObservable()]).pipe(
      debounceTime(200),
      takeUntilDestroyed(),
    ).subscribe(async () => {
      while (this.queue.length > 0) {
        const queueItem = this.queue.pop();
        this.queueLength.set(this.queue.length);
        switch (queueItem?.type) {
          case QueueTypes.image:
            const imageUrl = await this.uploadImage(queueItem.item);
            if (queueItem.cb) {
              queueItem.cb(imageUrl);
            }
            break;
          case QueueTypes.video:
            const videoUrl = await this.uploadImage(queueItem.item);
            if (queueItem.cb) {
              queueItem.cb(videoUrl);
            }
            break;
          default:
            console.warn('Unknown type', queueItem?.type);
            break;
        }
      }
    });
  }

  private async uploadImage(fileupload: FileUpload) {
    console.info('Uploading queued item', fileupload.guid);
    const downloadUrl = await this.uploadService.uploadImage(fileupload);
    return downloadUrl;
  }

  getQueue() {
    return this.queue;
  }

  addToQueue<T>(value: QueueItem<T>, cb: (imageUrl: string) => void) {
    value.cb = cb;
    this.queue.push(value);
    this.queueLength.set(this.queue.length);
    console.info('Queued', value.item);
    this.update$.next();
    return value;
  }
}
