import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import * as fromRoot from '@core/store';
import * as fromStore from '@core/store';


import { Observable } from 'rxjs/Observable';
import { User } from '@core/store/models/user.model';
import * as userActions from '@core/store/actions/user.actions';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  constructor(private store: Store<any>) {}

  ngOnInit() {}

  dashboard() {
    this.store.dispatch(
      new fromRoot.Go({
        path: ['/dashboard']
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
