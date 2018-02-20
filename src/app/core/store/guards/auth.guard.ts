import { Injectable } from '@angular/core';
import { CanActivate } from '@angular/router';

import { AngularFireAuth } from 'angularfire2/auth';
import { Store } from "@ngrx/store";
import { Observable } from 'rxjs/Observable';
import { of } from 'rxjs/observable/of';
import { tap, filter, take, switchMap, catchError, map } from "rxjs/operators";
import * as fromRouter from '../actions'

import * as fromStore from '../reducers/user.reducers'
import * as userAction from '../actions/user.actions'

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(private afAuth: AngularFireAuth, private store: Store<fromStore.UserState>) { }


  canActivate(): Observable<boolean> {
    return this.afAuth.authState.pipe(
      take(1),
      map(user => !!user),
      tap(loggedIn => {
        if (!loggedIn) {
          console.log('access denied')
          this.store.dispatch(new fromRouter.Go({ path: ['/login'] }));
        }
      })
    )
  }


  // canActivate(): Observable<boolean> {
  //   return this.checkStore().pipe(
  //     switchMap(() => of(true)),
  //     catchError(() => of(false))
  //   )
  // }

  // checkStore(): Observable<boolean> {
  //   return this.store.select(fromStore.getUserID)
  //     .pipe(
  //     tap(id => {
  //       if (!id) {
  //         this.store.dispatch(new userAction.GetUser())
  //       }
  //     }),
  //     tap(loaded => {
  //       if (!loaded) {
  //         this.store.dispatch(new fromRouter.Go({ path: ['/login'] }));
  //       }
  //     }),
  //     filter(loaded => loaded),
  //     take(1)
  //     )
  // }
}
