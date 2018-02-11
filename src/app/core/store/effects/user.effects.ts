import { Injectable } from '@angular/core';
import { Effect, Actions } from '@ngrx/effects';
import { User } from '../models/user.model';
import { AngularFireAuth } from 'angularfire2/auth';
import { AngularFirestore, AngularFirestoreDocument } from "angularfire2/firestore";
import * as firebase from 'firebase';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/fromPromise';
import 'rxjs/add/observable/of';
import { map, delay, switchMap, catchError } from 'rxjs/operators';
import * as userActions from '../actions/user.actions';
import { Router } from '@angular/router';

export type Action = userActions.All;

@Injectable()
export class UserEffects {
    @Effect()
    getUser: Observable<Action> = this.actions.ofType(userActions.GET_USER_ID).pipe(
        map((action: userActions.GetUserID) => action.payload),
        switchMap(payload => this.afAuth.authState),
        map(data => {
            if (data) {
                /// User logged in
                let user = new User(data.uid, data.displayName);
                let userStore =this.afs.doc<User>(`users/${data.uid}`).snapshotChanges()
                console.log(userStore)
                return new userActions.Authenticated(user);
            } else {
                /// User not logged in
                return new userActions.NotAuthenticated();
            }
        }),
        // code works.. but there is a delay
        catchError(err => Observable.of(new userActions.AuthError()))
    );


    // @Effect()
    // getUser: Observable<Action> = this.actions.ofType(userActions.GET_USER).pipe(
    //     map((action: userActions.GetUser) => action.payload),
    //     switchMap(payload => this.afAuth.authState),
    //     map(authData => {
    //         if (authData) {
    //             /// User logged in
    //             const user = new User(authData.uid, authData.displayName);
    //             return new userActions.Authenticated(user);
    //         } else {
    //             /// User not logged in
    //             return new userActions.NotAuthenticated();
    //         }
    //     }),
    //     catchError(err => Observable.of(new userActions.AuthError())));


    // @Effect()
    // getUser: Observable<any> = this.actions.ofType(userActions.GET_USER).pipe(
    //     map((action: userActions.GetUser) => action.payload),
    //     switchMap(id => {
    //         return this.afs.doc<User>(`users/${id}`).snapshotChanges().pipe(
    //             map(action => {
    //                 return {
    //                     type: userActions.AUTHENTICATED,
    //                     payload: {
    //                         id: action.payload.id,
    //                         ...action.payload.data()
    //                     }
    //                 };
    //             })
    //         );
    //     })
    // );

    // Custom register
    @Effect()
    custom_register: Observable<Action> = this.actions.ofType(userActions.CUSTOM_REGISTER).pipe(
        map((action: userActions.GoogleLogin) => action.payload),
        switchMap(user => {
            return this.afAuth.auth.createUserWithEmailAndPassword(user.email, user.password)
        }),
        map(credential => {
            // successful login
            console.log(credential)
            this.updateUserData(credential)
            return new userActions.GetUserID();
        }),
        catchError(err => {
            return Observable.of(new userActions.AuthError({ error: err.message }))
        }));

    // Custom Login
    @Effect()
    custom_login: Observable<Action> = this.actions.ofType(userActions.CUSTOM_LOGIN).pipe(
        map((action: userActions.GoogleLogin) => action.payload),
        switchMap(user => {
            return this.afAuth.auth.signInWithEmailAndPassword(user.email, user.password)
        }),
        map(credential => {
            // successful login
            return new userActions.GetUserID();
        }),
        catchError(err => {
            return Observable.of(new userActions.AuthError({ error: err.message }))
        }));

    // Google Login
    @Effect()
    google_login: Observable<Action> = this.actions.ofType(userActions.GOOGLE_LOGIN).pipe(
        map((action: userActions.GoogleLogin) => action.payload),
        switchMap(user => {
            return Observable.fromPromise(this.googleLogin());
        }),
        map(credential => {
            // successful login
            return new userActions.GetUserID();
        }),
        catchError(err => {
            return Observable.of(new userActions.AuthError({ error: err.message }))
        }));

    // Facebook Login
    @Effect()
    facebook_login: Observable<Action> = this.actions.ofType(userActions.FACEBOOK_LOGIN).pipe(
        map((action: userActions.GoogleLogin) => action.payload),
        switchMap(user => {
            return Observable.fromPromise(this.facebookLogin());
        }),
        map(credential => {
            // successful login
            return new userActions.GetUserID();
        }),
        catchError(err => {
            return Observable.of(new userActions.AuthError({ error: err.message }))
        }));

    // Logout
    @Effect()
    logout: Observable<Action> = this.actions.ofType(userActions.LOGOUT).pipe(
        map((action: userActions.Logout) => action.payload),
        switchMap(payload => {
            return Observable.of(this.afAuth.auth.signOut());
        }),
        map(authData => {
            return new userActions.NotAuthenticated('from logout');
        }),
        catchError(err => Observable.of(new userActions.AuthError({ error: err.message }))));
    // Constructor & private functions
    constructor(
        private actions: Actions,
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