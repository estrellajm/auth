import { Injectable } from "@angular/core";
import { Effect, Actions } from "@ngrx/effects";
import { Action, Store } from "@ngrx/store";
import { User } from "../models/user.model";
import { AngularFireAuth } from "angularfire2/auth";
import {
  AngularFirestore,
  AngularFirestoreDocument
} from "angularfire2/firestore";
import * as firebase from "firebase";
import { Observable } from "rxjs/Observable";
import { of } from "rxjs/observable/of";
import "rxjs/add/observable/fromPromise";
import "rxjs/add/observable/of";
import { tap, map, switchMap, mergeMap, catchError } from "rxjs/operators";
import * as userActions from "../actions/user.actions";
import { Router } from "@angular/router";
import * as fromRouter from "../actions";

@Injectable()
export class UserEffects {
  /// Custom register
  @Effect()
  custom_register$: Observable<Action> = this.actions$
    .ofType(userActions.CUSTOM_REGISTER)
    .pipe(
      map((action: userActions.GoogleLogin) => action.payload),
      switchMap(user => {
        return this.afAuth.auth.createUserWithEmailAndPassword(
          user.email,
          user.password
        );
      }),
      map(credential => {
        // successful login
        this.updateUserData(credential.user);
        return new userActions.LoadUser();
      }),
      catchError(err => {
        return Observable.of(new userActions.AuthError({ error: err.message }));
      })
    );
  /// Custom Login
  @Effect()
  custom_login$: Observable<Action> = this.actions$
    .ofType(userActions.CUSTOM_LOGIN)
    .pipe(
      map((action: userActions.GoogleLogin) => action.payload),
      switchMap(user => {
        return this.afAuth.auth.signInWithEmailAndPassword(
          user.email,
          user.password
        );
      }),
      switchMap(credential => {
        return this.afs
          .doc<User>(`users/${credential.uid}`)
          .snapshotChanges()
          .pipe(
            map(data => {
              return new userActions.Authenticated(data.payload.data());
            })
          );
      }),
      map(() => {
        return new fromRouter.Go({
          path: ["/dashboard"]
        });
      }),
      catchError(err => {
        return Observable.of(new userActions.AuthError({ error: err.message }));
      })
    );
  /// Google Login
  @Effect()
  google_login$: Observable<Action> = this.actions$
    .ofType(userActions.GOOGLE_LOGIN)
    .pipe(
      map((action: userActions.GoogleLogin) => action.payload),
      switchMap(user => {
        const provider = new firebase.auth.GoogleAuthProvider();
        return this.afAuth.auth.signInWithPopup(provider);
      }),
      switchMap(user => {
        if (user.additionalUserInfo.isNewUser) {
          this.updateUserData(user);
        } else if (user) {
          return this.afs
            .doc<User>(`users/${user.uid}`)
            .snapshotChanges()
            .pipe(
              map(action => {
                return {
                  type: userActions.AUTHENTICATED,
                  payload: action.payload.data()
                };
              }),
              switchMap(() => of(new fromRouter.Go({ path: ["/dashboard"] }))),
              catchError(err => of(new userActions.LoadFail(err)))
            );
        }
      }),
      catchError(err => of(new userActions.AuthError({ error: err.message })))
    );

  /// Logout Success
  @Effect({ dispatch: false })
  logoutSuccess$: Observable<Action> = this.actions$
    .ofType(userActions.LOGOUT_SUCCESS)
    .pipe(switchMap(() => of(new fromRouter.Go({ path: ["/dashboard"] }))));

  /// Facebook Login
  @Effect()
  facebook_login$: Observable<Action> = this.actions$
    .ofType(userActions.FACEBOOK_LOGIN)
    .pipe(
      map((action: userActions.GoogleLogin) => action.payload),
      switchMap(user => {
        return Observable.fromPromise(this.facebookLogin());
      }),
      switchMap(credential => {
        return this.afs
          .doc<User>(`users/${credential.user.uid}`)
          .snapshotChanges()
          .pipe(
            map(data => {
              return new userActions.Authenticated(data.payload.data());
            })
          );
      }),
      map(() => {
        return new fromRouter.Go({ path: ["/dashboard"] });
      }),
      catchError(err => {
        return Observable.of(new userActions.AuthError({ error: err.message }));
      })
    );

  /////////////////
  /// LOAD USER ///
  /////////////////
  /// Load User
  @Effect()
  load_user$: Observable<Action> = this.actions$
    .ofType(userActions.LOAD_USER)
    .pipe(
      switchMap(payload => this.afAuth.authState),
      switchMap(user => {
        if (user) {
          return this.afs
            .doc<User>(`users/${user.uid}`)
            .snapshotChanges()
            .pipe(
              map(action => {
                return {
                  type: userActions.AUTHENTICATED,
                  payload: action.payload.data()
                };
              }),
              catchError(err => of(new userActions.LoadFail(err)))
            );
        }
      }),
      catchError(err => of(new userActions.AuthError({ error: err.message })))
    );
  /// Load User Shifts
  @Effect()
  load_user_shifts$: Observable<Action> = this.actions$
    .ofType(userActions.LOAD_USER_SHIFTS)
    .pipe(
      switchMap(payload => this.afAuth.authState),
      switchMap(user => {
        if (user) {
          return this.afs
            .collection<User>(`users/${user.uid}/shifts`)
            .stateChanges()
            .pipe(
              mergeMap(actions => actions),
              map(action => {
                return {
                  type: userActions.LOAD_USER_SHIFTS_SUCCESS,
                  payload: action.payload.doc.data()
                };
              }),
              catchError(err => of(new userActions.LoadFail(err)))
            );
        }
      }),
      catchError(err => of(new userActions.AuthError({ error: err.message })))
    );

