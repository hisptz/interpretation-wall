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
EditInterpretationFail
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
        switchMap((action:any) => this.getInterpretations(action.payload.apiRootUrl).pipe(
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

getInterpretations(rootUrl) {
    return new Observable(observer =>  {
        this.httpService.get(`interpretations.json?fields=id,type,text,created,lastUpdated,likes,likedBy[id,name],user[id,name,displayName],comments[id,created,lastUpdated,text,user[id,name,displayName]],eventReport[*],eventChart[*],chart[*],map[id,name,mapViews[*]],reportTable[*]&paging=false`)
        .subscribe((response:any) =>  {
            observer.next(response.interpretations); 
            observer.complete(); 
        }, (error) => observer.error(error)); 
      }); 
    }
}
