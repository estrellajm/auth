import { Component, OnInit } from '@angular/core';
import { Store } from "@ngrx/store";
import * as fromRoot from '@core/store';
import * as fromStore from '@core/store'

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css']
})
export class UserComponent implements OnInit {

  constructor(
    private store: Store<any>
  ) { }

  ngOnInit() {
  }
  home() {
    this.store.dispatch(new fromRoot.Go({
      path: ['/home']
    }));
  }
}
