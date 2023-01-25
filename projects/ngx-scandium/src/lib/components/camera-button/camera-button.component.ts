import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FileUpload } from '../../models';
import { CameraService } from '../../services/camera.service';
import { LoadingService } from '../../services/loading.service';
import { UploadService } from '../../services/upload.service';

@Component({
  selector: 'app-camera-button',
  styleUrls: ['camera-button.component.scss'],
  templateUrl: 'camera-button.component.html',
})
export class CameraButtonComponent {

  @Input()
  color = 'primary';

  @Input()
  name: string = '';

  @Input()
  fill = 'outline';

  @Input()
  expand = 'block';

  @Input()
  shape: string = '';

  @Input()
  multiline = false;

  @Input()
  hideText = false;

  @Output()
  imageUrl: EventEmitter<string> = new EventEmitter();

  constructor(
    private cameraService: CameraService,
    private loadingService: LoadingService,
    private uploadService: UploadService,
  ) { }

  private async saveImage(imageFile: File) {
    this.loadingService.showLoading();
    const guid = this.name + '-' + new Date().toISOString();
    const fileupload = new FileUpload(guid, imageFile);
    this.uploadService.uploadImage(fileupload).then((downloadUrl) => {
      this.loadingService.hideLoading();
      this.imageUrl.emit(downloadUrl);
    });
  }

  onCamera(): void {
    this.cameraService.openCamera(this.name).then((file) => {
      this.saveImage(file);
    });
  }
}
