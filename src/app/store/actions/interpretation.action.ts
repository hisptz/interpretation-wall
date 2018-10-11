import { Action } from '@ngrx/store';
import { Update } from '@ngrx/entity'
import { ErrorMessage } from '../../models/error-message.model';
import { Interpretation } from '../../models/interpretation.model';

export enum InterpretationActionTypes{
    LoadInterpretation = '[Interpretation] Load Interpretation',
    LoadInterpretationSuccess = '[Interpretation] Load Interpretation success',
    LoadInterpretationFail = '[Interpretation] Load Interpretation Fail',
    DeleteInterpretation = '[Interpretation] Add interpretation',
    EditInterpretation = '[Interpretation] Edit Interpretation',
    DeleteInterpretationFail = '[Interpretation] Delete interpretation Fail',
    EditInterpretationFail = '[Interpretation] Edit Interpretation Fail',
    DeleteInterpretationSuccess = '[Interpretation] Delete interpretationSuccess',
    EditInterpretationSuccess = '[Interpretation] Edit Interpretation Success',
}
 
export class LoadInterpretation implements Action{
    readonly type = InterpretationActionTypes.LoadInterpretation;
    constructor(public payload: any){};
}

export class LoadInterpretationSuccess implements Action{
    readonly type = InterpretationActionTypes.LoadInterpretationSuccess;
    constructor(public payload: any){};
}

export class LoadInterpreationFail implements Action{
    readonly type = InterpretationActionTypes.LoadInterpretationFail;
    constructor(public error: any){};
}

export class DeleteInterpretation implements Action{
    readonly type = InterpretationActionTypes.DeleteInterpretation;
    constructor(public payload: any){}
}

export class EditInterpretation implements Action{
    readonly type = InterpretationActionTypes.EditInterpretation;
    constructor(public payload: any){}
}

export class DeleteInterpretationFail implements Action{
    readonly type = InterpretationActionTypes.DeleteInterpretationFail;
    constructor(public error : ErrorMessage){}
}

export class EditInterpretationFail implements Action{
    readonly type = InterpretationActionTypes.EditInterpretationFail;
    constructor(public error : ErrorMessage){}
}

export class DeleteInterpretationSuccess implements Action{
    readonly type = InterpretationActionTypes.DeleteInterpretationSuccess;
    constructor(public payload : any){}
}

export class EditInterpretationSuccess implements Action{
    readonly type = InterpretationActionTypes.EditInterpretationSuccess;
    constructor(public payload : {interpretation : Update<Interpretation>}){}
}

export type InterpretationAction =  
| LoadInterpretation 
| LoadInterpreationFail 
| LoadInterpretationSuccess 
| DeleteInterpretation 
| EditInterpretation 
| DeleteInterpretationFail 
| EditInterpretationFail
| DeleteInterpretationSuccess
| EditInterpretationSuccess ;