import { Component, OnInit } from '@angular/core';
import {Store} from '@ngrx/store';
import * as fromRoot from '../../app.reducers';
import * as fromInterpretation from '../../reducers/interpretation.reducer';
import * as fromInterpretationSelector from '../../selectors/interpretation.selector';
import * as fromCurrentUserSelector from '../../selectors/current-user.selector';
import * as fromCurrentUser from '../../reducers/current-user.reducer';
import * as fromSystemInfoSelector from '../../selectors/system-info.selector';
import {Observable} from 'rxjs/Observable';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  interpretations$: Observable<fromInterpretation.State[]>;
  currentUser$: Observable<fromCurrentUser.State>;
  apiRootUrl$: Observable<string>;
  constructor(
    private store: Store<fromRoot.State>
  ) {
    this.interpretations$ = store.select(fromInterpretationSelector.getInterpretations);
    this.currentUser$ = store.select(fromCurrentUserSelector.getCurrentUser);
    this.apiRootUrl$ = store.select(fromSystemInfoSelector.getApiRootUrl);
  }

  ngOnInit() {
  }

}
