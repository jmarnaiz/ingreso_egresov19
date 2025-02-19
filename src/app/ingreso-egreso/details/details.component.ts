import { Component, OnDestroy, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { AppStateWithExpenses } from '../ingreso-egreso.reducer';
import {
  IngresoEgresoDTO,
  IngresoEgresoType,
} from '../../models/ingreso-egreso.model';
import { Subscription } from 'rxjs';
import { IngresoEgresoService } from '../../services/ingreso-egreso.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-details',
  standalone: false,
  templateUrl: './details.component.html',
  styles: ``,
})
export class DetailsComponent implements OnInit, OnDestroy {
  public ingresosEgresos: IngresoEgresoDTO[];
  private _subscriptions: Subscription[];
  public ingresoEgresoType = IngresoEgresoType;

  constructor(
    private _store: Store<AppStateWithExpenses>,
    private _ingresoEgresoService: IngresoEgresoService
  ) {
    this.ingresosEgresos = this._subscriptions = [];
  }

  ngOnInit(): void {
    this._subscriptions.push(
      this._store.select('ingresosEgresos').subscribe(({ items }) => {
        this.ingresosEgresos = items;
      })
    );
  }

  ngOnDestroy(): void {
    this._subscriptions.forEach((subscription) => {
      subscription.unsubscribe();
    });
  }

  async delete(uid?: string) {
    if (uid) {
      try {
        await this._ingresoEgresoService.deleteIngresoEgreso(uid);
        Swal.fire({
          title: 'Borrado',
          text: 'El item se ha borrado con éxito',
          icon: 'success',
        });
      } catch (error) {
        Swal.fire({
          title: 'Error!',
          text: 'Error on delete',
          icon: 'error',
        });
      }
    }
  }
}
