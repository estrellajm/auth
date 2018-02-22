import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, FormBuilder } from '@angular/forms';


import { Store } from '@ngrx/store';
import { Observable } from 'rxjs/Observable';
import { User } from '../../store/models/user.model';
import * as userActions from '../../store/actions/user.actions';
import * as fromRoot from '../../store';

interface AppState {
  user: User;
}
@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.css']
})
export class AuthComponent implements OnInit {
  login: FormGroup;
  user$: Observable<User>;

  constructor(private store: Store<AppState>, private fb: FormBuilder) {
    this.store.dispatch(new userActions.LoadUser());
    this.user$ = this.store.select('user');
    this.user$.subscribe(a => console.log(a));
    this.login = this.fb.group({
      email: '',
      password: ''
    });
  }

  ngOnInit() {}

  dashboard() {
    this.store.dispatch(
      new fromRoot.Go({
        path: ['/dashboard']
      })
    );
  }
  home() {
    this.store.dispatch(
      new fromRoot.Go({
        path: ['/home']
      })
    );
  }

  CustomRegister() {
    const user = this.login.value;
    this.store.dispatch(new userActions.CustomRegister(user));
  }
  CustomLogin() {
    const user = this.login.value;
    this.store.dispatch(new userActions.CustomLogin(user));
  }
  googleLogin() {
    this.store.dispatch(new userActions.GoogleLogin());
  }
  facebookLogin() {
    this.store.dispatch(new userActions.FacebookLogin());
  }
  logout() {
    this.store.dispatch(new userActions.Logout());
  }
}
