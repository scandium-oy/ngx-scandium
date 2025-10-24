import { Injectable } from '@angular/core';
import { Camera, CameraResultType, GalleryPhoto, Photo } from '@capacitor/camera';
import { Filesystem } from '@capacitor/filesystem';
import { LoadingController, Platform } from '@ionic/angular/standalone';
import { TranslateService } from '@ngx-translate/core';
import { decode } from 'base64-arraybuffer';

@Injectable({
  providedIn: 'root',
})
export class CameraService {
  constructor(
    private loadingCtrl: LoadingController,
    private platform: Platform,
    private translate: TranslateService,
  ) { }

  private async saveImage(photo: Photo | GalleryPhoto, filename: string): Promise<File> {
    const blob = await this.readAsBlob(photo);

    const file = this.readAsFile(blob, filename);
    return file;
  }

  private async readAsBlob(photo: Photo | GalleryPhoto) {
    if (this.platform.is('hybrid')) {
      if (photo.path == null) {
        throw Error('Photo path is null,' + photo.path);
      }
      // Read the file into base64 format
      const file = await Filesystem.readFile({
        path: photo.path
      });

      if (typeof file.data === 'string') {
        const blob = new Blob([new Uint8Array(decode(file.data))], {
          type: `image/${photo.format}`,
        });
        return blob;
      } else {
        return file.data;
      }
    }
    else {
      if (photo.webPath == null) {
        throw Error('Photo webPath is null,' + photo.webPath);
      }
      // Fetch the photo, read as a blob, then convert to base64 format
      const response = await fetch(photo.webPath);
      return await response.blob();
    }
  }

  private readAsFile(blob: Blob, name: string) {
    const file = new File([blob],
      name, {
      lastModified: new Date().getTime(),
      type: blob.type,
    });
    return file;
  }

  async pickImages() {
    const images = await Camera.pickImages({});
    const loading = await this.loadingCtrl.create({
      message: this.translate.instant('general.wait'),
      spinner: 'crescent',
    });
    loading.present();
    const files = [];
    for (const image of images.photos) {
      const suffix =
        image.webPath?.substring(image.webPath.lastIndexOf('/') + 1) +
        '.' +
        image.format;
      const file = await this.saveImage(image, image.webPath + '_' + suffix);
      files.push(file);
    }
    loading.dismiss();
    return files;
  }

  async openCamera(filename: string): Promise<File | undefined> {
    try {
      const image = await Camera.getPhoto({
        quality: 90,
        allowEditing: false,
        resultType: CameraResultType.Uri,
      });
      const loading = await this.loadingCtrl.create({
        message: this.translate.instant('general.wait'),
        spinner: 'crescent',
      });
      loading.present();
      const suffix =
        image.webPath?.substring(image.webPath.lastIndexOf('/') + 1) +
        '.' +
        image.format;
      const file = await this.saveImage(image, filename + '_' + suffix);
      loading.dismiss();
      return file;
    } catch (e) {
      return undefined;
    }
  }
}
