import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import * as fromRoot from '@core/store';
import * as fromStore from '@core/store';

import * as userActions from '@core/store/actions/user.actions';
@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  constructor(private store: Store<any>) {}

  ngOnInit() {}
  home() {
    this.store.dispatch(
      new fromRoot.Go({
        path: ['/home']
      })
    );
  }
  authHome() {
    this.store.dispatch(
      new fromRoot.Go({
        path: ['/login']
      })
    );
  }
  logout() {
    this.store.dispatch(new userActions.Logout());
  }
}
