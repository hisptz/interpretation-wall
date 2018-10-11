import {Injectable }from '@angular/core'; 
import {Actions, Effect, ofType }from '@ngrx/effects'; 
import {Observable, of }from 'rxjs'; 
import {catchError, map, switchMap, mergeMap }from 'rxjs/operators'; 

import {NgxDhis2HttpClientService }from '@hisptz/ngx-dhis2-http-client'; 

import { InterpretationService } from '.././../modules/interpretation/services/interpretation.service'
import {Interpretation }from '../../models/interpretation.model'; 
import {SystemInfoActionTypes }from '../actions/system-info.action'; 
import {LoadNotificationSuccess }from '../actions/notification.action'
import {
InterpretationActionTypes, 
LoadInterpreationFail, 
LoadInterpretationSuccess, 
LoadInterpretation,
DeleteInterpretationSuccess,
DeleteInterpretationFail,
EditInterpretationSuccess,
EditInterpretationFail,
PostInterpretationCommentSuccess,
PostInterpretationCommentFail,
EditInterpretationCommentSuccess,
EditInterpretationCommentFail,
DeleteInterpretationCommentSuccess,
DeleteInterpretationCommentFail
 }from '../actions/interpretation.action'; 
import { ErrorMessage } from '../../models/error-message.model';

@Injectable()
export class InterpretationEffect {

constructor(
private actions$:Actions,
private interpretationService : InterpretationService,
private httpService:NgxDhis2HttpClientService
) {}

@Effect()
currentUserLoaded$:Observable < any >  = this.actions$.pipe(
    ofType(SystemInfoActionTypes.LoadSystemInfoSuccess), 
        switchMap((action:any) => of(action.payload.apiRootUrl).pipe(
            map((rootUrl:string) => new LoadInterpretation(rootUrl)), 
            catchError((error:any) => of(new LoadInterpreationFail(error)))
)))

@Effect()loadInterpretation$ = this.actions$.pipe(
    ofType(InterpretationActionTypes.LoadInterpretation), 
        switchMap((action:any) => this.interpretationService.getInterpretations(action.payload.apiRootUrl).pipe(
            map((interpretations:Interpretation[]) => new LoadInterpretationSuccess(interpretations)), 
            catchError((errorNotification:any) => of(new LoadNotificationSuccess(errorNotification)))
)))

@Effect() deleteIntepretation$ = this.actions$.pipe(
    ofType(InterpretationActionTypes.DeleteInterpretation),
    mergeMap((action : any) => this.interpretationService.delete(action.payload).pipe(
       map( () => new DeleteInterpretationSuccess(action.payload)),
       catchError((error : ErrorMessage) => of(new DeleteInterpretationFail(error))
    ))
))

@Effect() editInterpretation$ = this.actions$.pipe(
    ofType(InterpretationActionTypes.EditInterpretation),
    mergeMap((action: any) => this.interpretationService.edit(action.payload).pipe(
        map(() => new EditInterpretationSuccess({interpretation : {id: action.payload.id, changes : action.payload}})),
        catchError((error : ErrorMessage) => of(new EditInterpretationFail(error)))
        ))
)

@Effect() postInterpretationComment$ = this.actions$.pipe(
    ofType(InterpretationActionTypes.PostInterpretationComment),
    mergeMap((action: any) => this.interpretationService.postInterpretationComment(action.interpretationId, action.payload).pipe(
        map((interpretation) => new PostInterpretationCommentSuccess({interpretation : {id : action.interpretationId, changes: interpretation}})),
        catchError((error : ErrorMessage) => of(new PostInterpretationCommentFail(error)))
    ))
)

@Effect() editInterpretationComment$ = this.actions$.pipe(
    ofType(InterpretationActionTypes.EditInterpretationComment),
    mergeMap((action : any) => this.interpretationService.editComment(action.interpretation, action.comment).pipe(
        map((interpretation) => new EditInterpretationCommentSuccess({interpretation : {id: action.interpretation.id, changes: action.comment}})),
        catchError((error : ErrorMessage) => of(new EditInterpretationCommentFail(error)))
    ))
)

@Effect() deleteInterpretationComment$ = this.actions$.pipe(
    ofType(InterpretationActionTypes.DeleteInterpretationComment),
    mergeMap((action : any)=> this.interpretationService.deleteComment(action.interpretation.id, action.comment.id).pipe(
        map(() => new DeleteInterpretationCommentSuccess(action.interpretation)),
        catchError((error : ErrorMessage) => of(new DeleteInterpretationCommentFail(error)))
    ))
)

}

