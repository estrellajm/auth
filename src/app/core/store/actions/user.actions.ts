import { Action } from '@ngrx/store';
import { User } from '../models/user.model';

export const GET_USER = '[Auth] Get user';
export const GET_USER_INFO = '[Auth] Get user info';
export const GET_USER_SHIFTS = '[Auth] Get User Shifts';
export const AUTHENTICATED = '[Auth] Authenticated';
export const NOT_AUTHENTICATED = '[Auth] Not Authenticated';

export const CUSTOM_REGISTER = '[Auth] Custom register';

export const CUSTOM_LOGIN = '[Auth] Custom login attempt';
export const GOOGLE_LOGIN = '[Auth] Google login attempt';
export const FACEBOOK_LOGIN = '[Auth] Facebook login attempt';

export const LOGOUT = '[Auth] Logout';
export const AUTH_ERROR = '[Auth] Error';


export const LOAD_FAIL = '[User] Load Fail';
export class LoadFail implements Action {
    readonly type = LOAD_FAIL;
    constructor(public payload: any) { }
}

/// load user
export const LOAD_USER = '[User] Load User';
export class LoadUser implements Action {
    readonly type = LOAD_USER;
    constructor(public payload: any) { }
}
export const LOAD_USER_SUCCESS = '[User] Load User Success';
export class LoadUserSuccess implements Action {
    readonly type = LOAD_USER_SUCCESS;
    constructor(public payload: any) { }
}
export const LOAD_USER_SHIFTS = '[User] Load User Shifts';
export class LoadUserShifts implements Action {
    readonly type = LOAD_USER_SHIFTS;
    constructor(public payload: any) { }
}
export const LOAD_USER_SHIFTS_SUCCESS = '[User] Load User Shifts Success';
export class LoadUserShiftsSuccess implements Action {
    readonly type = LOAD_USER_SHIFTS_SUCCESS;
    constructor(public payload: any) { }
}

/// save user
export const UPDATE_USER = '[User] Update User';
export class UpdateUser implements Action {
    readonly type = UPDATE_USER;
    constructor(public payload: any) { }
}
export const UPDATE_USER_SUCCESS = '[User] Update User Success';
export class UpdateUserSuccess implements Action {
    readonly type = UPDATE_USER_SUCCESS;
    constructor(public payload: any) { }
}

/// Get User AuthState
export class GetUser implements Action {
    readonly type = GET_USER;
    constructor(public payload?: any) { }
}
export class GetUserInfo implements Action {
    readonly type = GET_USER_INFO;
    constructor(public payload?: any) { }
}
export class GetUserShifts implements Action {
    readonly type = GET_USER_SHIFTS;
    constructor(public payload: any) { }
}
export class Authenticated implements Action {
    readonly type = AUTHENTICATED;
    constructor(public payload?: any) { }
}
export class NotAuthenticated implements Action {
    readonly type = NOT_AUTHENTICATED;
    constructor(public payload?: any) { }
}
export class AuthError implements Action {
    readonly type = AUTH_ERROR;
    constructor(public payload?: any) { }
}

/// Register Actions
export class CustomRegister implements Action {
    readonly type = CUSTOM_REGISTER;
    constructor(public payload?: any) { }
}

/// Login Actions
export class CustomLogin implements Action {
    readonly type = CUSTOM_LOGIN;
    constructor(public payload?: any) { }
}
export class GoogleLogin implements Action {
    readonly type = GOOGLE_LOGIN;
    constructor(public payload?: any) { }
}
export class FacebookLogin implements Action {
    readonly type = FACEBOOK_LOGIN;
    constructor(public payload?: any) { }
}

/// Logout Actions
export class Logout implements Action {
    readonly type = LOGOUT;
    constructor(public payload?: any) { }
}
export type All
    = GetUser
    | GetUserInfo
    | GetUserShifts
    | Authenticated
    | NotAuthenticated
    | CustomRegister
    | CustomLogin
    | GoogleLogin
    | FacebookLogin
    | AuthError
    | Logout
    | LoadFail
    | LoadUser
    | LoadUserSuccess
    | LoadUserShifts
    | LoadUserShiftsSuccess
    | UpdateUser
    | UpdateUserSuccess;