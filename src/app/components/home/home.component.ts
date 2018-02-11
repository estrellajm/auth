import { Component, OnInit } from '@angular/core';
import { Store } from "@ngrx/store";
import * as fromRoot from '../../../app/store';
import * as fromStore from '../../store'

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  constructor(private store: Store<any>) { }

  ngOnInit() {
  }
  
  user() {
    this.store.dispatch(new fromRoot.Go({
      path: ['/user']
    }));
  }

}
