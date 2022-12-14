import { DocumentData, DocumentReference } from '@firebase/firestore';
import { Observable } from 'rxjs';

export interface IService<T> {
  save(item: T): Promise<void> | Promise<DocumentReference<DocumentData>>;
  update(item: T): Promise<void>;
  get(guid: string): Observable<T>;
  getList(): Observable<T[]>;
  delete?(item: T): Promise<void>;
}
