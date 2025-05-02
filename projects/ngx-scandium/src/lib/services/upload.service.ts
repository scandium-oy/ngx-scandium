import { Injectable } from '@angular/core';
import { FileUpload } from '../models';
import { AuthService } from './auth.service';
import { FirestoreService } from './firestore.service';


@Injectable({
  providedIn: 'root',
})
export class UploadService {
  constructor(
    private authService: AuthService,
    private firestore: FirestoreService,
  ) { }

  async uploadImage(file: FileUpload, isPrivate = false) {
    const authUser = this.authService.getCurrentUser();
    const path = `${isPrivate ? 'private' : 'public'}/${authUser?.uid}/${file.guid}`;
    return this.firestore.pushFileToStorage(file, path);
  }

  async uploadFile(file: FileUpload, tmp = false) {
    const authUser = this.authService.getCurrentUser();
    const path = tmp ? `tmp/${file.guid}` : `${authUser?.uid}/${file.guid}`;
    return this.firestore.pushFileToStorageRef(file, path);
  }
}
