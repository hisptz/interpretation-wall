import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import { Store } from '@ngrx/store';
import { State, EditInterpretation } from '../../../../store';
import { getInterpretationEditingStatus } from '../../../../store/selectors/interpretation.selector'
import { Observable } from 'rxjs';
import { InterpretationService } from '../../services/interpretation.service';

@Component({
  selector: 'app-edit-interpretation',
  templateUrl: './edit-interpretation.component.html',
  styleUrls: ['./edit-interpretation.component.css']
})
export class EditInterpretationComponent implements OnInit {
  @Input() rootUrl: string;
  @Output() onInterpretationEdit: EventEmitter<any> = new EventEmitter<any>();
  @Output() onCancelInterpretationEdit =new  EventEmitter<any>() 
  @Input() interpretation: any;
  editing$ : Observable<boolean>;
  creating = false;
  constructor( private store : Store<State>, private interpretationService : InterpretationService) {
    this.editing$ = this.store.select(getInterpretationEditingStatus);
  }


  ngOnInit() {
  }c

  // editInterpretation(e) {
  //   e.stopPropagation();
  //   //console.log(this.interpretation)
  //   this.creating = true;
  //   this.interpretationService.edit(this.interpretation)
  //     .subscribe((interpretation: any) => {
  //       this.creating = false;
  //       this.onInterpretationEdit.emit(interpretation);
  //     }, error => console.log(error))
  // }

  cancel(e) {
    e.stopPropagation();
    this.onCancelInterpretationEdit.emit(this.interpretation);
  }

  editInterpretation(e){
      this.creating = true;
      this.store.dispatch(new EditInterpretation(this.interpretation))
      this.onCancelInterpretationEdit.emit(this.interpretation);
  }

}
