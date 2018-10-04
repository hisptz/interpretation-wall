import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {InterpretationService} from '../../services/interpretation.service';
import { Store } from '@ngrx/store';
import { State, EditInterpretation } from '../../../../store';

@Component({
  selector: 'app-edit-interpretation',
  templateUrl: './edit-interpretation.component.html',
  styleUrls: ['./edit-interpretation.component.css']
})
export class EditInterpretationComponent implements OnInit {
  @Input() rootUrl: string;
  @Output() onInterpretationEdit: EventEmitter<any> = new EventEmitter<any>();
  @Output() onCancelInterpretationEdit =new  EventEmitter<boolean>() 
  @Input() interpretation: any;
  creating: boolean;
  constructor( private store : Store<State>) {
    this.creating = false;
  }


  ngOnInit() {
  }

  editInterpretation(e) {
    e.stopPropagation();
    //console.log(this.interpretation)
    this.store.dispatch(new EditInterpretation(this.interpretation))
    // this.creating = true;
    // this.interpretationService.edit(this.interpretation, this.rootUrl)
    //   .subscribe((interpretation: any) => {
    //     this.creating = false;
    //     this.onInterpretationEdit.emit(interpretation);
    //   }, error => console.log(error))
  }

  cancel(e) {
    e.stopPropagation();
    this.onCancelInterpretationEdit.emit(true);
  }

}
