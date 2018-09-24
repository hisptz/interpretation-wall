import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store'; 
import { Observable } from 'rxjs';
import { Interpretation } from '../../models/interpretation.model';
import { CurrentUser } from '../../models/current-user.model';

import { getAllInterpretations, getCurrentUserDetails, getApiRootUrl } from '../../store';
import { getInterpretationLoadedStatus } from '../../store/selectors/interpretation.selector'
import { State } from '../../store/reducers';
import { LoadSystemInfo } from '../../store/actions';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  interpretations$ : Observable<Interpretation>;
  currentUser$ : Observable<CurrentUser>;
  apiRootUrl$: Observable<string>;
  interpretationLoadedStatus$: Observable<boolean>;
  topAuthors$ : Observable<any>;

  constructor(private store: Store<State>) {
    this.interpretations$ = this.store.select(getAllInterpretations);
    this.currentUser$ = this.store.select(getCurrentUserDetails);
    this.apiRootUrl$ = this.store.select(getApiRootUrl);
    this.interpretationLoadedStatus$ = this.store.select(getInterpretationLoadedStatus);
   }

  ngOnInit() {
    this.store.dispatch(new LoadSystemInfo());
  }

  //for searching interpretations
  onInterpretationSearch(e){
    let matchedInterpretationLimitCount = 5;
    let regExp = e.target.value.toLowerCase();
    let matchedInterpretation : Array<Interpretation> = [];
    
    this.interpretations$.subscribe((interpretations)=>{ interpretations.map( (interpretation) =>{
        regExp = new RegExp(regExp, 'i');
        if(regExp.test(interpretation.text)){
          matchedInterpretation.push(interpretation)
        }
      }) 
    })
    if(matchedInterpretation.length > 0){
      console.log(matchedInterpretation)
    }else{
      console.log('No match')
    }
   }  
}
