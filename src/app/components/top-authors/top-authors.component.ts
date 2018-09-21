import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { State } from '../../store';
import { Observable } from 'rxjs';
import { getTopAuthors } from '../../store/selectors/users.selector';

@Component({
  selector: 'app-top-authors',
  templateUrl: './top-authors.component.html',
  styleUrls: ['./top-authors.component.css']
})
export class TopAuthorsComponent implements OnInit {
  topAuthors$ : Observable<any[]>;
  constructor(private store: Store<State>) { 
    this.topAuthors$ = this.store.select(getTopAuthors)
  }

  ngOnInit() {
  }

}
