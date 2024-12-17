import { Injectable } from '@angular/core';
import {
  DocumentData,
  DocumentReference,
  Firestore,
  QueryConstraint,
  addDoc, collection, collectionData,
  deleteDoc,
  disableNetwork,
  doc, docData,
  enableNetwork,
  getCountFromServer,
  getDoc, getDocs,
  query,
  setDoc, updateDoc,
} from '@angular/fire/firestore';
import { Storage, StorageReference, getDownloadURL, ref, uploadBytes } from '@angular/fire/storage';
import { Observable, from, of } from 'rxjs';
import { catchError, map, tap } from 'rxjs/operators';
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

  private printQueryConstraints(list: QueryConstraint[]) {
    const ret: string[] = [];

    list.map((q) => {
      if (q.type === 'where') {
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        const qq = q as any;
        // eslint-disable-next-line @typescript-eslint/restrict-template-expressions
        ret.push(`${qq._field.segments}`);
      }
    });

    return ret.join(',');
  }

  private checkQueryConstraints(collectionKey: string, list: QueryConstraint[]) {
    list.map((q) => {
      if (q.type === 'where') {
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        const qq = q as any;
        if (qq._value === undefined) {
          console.warn(collectionKey, 'Where value is undefined', qq._field.segments, qq._op);
        }
      }
    });
  }

  getCount(collectionKey: string, queryConstraints: QueryConstraint[] = []) {
    const collectionRef = collection(this.firestore, collectionKey);
    const q = query(collectionRef, ...queryConstraints);
    return getCountFromServer(q).then((data) => data.data().count);
  }

  saveAs<T extends FirestoreItem>(collectionKey: string, guid: string, item: T, converter: any = null) {
    const docRef = doc(this.firestore, collectionKey, guid).withConverter(converter);
    return setDoc(docRef, item);
  }

  save<T extends FirestoreItem>(collectionKey: string, item: T, converter: any = null): Promise<DocumentReference<DocumentData, DocumentData>> {
    const collectionRef = collection(this.firestore, collectionKey).withConverter(converter);
    return addDoc<DocumentData, DocumentData>(collectionRef, item);
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
      catchError((_err) => of(null).pipe(tap((_) => console.log(`get ${collectionKey} fetch error`)))),
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
      catchError((_err) => of(null).pipe(tap((_) => console.log(`getOnce ${collectionKey} fetch error`)))),
      map((ret) => {
        const item = ret?.data();
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
      catchError((err) => of(null).pipe(tap((_) => console.info(`getList ${collectionKey} '${this.printQueryConstraints(queryConstraints)}' fetch error`, err)))),
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
  ): Observable<T[] | null> {
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
    })).pipe(
      catchError((err) => of(null).pipe(tap((_) => console.info(`getListOnce ${collectionKey} '${this.printQueryConstraints(queryConstraints)}' fetch error`, err)))),
    );
  }

  toggleNetwork(offline: boolean) {
    if (offline) {
      return disableNetwork(this.firestore);
    } else {
      return enableNetwork(this.firestore);
    }
  }

  async pushFileToStorage(fileUpload: FileUpload, path: string): Promise<string> {
    const filePath = `${path}/${fileUpload.file.name}`;
    const storageRef = ref(this.storage, filePath);
    const result = await uploadBytes(storageRef, fileUpload.file);
    return await getDownloadURL(result.ref);
  }

  async pushFileToStorageRef(fileUpload: FileUpload, path: string): Promise<StorageReference> {
    const filePath = `${path}/${fileUpload.file.name}`;
    const storageRef = ref(this.storage, filePath);
    const result = await uploadBytes(storageRef, fileUpload.file);
    return result.ref;
  }
}
