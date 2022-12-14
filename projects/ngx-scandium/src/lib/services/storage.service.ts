import { Injectable } from '@angular/core';
import { Storage as IonicStorage } from '@ionic/storage-angular';
import { Observable, Observer } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class StorageService {
  private subscriptionObservable: { [key: string]: Observable<any> };
  private subscribers: { [key: string]: Array<Observer<any>> } = {};

  constructor(private ionicStorage: IonicStorage) {
    this.subscriptionObservable = {};
    this.ionicStorage.create();
  }

  private createSubscription(key: string) {
    this.subscriptionObservable[key] = new Observable<any>(
      (observer: Observer<any>) => {
        if (!this.subscribers[key]) {
          this.subscribers[key] = new Array<Observer<any>>();
        }
        this.subscribers[key].push(observer);
        this.get(key).then((value) => {
          observer.next(value);
        });
        return () => {
          this.subscribers[key] = this.subscribers[key].filter(
            (obs) => obs !== observer
          );
        };
      }
    );
  }

  private dispatch(key: string, item: any): void {
    if (this.subscribers[key]) {
      this.subscribers[key].forEach((sub) => {
        try {
          sub.next(item);
        } catch (e) {
          // we want all subscribers to get the update even if one errors.
        }
      });
    }
  }

  getValue<T>(key: string): Observable<T> {
    if (!this.subscriptionObservable[key]) {
      this.createSubscription(key);
    }
    return this.subscriptionObservable[key];
  }

  public getStorage(): Storage {
    return localStorage;
  }

  setItem(key: string, value: any): void {
    localStorage.setItem(key, JSON.stringify(value));
  }

  getItem(key: string): any {
    return JSON.parse(localStorage.getItem(key) as string);
  }

  removeItem(key: string): void {
    localStorage.removeItem(key);
  }

  async set(key: string, value: any): Promise<any> {
    return this.ionicStorage.set(key, value).then(() => this.dispatch(key, value));
  }

  get<T>(key: string): Promise<T> {
    return this.ionicStorage.get(key);
  }

  remove(key: string): void {
    this.ionicStorage.remove(key).then(() => this.dispatch(key, null));
  }

  clear(): void {
    this.ionicStorage.clear();
  }
}
