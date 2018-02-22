import * as userActions from '../actions/user.actions';
import { User } from '../models/user.model';
export type Action = userActions.All;

declare var firebaseApp: any;

export interface UserState {
  uid: string;
  name: string;
  shifts: object;
  loaded: boolean;
  loading: boolean;
}

export const initialState: UserState = {
  uid: null,
  name: 'GUEST',
  shifts: {},
  loaded: true,
  loading: false
};

/// Reducer function
export function userReducer(state: UserState = initialState, action: Action): UserState {
  switch (action.type) {
    case userActions.AUTHENTICATED:
      return { ...state, ...action.payload, loading: false, loaded: true };
    case userActions.NOT_AUTHENTICATED:
      return initialState;
    case userActions.GOOGLE_LOGIN:
      return { ...state, loading: true, loaded: false };
    case userActions.LOAD_USER:
      return { ...state, loading: true, loaded: false };
    case userActions.LOAD_USER_SHIFTS_SUCCESS: {
      const user = state;
      let shifts = state.shifts;
      const new_shift = action.payload;
      shifts = { ...shifts, [new_shift.id]: new_shift };
      return { ...state, shifts, loading: false, loaded: true };
    }
    case userActions.LOGOUT:
      return initialState;
    case userActions.AUTH_ERROR:
      return { ...state, ...action.payload, loading: false, loaded: true };
    case userActions.LOAD_FAIL: {
      return initialState;
    }
    default:
      return state;
  }
}

export const getUser = (state: UserState) => state['user'];
export const getUserID = (state: UserState) => state['user'].uid;
export const getUserLoading = (state: UserState) => state['user'].loading;
export const getUserLoaded = (state: UserState) => state['user'].loaded;

// case userActions.LOAD_USER_SHIFTS_SUCCESS: {
//   let user = state.user
//   let shifts = state.user.shifts
//   let newShift = action.payload;
//   newShift = { [newShift.id]: newShift };
//   shifts = {
//     ...shifts,
//     ...newShift
//   }
//   user = {
//     ...user,
//     shifts
//   }
//   return {
//     ...state,
//     user,
//     loading: false,
//     loaded: true
//   }
// }
