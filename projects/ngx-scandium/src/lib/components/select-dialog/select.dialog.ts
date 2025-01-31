import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { IonButton, IonButtons, IonContent, IonHeader, IonIcon, IonItem, IonSearchbar, IonTitle, IonToolbar, ModalController, NavParams } from '@ionic/angular/standalone';
import { TranslateModule } from '@ngx-translate/core';
import { BehaviorSubject, combineLatest, map, shareReplay } from 'rxjs';

export interface SelectItem {
  name?: string;
  clear?: boolean;
  selected?: boolean;
}

@Component({
  standalone: true,
  selector: 'app-select-dialog',
  templateUrl: './select.dialog.html',
  styleUrls: ['select.dialog.scss'],
  imports: [IonButton,
    CommonModule,
    TranslateModule,
    IonHeader,
    IonToolbar,
    IonTitle,
    IonButtons,
    IonIcon,
    IonContent,
    IonSearchbar,
    IonItem,
  ],
})
export class SelectDialogComponent<T extends SelectItem> {

  private filter$: BehaviorSubject<string> = new BehaviorSubject<string>('');
  private allItems$ = new BehaviorSubject<T[]>([]);

  items$ = combineLatest([this.filter$.asObservable(), this.allItems$.asObservable()]).pipe(
    map(([filterValue, items]) => items?.filter((it) => it.name?.toLowerCase().includes(filterValue.toLowerCase()))),
    shareReplay(1),
  )

  clearButton: boolean;
  multiple: boolean;

  constructor(
    private _modal: ModalController,
    navParams: NavParams,
  ) {
    this.allItems$.next(navParams.get('items'));
    this.clearButton = navParams.get('clearButton');
    this.multiple = navParams.get('multiple');
  }

  onFilter(input: IonSearchbar) {
    const filterValue = input.value;
    if (filterValue) {
      this.filter$.next(filterValue);
    }
  }

  clear() {
    this.dismiss({ clear: true } as T);
  }

  select(item: T) {
    if (this.multiple) {
      item.selected = !item.selected;
    } else {
      this.dismiss(item);
    }
  }

  save() {
    this._modal.dismiss(this.allItems$.getValue().filter((it) => it.selected));
  }

  dismiss(item?: T) {
    this._modal.dismiss(item);
  }
}
