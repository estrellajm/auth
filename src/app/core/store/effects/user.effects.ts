import { Injectable } from '@angular/core';
import { Effect, Actions } from '@ngrx/effects';
import { Action, Store } from '@ngrx/store';
import { User } from '../models/user.model';
import { AngularFireAuth } from 'angularfire2/auth';
import { AngularFirestore, AngularFirestoreDocument } from "angularfire2/firestore";
import * as firebase from 'firebase';
import { Observable } from 'rxjs/Observable';
import { of } from 'rxjs/observable/of';
import 'rxjs/add/observable/fromPromise';
import 'rxjs/add/observable/of';
import { tap, map, switchMap, mergeMap, catchError } from 'rxjs/operators';
import * as userActions from '../actions/user.actions';
import { Router } from '@angular/router';


@Injectable()
export class UserEffects {
    /// get user
    @Effect()
    getUser$: Observable<Action> = this.actions$.ofType(userActions.GET_USER).pipe(
        map((action: userActions.GetUser) => action.payload),
        switchMap(payload => this.afAuth.authState),
        switchMap(data => {
            /// User logged in
            return this.afs.doc<User>(`users/${data.uid}`).snapshotChanges().pipe(
                map(action => {
                    console.log('aaa')
                    return new userActions.Authenticated(action.payload.data());
                })
            )
        }),
        map(() => new userActions.NotAuthenticated('from getUser')),
        catchError(err => of(new userActions.AuthError({ errorrr: err.message })))
    );







    /// Custom register
    @Effect()
    custom_register$: Observable<Action> = this.actions$.ofType(userActions.CUSTOM_REGISTER).pipe(
        map((action: userActions.GoogleLogin) => action.payload),
        switchMap(user => {
            return this.afAuth.auth.createUserWithEmailAndPassword(user.email, user.password)
        }),
        map(credential => {
            // successful login
            console.log(credential)
            this.updateUserData(credential)
            return new userActions.GetUser();
        }),
        catchError(err => {
            return Observable.of(new userActions.AuthError({ error: err.message }))
        })
    );

    /// Custom Login
    @Effect()
    custom_login$: Observable<Action> = this.actions$.ofType(userActions.CUSTOM_LOGIN).pipe(
        map((action: userActions.GoogleLogin) => action.payload),
        switchMap(user => {
            return this.afAuth.auth.signInWithEmailAndPassword(user.email, user.password)
        }),
        switchMap(credential => {
            console.log(credential)
            return this.afs.doc<User>(`users/${credential.uid}`).snapshotChanges().pipe(
                map(data => {
                    return new userActions.Authenticated(data.payload.data());
                })
            )
        }),
        catchError(err => {
            return Observable.of(new userActions.AuthError({ error: err.message }))
        })
    );

    /// Google Login
    @Effect()
    google_login$: Observable<Action> = this.actions$.ofType(userActions.GOOGLE_LOGIN).pipe(
        map((action: userActions.GoogleLogin) => action.payload),
        switchMap(user => {
            return Observable.fromPromise(this.googleLogin());
        }),
        // map(credential => {
        //     // successful login
        //     return new userActions.GetUser(credential.user);
        // }),
        switchMap(credential => {
            return this.afs.doc<User>(`users/${credential.user.uid}`).snapshotChanges().pipe(
                map(data => {
                    return new userActions.Authenticated(data.payload.data());
                })
            )
        }),
        catchError(() => of(new userActions.NotAuthenticated()))
    );

    /// Facebook Login
    @Effect()
    facebook_login$: Observable<Action> = this.actions$.ofType(userActions.FACEBOOK_LOGIN).pipe(
        map((action: userActions.GoogleLogin) => action.payload),
        switchMap(user => {
            return Observable.fromPromise(this.facebookLogin());
        }),
        switchMap(credential => {
            return this.afs.doc<User>(`users/${credential.user.uid}`).snapshotChanges().pipe(
                map(data => {
                    return new userActions.Authenticated(data.payload.data());
                })
            )
        }),
        catchError(err => {
            return Observable.of(new userActions.AuthError({ error: err.message }))
        })
    );

    /// Logout
    @Effect()
    logout$: Observable<Action> = this.actions$.ofType(userActions.LOGOUT).pipe(
        map((action: userActions.Logout) => action.payload),
        switchMap(payload => {
            return Observable.of(this.afAuth.auth.signOut());
        }),
        map(() => new userActions.NotAuthenticated('from logoutssssss')),
        catchError(err => of(new userActions.AuthError({ error: err.message })))
    );





    /// load user (redundant)
    @Effect()
    load_user$: Observable<Action> = this.actions$.ofType(userActions.LOAD_USER).pipe(
        map((action: userActions.LoadUser) => action.payload),
        switchMap(id => {
            return this.afs.doc<User>(`users/${id}`).snapshotChanges().pipe(
                map(action => {
                    return {
                        type: userActions.LOAD_USER_SUCCESS,
                        payload: {
                            id: action.payload.id,
                            ...action.payload.data()
                        }
                    };
                })
            );
        })
    );

    /// load user shifts
    @Effect()
    load_user_shifts$: Observable<Action> = this.actions$.ofType(userActions.LOAD_USER_SHIFTS).pipe(
        map((action: userActions.LoadUserShifts) => action.payload),
        switchMap(id => {
            return this.afs.collection<User>(`users/${id}/shifts`).stateChanges().pipe(
                mergeMap(actions => actions),
                map(action => {
                    return {
                        type: userActions.LOAD_USER_SHIFTS_SUCCESS,
                        payload: {
                            id: action.payload.doc.id,
                            ...action.payload.doc.data()
                        }
                    };
                }),
                catchError(err => of(new userActions.LoadFail(err)))
            )
        })
    );

    /// load user shifts
    @Effect()
    update_user$: Observable<Action> = this.actions$.ofType(userActions.UPDATE_USER).pipe(
        map((action: userActions.LoadUserShifts) => action.payload),
        switchMap(user => {
            const ref = this.afs.doc<User>(`users/${user.id}`);
            return Observable.fromPromise(ref.update(user));
        }),
        map(user => new userActions.UpdateUserSuccess(user))
    );



    // Constructor & private functions
    constructor(
        private actions$: Actions,
        private afAuth: AngularFireAuth,
        private afs: AngularFirestore) { }

    private updateUserData(user) {
        // Sets user data to firestore on login
        // console.log(user)
        const userRef: AngularFirestoreDocument<any> = this.afs.doc(`users/${user.uid}`);
        const data: any = {
            uid: user.uid,
            email: user.email,
            displayName: user.displayName,
            photoURL: user.photoURL
        }
        return userRef.set(data)
    }
    private googleLogin() {
        const provider = new firebase.auth.GoogleAuthProvider();
        return this.afAuth.auth.signInWithPopup(provider);
    }
    private facebookLogin() {
        const provider = new firebase.auth.FacebookAuthProvider();
        return this.afAuth.auth.signInWithPopup(provider);
    }
}