
import { Component, Input, input, output } from '@angular/core';
import { IonButton, IonIcon } from '@ionic/angular/standalone';
import { TranslateModule } from '@ngx-translate/core';
import { FileUpload } from '../../models';
import { CameraService } from '../../services/camera.service';
import { LoadingService } from '../../services/loading.service';
import { QueueItem, QueueService, QueueTypes } from '../../services/queue.service';
import { UploadService } from '../../services/upload.service';

@Component({
  standalone: true,
  selector: 'app-camera-button',
  styleUrls: ['camera-button.component.scss'],
  templateUrl: 'camera-button.component.html',
  imports: [
    TranslateModule,
    IonButton,
    IonIcon
  ],
})
export class CameraButtonComponent {

  color = input('primary');
  disabled = input(false);
  name = input('');
  title = input('item.addImage');
  fill = input('outline');
  expand = input('block');
  shape = input('');
  multiline = input(false);
  hideText = input(false);
  queue = input(false);

  @Input()
  cb?: (imageUrl: string) => void;

  imageUrl = output<string>();
  queueItem = output<QueueItem<FileUpload>>();

  constructor(
    private cameraService: CameraService,
    private loadingService: LoadingService,
    private queueService: QueueService,
    private uploadService: UploadService,
  ) { }

  private async saveImage(imageFile: File) {
    const guid = this.name() + '-' + new Date().toISOString();
    const fileupload = new FileUpload(guid, imageFile);
    if (!this.queue() && this.queueService.isOnline()) {
      this.loadingService.showLoading(5000);
      this.uploadService.uploadImage(fileupload).then((downloadUrl) => {
        this.loadingService.hideLoading();
        this.imageUrl.emit(downloadUrl);
      });
    } else {
      const item = {
        type: QueueTypes.image,
        item: fileupload,
      };
      if (this.cb) {
        const queueItem = this.queueService.addToQueue(item, this.cb);
        this.queueItem.emit(queueItem);
      }
    }
  }

  onCamera(): void {
    this.cameraService.openCamera(this.name()).then((file) => {
      if (file) {
        this.saveImage(file);
      }
    });
  }
}
