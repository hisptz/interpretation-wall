import {Component, ElementRef, OnInit} from '@angular/core';
import {Store} from '@ngrx/store';
import * as fromRoot from '../../app.reducers';
import * as fromInterpretation from '../../reducers/interpretation.reducer';
import * as fromInterpretationSelector from '../../selectors/interpretation.selector';
import * as fromCurrentUserSelector from '../../selectors/current-user.selector';
import * as fromCurrentUser from '../../reducers/current-user.reducer';
import * as fromSystemInfoSelector from '../../selectors/system-info.selector';
import {Observable} from 'rxjs/Observable';
import {getApiRootUrl} from "../../selectors/system-info.selector";
import {Http} from "@angular/http";
import {TopInterpretstionsService} from "../../services/top-interpretstions.service";

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  interpretations$: Observable<fromInterpretation.State[]>;
  currentUser$: Observable<fromCurrentUser.State>;
  apiRootUrl$: Observable<string>;

  valuer:any = [];
  dropMenu:any;
  interpretationTops
  top5Authors:any;
  top5Commentors:any;
  top5Interpretors:any;



  constructor(
    private store: Store<fromRoot.State>, private topInterPretationsService:TopInterpretstionsService
  ) {
    this.interpretations$ = store.select(fromInterpretationSelector.getInterpretations);
    this.currentUser$ = store.select(fromCurrentUserSelector.getCurrentUser);
    this.apiRootUrl$ = store.select(fromSystemInfoSelector.getApiRootUrl);
  }

  ngOnInit() {
    this.getTopInterpretations();

  }


  getTopInterpretations(){
    let top5Authours = [];
    let top5Interpritations = [];
    let top5Commentator = [];
    this.topInterPretationsService.getInterpretationTopList().subscribe(response=>{
      this.interpretationTops = response.interpretations;

      this.interpretationTops.forEach((interpretations:any)=>{
        let intpret = {id:interpretations.id, type:interpretations.type, text:interpretations.text}
          top5Authours.push(interpretations.user);
        this.top5Authors= this.removeDuplicates(top5Authours,'id');
          top5Interpritations.push(intpret);
        this.top5Interpretors= this.removeDuplicates(top5Interpritations,'id');
        interpretations.comments.forEach((comment:any)=>{
            top5Commentator.push(comment.user)
          this.top5Commentors= this.removeDuplicates(top5Commentator,'id')
          //console.log("hello"+JSON.stringify(this.top5Commentors))
        })
      })
    })
  }


  removeDuplicates(originalArray, prop) {
  let newArray = [];
  let lookupObject  = {};

  for(var i in originalArray) {
    lookupObject[originalArray[i][prop]] = originalArray[i];
  }
  for(i in lookupObject) {
    newArray.push(lookupObject[i]);
  }
  return newArray;
}


  homeButtonClicked(){
    window.location.href='./index.html'
  }

  getSelectedInterpretation(interpretation){

    this.topInterPretationsService.fetchInterpretation(interpretation).subscribe(response =>{
      console.log("the interPretation is :"+JSON.stringify(response))
    });
  }

  getSelectedAuthor(author){
    this.topInterPretationsService.fetchAuthor(author).subscribe(response =>{
      console.log("the author info is :"+JSON.stringify(response))
    });
  }

  getSelectedCommentor(commentor){
    this.topInterPretationsService.fetchCommentor(commentor).subscribe(response =>{
      console.log("the comment details are :"+JSON.stringify(response))
    });
  }






}
