import * as userActions from '../actions/user.actions';
import { User } from '../models/user.model';
export type Action = userActions.All;

export interface UserState {
  user: { [id: string]: User };
  loaded: boolean;
  loading: boolean;
}

export const initialState: UserState = {
  user: {},
  loaded: false,
  loading: false,
}
/// either above or below.... below for now
const defaultUser = new User(null, 'GUEST');

/// Reducer function
export function reducer(state: User = defaultUser, action: Action) {
  switch (action.type) {
    case userActions.GET_USER_ID:
      return { ...state, loading: true };
    case userActions.AUTHENTICATED: 
      // console.log(action.payload)
      return { ...state, ...action.payload, loading: false };
    case userActions.NOT_AUTHENTICATED:
      return { ...state, ...defaultUser, loading: false };

    case userActions.GOOGLE_LOGIN:
      return { ...state, loading: true };

    case userActions.AUTH_ERROR:
      return { ...state, ...action.payload, loading: false };
    case userActions.LOGOUT:
      return { ...state, loading: true };
    default:
      state
  }
}

export const getUser = (state: UserState) => state.user;