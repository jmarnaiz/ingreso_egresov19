import { Component, OnDestroy, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { AppState } from '../../app.reducer';
import { Subscription } from 'rxjs';
import { IngresoEgresoType } from '../../models/ingreso-egreso.model';

@Component({
  selector: 'app-statistics',
  standalone: false,
  templateUrl: './statistics.component.html',
  styles: ``,
})
export class StatisticsComponent implements OnInit, OnDestroy {
  public ingresos: number;
  public egresos: number;
  public totalEgresos: number;
  public totalIngresos: number;
  private _subscriptions: Subscription[];

  constructor(private _store: Store<AppState>) {
    this.ingresos = this.egresos = this.totalEgresos = this.totalIngresos = 0;
    this._subscriptions = [];
  }

  ngOnInit(): void {
    this._subscriptions.push(
      this._store.select('ingresosEgresos').subscribe(({ items }) => {
        this._resetCounters();
        items.forEach((item) => {
          const amount = Number(item.amount);
          item.type === IngresoEgresoType.INGRESO
            ? (this.ingresos++, (this.totalIngresos += amount))
            : (this.egresos++, (this.totalEgresos += amount));
        });
      })
    );
  }

  ngOnDestroy(): void {
    this._subscriptions.forEach((subscription) => {
      subscription.unsubscribe();
    });
  }

  _resetCounters() {
    this.ingresos = this.egresos = this.totalEgresos = this.totalIngresos = 0;
  }
}
