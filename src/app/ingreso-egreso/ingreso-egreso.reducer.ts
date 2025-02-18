import { createReducer, on } from '@ngrx/store';
import { IngresoEgresoDTO } from '../models/ingreso-egreso.model';
import * as actions from './ingreso-egreso.actions';

export interface State {
  items: IngresoEgresoDTO[];
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
