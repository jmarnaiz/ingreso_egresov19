import { Injectable } from '@angular/core';
import {
  Auth,
  authState,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  Unsubscribe,
  UserCredential,
} from '@angular/fire/auth';
import { doc, Firestore, onSnapshot, setDoc } from '@angular/fire/firestore';
import { map, Observable } from 'rxjs';
import { UserDTO } from '../models/user.model';
import { Store } from '@ngrx/store';
import * as authActions from '../auth/auth.actions';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private _userUnsubscribe!: Unsubscribe;

  constructor(
    private _auth: Auth,
    private _fireStore: Firestore,
    private _store: Store
  ) {}

  initAuthListener() {
    authState(this._auth).subscribe((fuser) => {
      if (fuser) {
        console.log('User info: ', fuser);
        this._userUnsubscribe = onSnapshot(
          // Obtenemos la información del usuario almacenada en la BBDD
          // ya que el nombre no lo podemos obtener de fuser
          doc(this._fireStore, fuser.uid, 'user'),
          (docUser) => {
            const user = docUser.data() as UserDTO;
            this._store.dispatch(authActions.setUser({ user }));
          },
          (error) => {
            console.error('Error on init auth listener: ', error);
          }
        );
      } else {
        if (this._userUnsubscribe) this._userUnsubscribe();
        this._store.dispatch(authActions.unSetUser());
      }
    });
  }

  createUser(email: string, password: string): Promise<UserCredential> {
    return createUserWithEmailAndPassword(this._auth, email, password);
  }

  login(email: string, password: string): Promise<UserCredential> {
    return signInWithEmailAndPassword(this._auth, email, password);
  }

  logout(): Promise<void> {
    return signOut(this._auth);
  }

  isAuthenticated(): Observable<boolean> {
    return authState(this._auth).pipe(
      map((fuser) => {
        return !!fuser;
      })
    );
  }

  createDoc(user: UserDTO): Promise<void> {
    const userRef = doc(this._fireStore, user.uid, 'user'); //Establezco la referencia de DONDE voy a guardar
    return setDoc(userRef, user); // Establezco QUÉ voy a guardar, que en este caso es el objeto 'user
  }
}
