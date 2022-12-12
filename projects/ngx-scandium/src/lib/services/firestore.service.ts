import { Injectable } from '@angular/core';
import {
  addDoc, collection, collectionData,
  deleteDoc, doc, docData, Firestore, getDoc, getDocs,
  query, QueryConstraint, setDoc, updateDoc
} from '@angular/fire/firestore';
import { getDownloadURL, ref, Storage, uploadBytes } from '@angular/fire/storage';
import { concat, from, Observable, of, throwError } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { FileUpload, FirestoreItem } from '../models';
import { fieldSorter } from '../utility';

@Injectable({
  providedIn: 'root',
})
export class FirestoreService {
  constructor(
    private firestore: Firestore,
    private storage: Storage,
  ) { }

  saveAs<T extends FirestoreItem>(collectionKey: string, guid: string, item: T, converter: any = null) {
    const docRef = doc(this.firestore, collectionKey, guid).withConverter(converter);
    return setDoc(docRef, item);
  }

  save<T extends FirestoreItem>(collectionKey: string, item: T, converter: any = null) {
    const collectionRef = collection(this.firestore, collectionKey).withConverter(converter);
    return addDoc(collectionRef, item);
  }

  update<T extends FirestoreItem>(collectionKey: string, item: T, converter: any = null) {
    const docRef = doc(this.firestore, collectionKey, item.guid ?? '').withConverter(converter);
    return setDoc(docRef, item);
  }

  updateOnly(collectionKey: string, guid: string, value: object, converter: any = null) {
    const docRef = doc(this.firestore, collectionKey, guid).withConverter(converter);
    return updateDoc(docRef, value);
  }

  softDelete<T extends FirestoreItem>(collectionKey: string, item: T, converter: any = null) {
    const docRef = doc(this.firestore, collectionKey, item.guid ?? '').withConverter(converter);
    return updateDoc(docRef, { deleted: true });
  }

  delete<T extends FirestoreItem>(collectionKey: string, item: T, converter: any = null) {
    const docRef = doc(this.firestore, collectionKey, item.guid ?? '').withConverter(converter);
    return deleteDoc(docRef);
  }

  get<T extends FirestoreItem>(
    collectionKey: string,
    guid: string,
    converter: any = null,
  ): Observable<T | null> {
    const docRef = doc(this.firestore, collectionKey, guid).withConverter(converter);
    return docData(docRef, { idField: 'guid' }).pipe(
      catchError((err) => concat(of(null), throwError(err))),
      map((item) => {
        if (item) {
          item['guid'] = guid;
          return item as T;
        } else {
          return null;
        }
      }),
    );
  }

  getOnce<T extends FirestoreItem>(
    collectionKey: string,
    guid: string,
    converter: any = null,
  ): Observable<T | null> {
    const docRef = doc(this.firestore, collectionKey, guid).withConverter(converter);
    return from(getDoc(docRef)).pipe(
      map((ret) => {
        const item = ret.data();
        if (item) {
          item['guid'] = guid;
          return item as T;
        } else {
          return null;
        }
      }),
    );
  }

  getList<T extends FirestoreItem>(
    collectionKey: string,
    orderBy?: { value: string; sort: string },
    queryConstraints: QueryConstraint[] = [],
    converter: any = null,
  ): Observable<T[]> {
    const collectionRef = collection(this.firestore, collectionKey).withConverter(converter);
    const q = query(collectionRef, ...queryConstraints);
    return collectionData(q, { idField: 'guid' }).pipe(
      catchError((err) => concat(of(null), throwError(err))),
      map((items) => {
        if (orderBy) {
          items = items?.sort(fieldSorter([orderBy.value])) ?? null;
          if (orderBy.sort === 'desc') {
            items = items?.reverse() ?? null;
          }
        }
        return items?.map((item: any) => item as T) ?? [];
      }),
    );
  }

  getListOnce<T extends FirestoreItem>(
    collectionKey: string,
    orderBy?: { value: string; sort: string },
    queryConstraints: QueryConstraint[] = [],
    converter: any = null,
  ): Observable<T[]> {
    const collectionRef = collection(this.firestore, collectionKey).withConverter(converter);
    const q = query(collectionRef, ...queryConstraints);
    return from(getDocs(q).then((ret) => {
      let items = ret.docs.map((it) => it.data() as T);
      if (orderBy) {
        items = items?.sort(fieldSorter([orderBy.value]));
        if (orderBy.sort === 'desc') {
          items = items?.reverse();
        }
      }
      return items?.map((item: any) => item as T) ?? [];
    }));
  }

  async pushFileToStorage(fileUpload: FileUpload, path: string): Promise<string> {
    const filePath = `${path}/${fileUpload.file.name}`;
    const storageRef = ref(this.storage, filePath);
    const result = await uploadBytes(storageRef, fileUpload.file);
    return await getDownloadURL(result.ref);
  }
}
