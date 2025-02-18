import { Injectable } from '@angular/core';
import {
  addDoc,
  collection,
  deleteDoc,
  doc,
  Firestore,
  getDocs,
  onSnapshot,
} from '@angular/fire/firestore';
import { IngresoEgresoDTO } from '../models/ingreso-egreso.model';
import { AuthService } from './auth.service';
import { Unsubscribe } from '@angular/fire/auth';
import { Store } from '@ngrx/store';
import * as ingresoEgresoActions from '../ingreso-egreso/ingreso-egreso.actions';

@Injectable({
  providedIn: 'root',
})
export class IngresoEgresoService {
  private _userUnsubscribe!: Unsubscribe;
  constructor(
    private _fireStore: Firestore,
    private _authService: AuthService,
    private _store: Store
  ) {}

  createIngresoEgreso(ingresoEgreso: IngresoEgresoDTO): Promise<unknown> {
    const ingresosEgresosCollectionInstance = collection(
      this._fireStore,
      this._authService.userID,
      'ingresos-egresos',
      'items'
    );
    return addDoc(ingresosEgresosCollectionInstance, ingresoEgreso);
  }

  initIngresosEgresosListener(uid: string) {
    const ingresosEgresosCollectionInstance = collection(
      this._fireStore,
      uid,
      'ingresos-egresos',
      'items'
    );
    this._userUnsubscribe = onSnapshot(
      ingresosEgresosCollectionInstance,
      (querySnapshot) => {
        const data = querySnapshot.docs.map((doc) => {
          return { uid: doc.id, ...doc.data() };
        });
        this._store.dispatch(
          ingresoEgresoActions.setItems({ items: data as IngresoEgresoDTO[] })
        );
      }
    );
  }

  unsubscribeIngresosEgresosListener() {
    if (this._userUnsubscribe) this._userUnsubscribe();
  }

  deleteIngresoEgreso(uid: string): Promise<void> {
    const userID = this._authService.userID;
    const ingresoEgresoReference = doc(
      this._fireStore,
      userID,
      'ingresos-egresos',
      'items',
      uid
    );
    return deleteDoc(ingresoEgresoReference);
  }
}
