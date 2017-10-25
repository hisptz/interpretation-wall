import {Injectable} from '@angular/core';
import {Actions, Effect} from '@ngrx/effects';
import * as fromInterpretationAction from '../actions/interpretation.action';
import * as fromInterpretation from '../reducers/interpretation.reducer';
import * as fromSystemInfoAction from '../actions/system-info.action';
import 'rxjs/add/operator/switchMap';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import 'rxjs/add/observable/of';
import {HttpClientService} from '../services/http-client.service';
import {Observable} from 'rxjs/Observable';
import * as fromNotificationAction from '../actions/notification.action';


@Injectable()
export class InterpretationEffect {

  @Effect() currentUserLoaded$ = this.actions$
    .ofType(fromSystemInfoAction.SYSTEM_INFO_LOADED)
    .switchMap((action: any) => Observable.of(action.payload.apiRootUrl))
    .map((rootUrl: string) => new fromInterpretationAction.LoadInterpretation(rootUrl));

  @Effect() loadInterpretation$ = this.actions$
    .ofType(fromInterpretationAction.LOAD_INTERPRETATIONS)
    .switchMap((action: any) => this.getInterpretations(action.payload))
    .map((interpretations: fromInterpretation.State[]) => new fromInterpretationAction.InterpretationLoaded(interpretations))
    .catch((errorNotification: any) => Observable.of(new fromNotificationAction.NotificationUpdate(errorNotification)));

  constructor (
    private actions$: Actions,
    private httpClient: HttpClientService
  ) {}

  getInterpretations(rootUrl) {
    return new Observable(observer => {
      this.httpClient.get(`${rootUrl}interpretations.json?fields=id,type,text,created,likes,likedBy[id,name],
      user[id,name,displayName],comments[id,created,lastUpdated,text,user[id,name,displayName]],eventReport
      [id,name,relativePeriods],eventChart[id,name,relativePeriods],chart[id,name,relativePeriods],map[id,name,mapViews
      [relativePeriods]],reportTable[id,name,relativePeriods]&paging=false`)
        .subscribe((response: any) => {
          observer.next(response.interpretations);
          observer.complete();
        }, (error) => observer.error(error));
    });
  }
}
