import { Action } from '@ngrx/store';
import { Update } from '@ngrx/entity'
import { ErrorMessage } from '../../models/error-message.model';
import { Interpretation } from '../../models/interpretation.model';
import { Comment } from '../../models/interpretation-comment.model'

export enum InterpretationActionTypes{
    LoadInterpretation = '[Interpretation] Load Interpretation',
    LoadInterpretationSuccess = '[Interpretation] Load Interpretation success',
    LoadInterpretationFail = '[Interpretation] Load Interpretation fail',
    EditInterpretation = '[Interpretation] Edit Interpretation',
    EditInterpretationSuccess = '[Interpretation] Edit Interpretation success',
    EditInterpretationFail = '[Interpretation] Edit Interpretation fail',
    DeleteInterpretation = '[Interpretation] Add interpretation',   
    DeleteInterpretationSuccess = '[Interpretation] Delete success',
    DeleteInterpretationFail = '[Interpretation] Delete interpretation fail',
    LikeInterpretation = '[Interpretation] Like interpretation',
    LikeInterpretationSuccess = '[Interpretation] Like interpretation success',
    LikeInterprettaionFail = '[Interpretation] Like interpretation fail',
    PostInterpretationComment = '[Comment] Post comment',
    PostInterpretationCommentSuccess = '[Comment] Post comment success',
    PostInterpretationCommentFail = '[Comment] Post comment fail',
    EditInterpretationComment = '[Comment] Edit comment',
    EditInterpretationCommentSuccess = '[Comment] Edit comment success',
    EditInterpretationCommentFail = '[Comment] Edit comment fail',
    DeleteInterpretationComment = '[Comment] Delete comment',
    DeleteInterpretationCommentSuccess = '[Comment] Delete comment success',
    DeleteInterpretationCommentFail ='[Comment] Delete comment fail'

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
    constructor(public payload : {id : string}){}
}

export class EditInterpretationSuccess implements Action{
    readonly type = InterpretationActionTypes.EditInterpretationSuccess;
    constructor(public payload : {interpretation : Update<Interpretation>}){}
}

export class LikeInterpretation implements Action{
    readonly type = InterpretationActionTypes.LikeInterpretation;
    constructor(public intepretationId : string){}
}

export class LikeInterpretationSuccess implements Action{
    readonly type = InterpretationActionTypes.LikeInterpretationSuccess;
    constructor(public payload : {interpretation : Update<Interpretation>}){}
}

export class LikeInterpretationFail implements Action{
    readonly type = InterpretationActionTypes.LikeInterprettaionFail;
    constructor(public error : ErrorMessage){}
}

export class PostInterpretationComment implements Action{
    readonly type = InterpretationActionTypes.PostInterpretationComment;
    constructor(public interpretationId: string ,public payload : Comment){}
}

export class PostInterpretationCommentSuccess implements Action{
    readonly type = InterpretationActionTypes.PostInterpretationCommentSuccess;
    constructor(public payload : {interpretation : Update<Interpretation>}){}
}

export class PostInterpretationCommentFail implements Action{
    readonly type = InterpretationActionTypes.PostInterpretationCommentFail;
    constructor(public error: ErrorMessage){}
}

export class EditInterpretationComment implements Action{
    readonly type = InterpretationActionTypes.EditInterpretationComment;
    //needs both interpretationId and commentId
    constructor(public interpretation : Interpretation, public comment : Comment){}
}

export class EditInterpretationCommentSuccess implements Action {
    readonly type = InterpretationActionTypes.EditInterpretationCommentSuccess;
    constructor(public payload : {interpretation : Update<Interpretation>}){}
}

export class EditInterpretationCommentFail implements Action {
    readonly type = InterpretationActionTypes.EditInterpretationCommentFail;
    constructor(public error : ErrorMessage){}
}

export class DeleteInterpretationComment implements Action {
    readonly type = InterpretationActionTypes.DeleteInterpretationComment;
    constructor(public interpretation : Interpretation, public comment : Comment){}
}

export class DeleteInterpretationCommentSuccess implements Action{
    readonly type = InterpretationActionTypes.DeleteInterpretationCommentSuccess;
    constructor(public payload : {interpretation : Update<Interpretation>}){}
}

export class DeleteInterpretationCommentFail implements Action{
    readonly type = InterpretationActionTypes.DeleteInterpretationCommentFail;
    constructor(public error : ErrorMessage){}
}

export type InterpretationAction =  
  LoadInterpretation 
| LoadInterpreationFail 
| LoadInterpretationSuccess 
| DeleteInterpretation
| DeleteInterpretationSuccess 
| DeleteInterpretationFail 
| EditInterpretation 
| EditInterpretationFail
| EditInterpretationSuccess 
| LikeInterpretation
| LikeInterpretationSuccess
| LikeInterpretationFail
| PostInterpretationComment
| PostInterpretationCommentSuccess
| PostInterpretationCommentFail
| EditInterpretationComment
| EditInterpretationCommentSuccess
| EditInterpretationCommentFail
| DeleteInterpretationComment
| DeleteInterpretationCommentSuccess
| DeleteInterpretationCommentFail