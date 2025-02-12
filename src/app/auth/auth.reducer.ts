import { createReducer, on } from '@ngrx/store';
import { EMPTY_USER, UserDTO } from '../models/user.model';
import * as userActions from './auth.actions';

export interface State {
  user: UserDTO;
}

const initialState: State = {
  user: EMPTY_USER,
};

export const authReducer = createReducer(
  initialState,
  on(userActions.setUser, (state, { user }) => ({
    ...state,
    user: { ...user },
  })),
  on(userActions.unSetUser, (state) => ({
    ...state,
    user: { ...EMPTY_USER },
  }))
);
