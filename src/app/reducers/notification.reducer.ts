import * as fromNotificationAction from '../actions/notification.action';
export interface State {
  status: number;
  body: any;
}

export function notificationReducer (state: State = null, action: any) {
  switch (action.type) {
    case fromNotificationAction.NOTIFICATION_UPDATE:
      return {...action.payload};
    default:
      return state;
  }
}
