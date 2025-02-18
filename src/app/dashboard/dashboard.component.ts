import { Component, OnDestroy } from '@angular/core';
import { Store } from '@ngrx/store';
import { AppState } from '../app.reducer';
import { filter, Subscription } from 'rxjs';
import { IngresoEgresoService } from '../services/ingreso-egreso.service';

@Component({
  selector: 'app-dashboard',
  standalone: false,
  templateUrl: './dashboard.component.html',
  styles: ``,
})
export class DashboardComponent implements OnDestroy {
  private _userSubs: Subscription;
  constructor(
    private _store: Store<AppState>,
    private _ingresoEgresoService: IngresoEgresoService
  ) {
    this._userSubs = this._store
      .select('user')
      .pipe(filter((auth) => !!auth.user.uid))
      .subscribe(({ user }) =>
        this._ingresoEgresoService.initIngresosEgresosListener(user.uid)
      );
  }

  ngOnDestroy(): void {
    this._userSubs.unsubscribe();
    this._ingresoEgresoService.unsubscribeIngresosEgresosListener();
  }
}
