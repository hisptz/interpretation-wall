import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { Store } from '@ngrx/store';

import { State } from '../../../../store';
import { getAllInterpretations, getCurrentUserDetails, getApiRootUrl } from '../../../../store'
import { Interpretation } from '../../../../models/interpretation.model';
import { CurrentUser } from '../../../../models/current-user.model';

@Component({
  selector: 'app-interpretation',
  templateUrl: './interpretation.component.html',
  styleUrls: ['./interpretation.component.css']
})
export class InterpretationComponent implements OnInit {
  interpretations$ : Observable<Interpretation[]>;
  currentUser$ : Observable<CurrentUser>;
  apiRootUrl$: Observable<string>;
  
  constructor(private store: Store<State>) {
    this.interpretations$ = this.store.select(getAllInterpretations);
    this.currentUser$ = this.store.select(getCurrentUserDetails);
    this.apiRootUrl$ = this.store.select(getApiRootUrl);
   }

  ngOnInit() {
  }

}
