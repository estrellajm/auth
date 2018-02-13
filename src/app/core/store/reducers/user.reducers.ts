import * as userActions from '../actions/user.actions';
import { User } from '../models/user.model';
export type Action = userActions.All;

export interface UserState {
  user: {};
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
    case userActions.GET_USER:
      return { ...state, loading: true, loaded: false };
    case userActions.AUTHENTICATED:
      return { ...state, ...action.payload, loading: false, loaded: true };
      case userActions.NOT_AUTHENTICATED:
      return { ...defaultUser, loading: false, loaded: true };
    case userActions.GOOGLE_LOGIN:
      return { ...state, loading: true, loaded: false };
    case userActions.AUTH_ERROR:
      return { ...state, ...action.payload, loading: false, loaded: true };
    case userActions.LOGOUT:
      return { ...state, loading: true, loaded: false };



    // case userActions.LOAD_USER: {
    //   return {
    //     ...state,
    //     loading: true
    //   }
    // }
    // case userActions.LOAD_USER_SUCCESS: {
    //   const userInfo = [action.payload];
    //   const user = userInfo.reduce(
    //     (entities: { [id: string]: User }, user: User) => {
    //       return user
    //     },
    //     {
    //       ...state
    //     }
    //   );
    //   return {
    //     ...state,
    //     loading: false,
    //     loaded: true,
    //     user
    //   };
    // }
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



    case userActions.LOAD_FAIL: {
      return {
        ...state,
        loading: false,
        loaded: false
      }
    }
    default:
      state
  }
}

export const getUser = (state: UserState) => state.user;
export const getUserLoading = (state: UserState) => state.loading;
export const getUserLoaded = (state: UserState) => state.loaded;