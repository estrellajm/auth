import { Action } from '@ngrx/store';
import { User } from '../models/user.model';

////////////////////////////////////
/// REGISTRATION & LOGIN ACTIONS ///
////////////////////////////////////
export const CUSTOM_REGISTER = '[Auth] Custom Register';
export class CustomRegister implements Action {
  readonly type = CUSTOM_REGISTER;
  constructor(public payload?: any) {}
}
export const CUSTOM_LOGIN = '[Auth] Custom Login';
export class CustomLogin implements Action {
  readonly type = CUSTOM_LOGIN;
  constructor(public payload?: any) {}
}
export const GOOGLE_LOGIN = '[Auth] Google Login';
export class GoogleLogin implements Action {
  readonly type = GOOGLE_LOGIN;
  constructor(public payload?: any) {}
}
export const FACEBOOK_LOGIN = '[Auth] Facebook Login';
export class FacebookLogin implements Action {
  readonly type = FACEBOOK_LOGIN;
  constructor(public payload?: any) {}
}

/////////////////
/// AUTHSTATE ///
/////////////////
export const AUTHENTICATED = '[Auth] Authenticated';
export class Authenticated implements Action {
  readonly type = AUTHENTICATED;
  constructor(public payload?: any) {}
}
export const NOT_AUTHENTICATED = '[Auth] Not Authenticated';
export class NotAuthenticated implements Action {
  readonly type = NOT_AUTHENTICATED;
  constructor(public payload?: any) {}
}

/////////////////
/// LOAD USER ///
/////////////////
export const LOAD_USER = '[User] Load User';
export class LoadUser implements Action {
  readonly type = LOAD_USER;
  constructor() {}
}
/// Below not being userReducer. Using Authenticated
export const LOAD_USER_SUCCESS = '[User] Load User Success';
export class LoadUserSuccess implements Action {
  readonly type = LOAD_USER_SUCCESS;
  constructor(public payload: any) {}
}
export const LOAD_USER_SHIFTS = '[User] Load User Shifts';
export class LoadUserShifts implements Action {
  readonly type = LOAD_USER_SHIFTS;
  constructor() {}
}
export const LOAD_USER_SHIFTS_SUCCESS = '[User] Load User Shifts Success';
export class LoadUserShiftsSuccess implements Action {
  readonly type = LOAD_USER_SHIFTS_SUCCESS;
  constructor(public payload: any) {}
}

//////////////////////////////////
/// MISC AUTH & USER FUNCTIONS ///
//////////////////////////////////
export const SEND_EMAIL_VERIFICATION = '[Auth] Send Email Verification';
export class SendEmailVerification implements Action {
  readonly type = SEND_EMAIL_VERIFICATION;
  constructor(public payload?: any) {}
}
export const FORGOT_PASSWORD = '[Auth] Forgot Password';
export class ForgotPassword implements Action {
  readonly type = FORGOT_PASSWORD;
  constructor(public payload?: any) {}
}
export const UPDATE_EMAIL = '[Auth] Update Email';
export class UpdateEmail implements Action {
  readonly type = UPDATE_EMAIL;
  constructor(public payload?: any) {}
}
export const UPDATE_PASSWORD = '[Auth] Update Password';
export class UpdatePassword implements Action {
  readonly type = UPDATE_PASSWORD;
  constructor(public payload?: any) {}
}
export const UPDATE_USER = '[User] Update User';
export class UpdateUser implements Action {
  readonly type = UPDATE_USER;
  constructor(public payload: any) {}
}
export const UPDATE_USER_SUCCESS = '[User] Update User Success';
export class UpdateUserSuccess implements Action {
  readonly type = UPDATE_USER_SUCCESS;
  constructor(public payload: any) {}
}

//////////////
/// LOGOUT ///
//////////////
export const LOGOUT = '[Auth] Logout';
export class Logout implements Action {
  readonly type = LOGOUT;
}
export const LOGOUT_SUCCESS = '[Auth] Logout Success';
export class LogoutSuccess implements Action {
  readonly type = LOGOUT_SUCCESS;
  constructor(public payload?: any) {}
}

//////////////
/// ERRORS ///
//////////////
export const AUTH_ERROR = '[Auth] Error';
export class AuthError implements Action {
  readonly type = AUTH_ERROR;
  constructor(public payload?: any) {}
}
export const LOAD_FAIL = '[User] Load Fail';
export class LoadFail implements Action {
  readonly type = LOAD_FAIL;
  constructor(public payload: any) {}
}

export type All =
  | CustomRegister
  | CustomLogin
  | GoogleLogin
  | FacebookLogin
  | Authenticated
  | NotAuthenticated
  | LoadUser
  | LoadUserSuccess
  | LoadUserShifts
  | LoadUserShiftsSuccess
  | SendEmailVerification
  | ForgotPassword
  | UpdateEmail
  | UpdatePassword
  | UpdateUser
  | UpdateUserSuccess
  | Logout
  | LogoutSuccess
  | AuthError
  | LoadFail;
