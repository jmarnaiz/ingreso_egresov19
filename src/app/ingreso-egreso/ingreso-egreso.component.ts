import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { IngresoEgresoType } from '../models/ingreso-egreso.model';
import { IngresoEgresoService } from '../services/ingreso-egreso.service';
import Swal from 'sweetalert2';
import { Subscription } from 'rxjs';
import { Store } from '@ngrx/store';
import { AppState } from '../app.reducer';
import * as uiActions from '../shared/ui.actions';

@Component({
  selector: 'app-ingreso-egreso',
  standalone: false,
  templateUrl: './ingreso-egreso.component.html',
  styles: ``,
})
export class IngresoEgresoComponent implements OnInit, OnDestroy {
  public ingresoEgresoForm: FormGroup;
  public ingresoEgresoType = IngresoEgresoType;
  public isLoading: boolean;
  public type: IngresoEgresoType;
  private _subscriptions: Subscription[];

  constructor(
    private _fb: FormBuilder,
    private _ingresoEgresoService: IngresoEgresoService,
    private _store: Store<AppState>
  ) {
    this.ingresoEgresoForm = this._fb.group({
      description: ['', [Validators.required, Validators.minLength(5)]],
      amount: ['', [Validators.required, Validators.min(1)]],
    });
    this.type = IngresoEgresoType.INGRESO;
    this._subscriptions = [];
    this.isLoading = false;
  }

  ngOnInit(): void {
    this._subscriptions.push(
      this._store.select('ui').subscribe((ui) => {
        this.isLoading = ui.isLoading;
      })
    );
  }

  ngOnDestroy(): void {
    this._subscriptions.forEach((subscription) => {
      subscription.unsubscribe();
    });
  }

  async save() {
    if (this.ingresoEgresoForm.invalid) return;

    this._store.dispatch(uiActions.isLoading());

    try {
      const { amount, description } = this.ingresoEgresoForm.value;
      await this._ingresoEgresoService.createIngresoEgreso({
        amount,
        description,
        type: this.type,
      });
      Swal.fire({
        title: 'Transacción exitosa',
        text: `Se ha agregado correctamente '${description}' del tipo ${
          IngresoEgresoType[this.type]
        }`,
        icon: 'success',
      });
      this.ingresoEgresoForm.reset();
    } catch (error: any) {
      Swal.fire({
        title: 'Error!',
        text: error.message,
        icon: 'error',
      });
    } finally {
      this._store.dispatch(uiActions.stopLoading());
    }
  }

  // convenience getter for easy access to form fields
  get form() {
    return this.ingresoEgresoForm.controls;
  }
}
