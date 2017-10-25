import {Injectable} from '@angular/core';
import {HttpClientService} from '../services/http-client.service';
import {Actions, Effect} from '@ngrx/effects';
import * as fromSystemInfoAction from '../actions/system-info.action';
import * as fromSystemInfo from '../reducers/system-info.reducer';
import * as fromNotificationAction from '../actions/notification.action';
import 'rxjs/add/operator/switchMap';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import 'rxjs/add/observable/of';
import {Observable} from 'rxjs/Observable';
import {Action} from '@ngrx/store';

@Injectable()
export class SystemInfoEffect {

  @Effect() systemInfo: Observable<Action> = this.actions$
    .ofType(fromSystemInfoAction.LOAD_SYSTEM_INFO)
    .switchMap((action) => new Observable(observer => {

      /**
       * Get base url from manifest file
       */
      this.httpClient.get('manifest.webapp').subscribe((manifestDetails: any) => {
        let rootUrl = '';
        try {
          if (manifestDetails.activities.dhis.href) {
            rootUrl = manifestDetails.activities.dhis.href;
          } else {
            rootUrl = '../../../';
          }
        } catch (e) {
          console.warn('Base url cannot be determined, make sure you have set it correctly in the manifest.webapp file' +
            '. Default url is used and may likely cause problems');
          rootUrl = '../../../';
        }

        /**
         * Get system 'information
         */
        this.httpClient.get(rootUrl + 'api/system/info')
          .subscribe((systemInfo: any) => {
            const initialSystemInfo: fromSystemInfo.State = fromSystemInfo.INITIAL_SYSTEM_INFO;
            observer.next({
              rootUrl: rootUrl,
              apiRootUrl: this._getApiRootUrl(rootUrl + 'api/', systemInfo.version, initialSystemInfo.maxSupportedVersion),
              minSupportedVersion: initialSystemInfo.minSupportedVersion,
              maxSupportedVersion: initialSystemInfo.maxSupportedVersion,
              currentVersion: parseFloat(systemInfo.version)
            });
            observer.complete();
          }, systemInfoError => observer.error(systemInfoError));
      }, (manifestError => observer.error(manifestError)));
    }))
    .map((systemInfo: fromSystemInfo.State) => new fromSystemInfoAction.SystemInfoLoaded(systemInfo))
    .catch((errorNotification: any) => Observable.of(new fromNotificationAction.NotificationUpdate(errorNotification)));

  constructor(private httpClient: HttpClientService,
              private actions$: Actions) {

  }

  private _getApiRootUrl(url, currentVersion, maxSupportedVersion) {
    let initialApiVersion = url;

    if (currentVersion > 2.24) {
      initialApiVersion += currentVersion > maxSupportedVersion ? this._getVersionDecimalPart(maxSupportedVersion) + '/' :
        this._getVersionDecimalPart(currentVersion) + '/';
    }

    return initialApiVersion;
  }

  private _getVersionDecimalPart(version: number) {
    return version.toString().split('.')[1];
  }

}
