import { createAction } from '@ngrx/store';
import { UIActionTypes } from './ui.action-types';

export const isLoading = createAction(UIActionTypes.IS_LOADING);
export const stopLoading = createAction(UIActionTypes.STOP_LOADING);
