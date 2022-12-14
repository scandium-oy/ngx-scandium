import { Injectable } from '@angular/core';
import { SwUpdate } from '@angular/service-worker';
import { Dialog } from '@capacitor/dialog';
import { TranslateService } from '@ngx-translate/core';
import { Observable } from 'rxjs';
import { filter, map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AppUpdateService {
  constructor(
    private readonly updates: SwUpdate,
    private translate: TranslateService,
  ) { }

  private showAppUpdateAlert() {
    const title = this.translate.instant('update.title');
    const message = this.translate.instant('update.message');

    Dialog.confirm({ title, message }).then((dialog) => {
      if (dialog.value) {
        this.doAppUpdate();
      }
    });
  }

  private doAppUpdate() {
    this.updates.activateUpdate().then(() => document.location.reload());
  }

  getVersionUpdates(): Observable<void> {
    return this.updates.versionUpdates.pipe(
      filter((event) => event.type === 'VERSION_READY'),
      map(() => this.showAppUpdateAlert()),
    );
  }
}
