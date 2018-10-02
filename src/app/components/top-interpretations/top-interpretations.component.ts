import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';

import { State, getTopInterpetations } from '../../store';

@Component({
  selector: 'app-top-interpretations',
  templateUrl: './top-interpretations.component.html',
  styleUrls: ['./top-interpretations.component.css']
})
export class TopInterpretationsComponent implements OnInit {
  topInterpretations$ : Observable<any>
  constructor(private store: Store<State>) {
    this.topInterpretations$ = this.store.select(getTopInterpetations)
   }
  
  ngOnInit() {
  }

  viewInterpretation(id : string){
    //call method to view in ful screen
    console.log('SelectedIinterpretationId:',id);
  }

}