  ////////////////////
  // MISC FUNCTIONS //
  ////////////////////

  /// Send Email Verification
  @Effect()
  send_email_verification$: Observable<Action> = this.actions$
    .ofType(userActions.SEND_EMAIL_VERIFICATION)
    .pipe(
      map((action: userActions.SendEmailVerification) => action.payload),
      switchMap(payload => {
        console.log(payload);
        return Observable.of(
          this.afAuth.auth.currentUser.sendEmailVerification(payload)
        );
      }),
      map(() => new userActions.NotAuthenticated("Verify your email")),
      catchError(err => of(new userActions.AuthError({ error: err.message })))
    );

  /// Forgot Password
  @Effect()
  forgot_password$: Observable<Action> = this.actions$
    .ofType(userActions.FORGOT_PASSWORD)
    .pipe(
      map((action: userActions.ForgotPassword) => action.payload),
      switchMap(payload => {
        console.log(payload);
        return Observable.of(this.afAuth.auth.sendPasswordResetEmail(payload));
      }),
      map(() => new userActions.NotAuthenticated("forgot password email sent")),
      catchError(err => of(new userActions.AuthError({ error: err.message })))
    );

  /// Update User Email
  @Effect()
  update_email$: Observable<Action> = this.actions$
    .ofType(userActions.UPDATE_EMAIL)
    .pipe(
      map((action: userActions.UpdateEmail) => action.payload),
      switchMap(payload => {
        console.log(payload);
        return Observable.of(this.afAuth.auth.currentUser.updateEmail(payload));
      }),
      map(() => new userActions.NotAuthenticated("update email successfull")),
      catchError(err => of(new userActions.AuthError({ error: err.message })))
    );

  /// Update User Password
  @Effect()
  update_password$: Observable<Action> = this.actions$
    .ofType(userActions.UPDATE_PASSWORD)
    .pipe(
      map((action: userActions.UpdatePassword) => action.payload),
      switchMap(payload => {
        console.log(payload);
        return Observable.of(
          this.afAuth.auth.currentUser.updatePassword(payload)
        );
      }),
      map(
        () => new userActions.NotAuthenticated("update password successfull")
      ),
      catchError(err => of(new userActions.AuthError({ error: err.message })))
    );

  /// update user
  @Effect()
  update_user$: Observable<Action> = this.actions$
    .ofType(userActions.UPDATE_USER)
    .pipe(
      map((action: userActions.UpdateUser) => action.payload),
      switchMap(user => {
        console.log(user);
        const ref = this.afs.doc<User>(`users/${user.uid}`);
        return Observable.fromPromise(ref.update(user));
      }),
      map(() => new userActions.LoadUser())
    );

  /// Logout
  @Effect()
  logout$: Observable<Action> = this.actions$.ofType(userActions.LOGOUT).pipe(
    map((action: userActions.Logout) => action.payload),
    switchMap(payload => {
      return Observable.of(this.afAuth.auth.signOut());
    }),
    map(() => new userActions.NotAuthenticated("from logouttttt")),
    map(() => {
      return new fromRouter.Go({
        path: ["/login"]
      });
    }),
    catchError(err => of(new userActions.AuthError({ error: err.message })))
  );

  /////////////////////////////////////
  // CONSTRUCTOR & PRIVATE FUNCTIONS //
  /////////////////////////////////////
  constructor(
    private actions$: Actions,
    private afAuth: AngularFireAuth,
    private afs: AngularFirestore
  ) {}

  private getUserData(credentials) {
    // Sets user data to firestore on login
    const user = {
      ...credentials.user,
      ...credentials.additionalUserInfo.profile,
      ...credentials.additionalUserInfo.providerId
    };
    const userRef: AngularFirestoreDocument<any> = this.afs.doc(
      `users/${user.uid}`
    );
    console.log(user);
    const data = this.dataProcess(user);

    console.log(data);
    // return userRef.set(data)
  }
  private updateUserData(credentials) {
    // Sets user data to firestore on login
    const user = {
      ...credentials.user,
      ...credentials.additionalUserInfo.profile,
      ...credentials.additionalUserInfo.providerId
    };
    const userRef: AngularFirestoreDocument<any> = this.afs.doc(
      `users/${user.uid}`
    );
    const data: any = {
      uid: user.uid,
      email: user.email,
      name: user.name,
      firstName: user.given_name,
      lastName: user.family_name,
      photoURL: user.photoURL,
      phoneNumber: user.phoneNumber,
      gender: user.gender,
      google_plus: user.link,
      verified_email: user.verified_email,
      meta_providerId: credentials.additionalUserInfo.providerId,
      meta_account_created: user.metadata.creationTime,
      meta_last_login: user.metadata.creationTime
    };
    // console.log(data)
    return userRef.set(data);
  }

  private dataProcess(user) {
    return {
      uid: user.uid,
      email: user.email,
      name: user.name,
      firstName: user.given_name,
      lastName: user.family_name,
      photoURL: user.photoURL,
      phoneNumber: user.phoneNumber,
      gender: user.gender,
      google_plus: user.link,
      verified_email: user.verified_email,
      meta_providerId: user.providerId,
      meta_account_created: user.metadata.creationTime,
      meta_last_login: user.metadata.creationTime
    };
  }

  private googleLogin() {
    const provider = new firebase.auth.GoogleAuthProvider();
    return this.afAuth.auth.signInWithPopup(provider);
  }
  private facebookLogin() {
    const provider = new firebase.auth.FacebookAuthProvider();
    return this.afAuth.auth.signInWithPopup(provider);
  }

  private oAuthLogin(provider) {
    return this.afAuth.auth.signInWithPopup(provider).then(credential => {
      this.updateUserData(credential.user);
    });
  }
}
