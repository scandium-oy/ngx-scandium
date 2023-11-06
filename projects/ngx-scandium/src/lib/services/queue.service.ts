import { Injectable, WritableSignal, signal } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { fromEvent, merge, of } from 'rxjs';
import { map, shareReplay } from 'rxjs/operators';
import { FileUpload } from '../models';
import { UploadService } from './upload.service';

export interface IQueueItem<T> {
  type: string;
  item: T;
  returnValue?: WritableSignal<string>;
}

@Injectable({
  providedIn: 'root',
})
export class QueueService {

  online$ = merge(
    of(null),
    fromEvent(window, 'online'),
    fromEvent(window, 'offline')
  ).pipe(
    map(() => navigator.onLine),
    shareReplay(1),
  );

  private queue: IQueueItem<any>[] = [];

  constructor(
    private uploadService: UploadService,
  ) {
    this.online$.pipe(
      takeUntilDestroyed(),
    ).subscribe(async () => {
      while (this.queue.length > 0) {
        const queueItem = this.queue.pop();
        switch (queueItem?.type) {
          case 'image':
            const imageUrl = await this.uploadImage(queueItem.item);
            queueItem.returnValue?.set(imageUrl);
            break;
          default:
            console.warn('Unknown type', queueItem?.type);
            break;
        }
      }
    });
  }

  private uploadImage(fileupload: FileUpload) {
    return this.uploadService.uploadImage(fileupload).then((downloadUrl) => {
      return downloadUrl;
    });
  }

  addToQueue<T>(value: IQueueItem<T>) {
    value.returnValue = signal<string>('');
    this.queue.push(value);
    return value.returnValue;
  }
}
