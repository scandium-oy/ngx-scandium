import { Injectable } from '@angular/core';
import { LoadingController } from '@ionic/angular';

@Injectable({
  providedIn: 'root',
})
export class LoadingService {

  constructor(private loadingCtrl: LoadingController) { }

  public showLoading(duration?: number) {
    this.loadingCtrl.create({
      spinner: 'circles',
      duration,
    }).then((loading) => {
      loading.present();
    });
  }

  public hideLoading() {
    try {
      this.loadingCtrl.dismiss();
    } catch (e) { }
  }
}
