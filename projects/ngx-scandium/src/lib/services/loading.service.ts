import { inject, Injectable } from '@angular/core';
import { LoadingController } from '@ionic/angular';
import { TranslateService } from '@ngx-translate/core';

@Injectable({
  providedIn: 'root',
})
export class LoadingService {
  private loadingCtrl = inject(LoadingController);
  private translate = inject(TranslateService);

  private loading: HTMLIonLoadingElement | null = null;

  showLoading(duration?: number, msg = 'general.pleaseWait', cssClass?: string[]) {
    if (this.loading == null) {
      this.loadingCtrl.create({
        spinner: 'circles',
        duration,
        message: this.translate.instant(msg),
        keyboardClose: false,
        cssClass,
      }).then((loading) => {
        this.loading = loading;
        this.loading.present();
        console.log('Showing loading');
      });
    }
  }

  hideLoading() {
    this.loading?.dismiss().then(() => {
      console.log('Hiding loading');
      this.loading = null;
    });
  }
}
