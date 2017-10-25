import {ActionReducerMap, MetaReducer} from '@ngrx/store';
import * as fromRouterReducer from '@ngrx/router-store';
import {environment} from '../environments/environment';
import {RouterReducerState} from '@ngrx/router-store';
import * as fromSystemInfoReducer from './reducers/system-info.reducer';
import * as fromNotificationReducer from './reducers/notification.reducer';
import * as fromCurrentUserReducer from './reducers/current-user.reducer';
import {storeFreeze} from 'ngrx-store-freeze';


/**
 * Application interface
 */
export interface State {
  routes: RouterReducerState;
  systemInfo: fromSystemInfoReducer.State;
  notification: fromNotificationReducer.State;
  currentUser: fromCurrentUserReducer.State;
}

export const reducers: ActionReducerMap<State> = {
  routes: fromRouterReducer.routerReducer,
  systemInfo: fromSystemInfoReducer.systemInfoReducer,
  notification: fromNotificationReducer.notificationReducer,
  currentUser: fromCurrentUserReducer.currentUserReducer
};


export const metaReducers: MetaReducer<State>[] = !environment.production ? [storeFreeze] : [];
