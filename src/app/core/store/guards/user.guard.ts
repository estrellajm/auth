import { Injectable } from '@angular/core';
import { CanActivate } from '@angular/router';

import { Store } from '@ngrx/store';
import { Observable } from 'rxjs/Observable';
import { of } from 'rxjs/observable/of';
import { tap, filter, take, switchMap, catchError, map } from 'rxjs/operators';
import * as fromRouter from '../actions';

import * as fromStore from '../reducers/user.reducers';
import * as userAction from '../actions/user.actions';

@Injectable()
export class UserGuard implements CanActivate {
  constructor(private store: Store<fromStore.UserState>) {}

  canActivate(): Observable<boolean> {
    return this.checkStore().pipe(switchMap(() => of(true)), catchError(() => of(false)));
  }

  checkStore(): Observable<boolean> {
    return this.store.select(fromStore.getUserID).pipe(
      tap(id => {
        if (!id) {
          this.store.dispatch(new userAction.LoadUser());
          this.store.dispatch(new userAction.LoadUserShifts());
        }
      }),
      filter(id => id),
      take(1)
    );
  }
}
