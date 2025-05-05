import { CommonModule } from '@angular/common';
import { Component, input, output } from '@angular/core';
import { StorageReference } from '@angular/fire/storage';
import { Dialog } from '@capacitor/dialog';
import { IonButton, IonIcon, IonItem, IonNote } from "@ionic/angular/standalone";
import { TranslateModule, TranslateService } from '@ngx-translate/core';
import { FileUpload } from '../../models';
import { LoadingService } from '../../services/loading.service';
import { UploadService } from '../../services/upload.service';

@Component({
  selector: 'app-take-video',
  templateUrl: './take-video.component.html',
  styleUrls: ['./take-video.component.scss'],
  imports: [IonItem,
    IonIcon,
    IonButton,
    IonNote,
    CommonModule,
    TranslateModule,
  ],
})
export class TakeVideoComponent {

  color = input('medium');
  disabled = input(false);
  name = input('');
  title = input('item.selectVideo');
  description = input('');
  fill = input('outline');
  expand = input('block');
  shape = input('');
  multiline = input(false);
  hideText = input(false);
  returnRef = input(false);
  item = input(false);
  icon = input('videocam');

  imageUrl = output<string>();
  reference = output<StorageReference>();

  constructor(
    private loadingService: LoadingService,
    private translate: TranslateService,
    private uploadService: UploadService,
  ) { }

  selectFiles(event: Event) {
    this.loadingService.showLoading();
    const inputElem = event.target as HTMLInputElement;
    const file = inputElem?.files?.[0];
    if (file == null) {
      return;
    }
    const guid = this.name() + '-' + new Date().toISOString();
    const fileupload = new FileUpload(guid, file);
    fileupload.guid = guid;
    if (this.returnRef()) {
      this.uploadService.uploadFile(fileupload).then((ref) => {
        this.reference.emit(ref);
      }).catch((e) => {
        this.loadingService.hideLoading();
        console.error(e);
        Dialog.alert({ message: this.translate.instant('general.tryAgain') });
      });
    } else {
      this.uploadService.uploadImage(fileupload).then((downloadUrl) => {
        this.loadingService.hideLoading();
        this.imageUrl.emit(downloadUrl);
      }).catch((e) => {
        this.loadingService.hideLoading();
        console.error(e);
        Dialog.alert({ message: this.translate.instant('general.tryAgain') });
      });
    }
  }
}
