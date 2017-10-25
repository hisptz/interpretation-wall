import {Injectable} from '@angular/core';
import {HttpClientService} from '../services/http-client.service';
import {Actions, Effect} from '@ngrx/effects';
import {Observable} from 'rxjs/Observable';
import {Action} from '@ngrx/store';
import * as fromSystemInfoAction from '../actions/system-info.action';
import * as fromCurrentUserAction from '../actions/current-user.action';
import * as fromCurrentUser from '../reducers/current-user.reducer';
import * as fromNotificationAction from '../actions/notification.action';
import 'rxjs/add/operator/switchMap';

@Injectable()
export class CurrentUserEffect {
  @Effect() currentUser: Observable<Action> = this.actions$
    .ofType(fromSystemInfoAction.SYSTEM_INFO_LOADED)
    .switchMap((action: any) => new Observable(observer => {
      const rootUrl = action.payload.apiRootUrl;
      this.httpClient.get(rootUrl + 'me.json?fields=id,name,displayName,created,lastUpdated,email,' +
        'dataViewOrganisationUnits[id,name,level],userCredentials[username]')
        .subscribe((currentUser: fromCurrentUser.State) => {
          observer.next(currentUser);
          observer.complete();
        }, (currentUserError) => observer.error(currentUserError));
    }))
    .map((currentUser: fromCurrentUser.State) => new fromCurrentUserAction.CurrentUserLoaded(currentUser))
    .catch((errorNotification: any) => Observable.of(new fromNotificationAction.NotificationUpdate(errorNotification)));

  constructor(private httpClient: HttpClientService,
              private actions$: Actions) {

  }
}
