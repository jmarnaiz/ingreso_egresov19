import { createReducer, on } from '@ngrx/store';
import { IngresoEgresoDTO } from '../models/ingreso-egreso.model';
import * as actions from './ingreso-egreso.actions';
import { AppState } from '../app.reducer';

export interface State {
  items: IngresoEgresoDTO[];
}

export interface AppStateWithExpenses extends AppState {
  ingresosEgresos: State;
}

const initialState: State = {
  items: [],
};

export const ingresoEgresoReducer = createReducer(
  initialState,
  on(actions.setItems, (state, { items }) => ({
    ...state,
    items: [...items],
  })),
  on(actions.unSetItems, (state) => ({ ...state, items: [] }))
);
