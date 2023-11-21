import { Injectable } from '@angular/core';
import { LoadingController } from '@ionic/angular';
import { TranslateService } from '@ngx-translate/core';

@Injectable({
  providedIn: 'root',
})
export class LoadingService {

  private loading: HTMLIonLoadingElement | null = null;

  constructor(
    private loadingCtrl: LoadingController,
    private translate: TranslateService,
  ) { }

  public showLoading(duration?: number) {
    if (this.loading == null) {
      this.loadingCtrl.create({
        spinner: 'circles',
        duration,
        message: this.translate.instant('general.pleaseWait'),
        keyboardClose: false,
        translucent: true,
      }).then((loading) => {
        this.loading = loading;
        this.loading.present();
        console.log('Showing loading');
      });
    }
  }

  public hideLoading() {
    this.loading?.dismiss().then(() => {
      console.log('Hiding loading');
      this.loading = null;
    });
  }
}
