import { Injectable } from '@angular/core';
import { CanActivate } from '@angular/router';

import { Store } from "@ngrx/store";
import { Observable } from 'rxjs/Observable';
import { of } from 'rxjs/observable/of';
import { AuthService } from '../services/auth.service';
import { tap, filter, take, switchMap, catchError, map } from "rxjs/operators";

import * as fromUserRed from '../reducers/user.reducers'
import * as fromUserAct from '../actions/user.actions'

@Injectable()
export class UserGuard implements CanActivate {
  constructor(
    private store: Store<fromUserRed.UserState>,
    private auth: AuthService) { }

  canActivate(): Observable<boolean> {
    return this.checkStore().pipe(
      switchMap(() => of(true)),
      catchError(() => of(false))
    )
  }

  checkStore(): Observable<boolean> {
    return this.store.select(fromUserRed.getUserLoaded)
      .pipe(
        tap(loaded => {
          if (!loaded) {
            this.store.dispatch(new fromUserAct.GetUser())
          }
        }),
        filter(loaded => loaded),
        take(1)
      )
  }
}
