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

  uploadImage(file: FileUpload, isPrivate = false) {
    const authUser = this.authService.getCurrentUser();
    const path = `${isPrivate ? 'private' : 'public'}/${authUser?.uid}/${file.guid}`;
    return this.firestore.pushFileToStorage(file, path);
  }
}
