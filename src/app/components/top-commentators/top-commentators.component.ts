import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { Store } from '@ngrx/store';
import { State } from '../../store';
import { getTopComentators } from '../../store/selectors/users.selector';

@Component({
  selector: 'app-top-commentators',
  templateUrl: './top-commentators.component.html',
  styleUrls: ['./top-commentators.component.css']
})
export class TopCommentatorsComponent implements OnInit {
  topCommentators$: Observable<any>
  constructor(private store: Store<State>) {
    this.topCommentators$ = this.store.select(getTopComentators)
   }

  ngOnInit() {
  }

}
