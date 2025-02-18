import { createAction, props } from '@ngrx/store';
import { IngresoEgresoActionTypes } from './ingreso-egreso.actions-types';
import { IngresoEgresoDTO } from '../models/ingreso-egreso.model';

export const setItems = createAction(
  IngresoEgresoActionTypes.SET_ITEMS,
  props<{ items: IngresoEgresoDTO[] }>()
);

export const unSetItems = createAction(IngresoEgresoActionTypes.UNSET_ITEMS);
