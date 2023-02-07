import { Injectable } from '@angular/core';
import {
  Auth,
  AuthCredential,
  AuthProvider, createUserWithEmailAndPassword, EmailAuthProvider,
  fetchSignInMethodsForEmail,
  sendPasswordResetEmail,
  signInWithCredential, signInWithPopup, updatePassword, updateProfile, user, User, UserCredential
} from '@angular/fire/auth';
import { Observable } from 'rxjs';
import { INavigationService } from './navigation.interface.service';

@Injectable({
  providedIn: 'root',
})
export class AuthService {

  constructor(
    private auth: Auth,
    private navigationService: INavigationService,
  ) { }

  public getUser(): Observable<User | null> {
    return user(this.auth);
  }

  public getCurrentUser(): User | null {
    return this.auth.currentUser;
  }

  public updateProfile(displayName: string) {
    if (this.auth.currentUser) {
      return updateProfile(this.auth.currentUser, { displayName });
    }
    return null;
  }

  public updateCurrentUser(currentUser: User): Promise<void> {
    return this.auth.updateCurrentUser(currentUser);
  }

  public async updatePassword(email: string, password: string, newPassword: string) {
    const credential = EmailAuthProvider.credential(
      email,
      password
    );
    const userCredential = await this.signInWithCredential(credential);
    return updatePassword(userCredential.user, newPassword);
  }

  public getSignInMethodsForEmail(email: string) {
    return fetchSignInMethodsForEmail(this.auth, email);
  }

  public signInWithCredential(credential: AuthCredential): Promise<UserCredential> {
    return signInWithCredential(this.auth, credential);
  }

  public signInWithPopup(provider: AuthProvider): Promise<UserCredential> {
    return signInWithPopup(this.auth, provider);
  }

  public registerWithEmail(email: string, password: string) {
    return createUserWithEmailAndPassword(this.auth, email, password);
  }

  public resetPassword(email: string) {
    return sendPasswordResetEmail(this.auth, email);
  }

  public async signOut() {
    await this.auth.signOut();
    // this.navigationService.navigateToLogin();
  }

  public deleteUser() {
    return this.auth.currentUser?.delete().then(() => this.navigationService.navigateToLogin());
  }
}
