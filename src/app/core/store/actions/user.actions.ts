import { Action } from '@ngrx/store';
import { User } from '../models/user.model';

export const GET_USER_ID            = '[Auth] Get user id';
export const GET_USER_INFO          = '[Auth] Get user info';
export const GET_USER_SHIFTS        = '[Auth] Get User Shifts';
export const AUTHENTICATED          = '[Auth] Authenticated';
export const NOT_AUTHENTICATED      = '[Auth] Not Authenticated';

export const CUSTOM_REGISTER        = '[Auth] Custom register';

export const CUSTOM_LOGIN           = '[Auth] Custom login attempt';
export const GOOGLE_LOGIN           = '[Auth] Google login attempt';
export const FACEBOOK_LOGIN         = '[Auth] Facebook login attempt';

export const LOGOUT                 = '[Auth] Logout';
export const AUTH_ERROR             = '[Auth] Error';

/// Get User AuthState
export class GetUserID implements Action {
    readonly type = GET_USER_ID;
    constructor(public payload?: any) {}
}
export class GetUserInfo implements Action {
    readonly type = GET_USER_INFO;
    constructor(public payload?: any) {}
}
export class GetUserShifts implements Action {
    readonly type = GET_USER_SHIFTS;
    constructor(public payload: any) { }
}
export class Authenticated implements Action {
    readonly type = AUTHENTICATED;
    constructor(public payload?: any) {}
}
export class NotAuthenticated implements Action {
    readonly type = NOT_AUTHENTICATED;
    constructor(public payload?: any) {}
}
export class AuthError implements Action {
    readonly type = AUTH_ERROR;
    constructor(public payload?: any) {}
}

/// Register Actions
export class CustomRegister implements Action {
    readonly type = CUSTOM_REGISTER;
    constructor(public payload?: any) {}
}

/// Login Actions
export class CustomLogin implements Action {
    readonly type = CUSTOM_LOGIN;
    constructor(public payload?: any) {}
}
export class GoogleLogin implements Action {
    readonly type = GOOGLE_LOGIN;
    constructor(public payload?: any) {}
}
export class FacebookLogin implements Action {
    readonly type = FACEBOOK_LOGIN;
    constructor(public payload?: any) {}
}

/// Logout Actions
export class Logout implements Action {
    readonly type = LOGOUT;
    constructor(public payload?: any) {}
}
export type All
= GetUserID
| GetUserInfo
| GetUserShifts
| Authenticated
| NotAuthenticated
| CustomRegister
| CustomLogin
| GoogleLogin
| FacebookLogin
| AuthError
| Logout;