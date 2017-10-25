import {Action} from '@ngrx/store';
import * as fromNotification from '../reducers/notification.reducer';

export const NOTIFICATION_UPDATE = 'NOTIFICATION_UPDATE';

export class NotificationUpdate implements Action {
  readonly type = NOTIFICATION_UPDATE;
  constructor( public payload: fromNotification.State) {}
}

/**
 * Export a type alias of all actions in this action group
 * so that reducers can easily compose action types
 */
export type NotificationActions = NotificationUpdate;
