import * as fromCurrentUserAction from '../actions/current-user.action';
export interface State {
  id: string;
  name: string;
  displayName: string;
  email: string;
  created: string;
  lastUpdated: string;
  dataViewOrganisationUnits: any[];
  userCredentials: any;
}

export function currentUserReducer (state: State = null, action: any) {
  switch (action.type) {
    case fromCurrentUserAction.CURRENT_USER_LOADED:
      return {...action.payload};
    default:
      return state;
  }
}
