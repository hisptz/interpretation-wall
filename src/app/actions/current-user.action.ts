import {Action} from '@ngrx/store';
import * as fromCurrentUser from '../reducers/current-user.reducer';

export const CURRENT_USER_LOADED = 'CURRENT_USER_LOADED';

export class CurrentUserLoaded implements Action {
  readonly type = CURRENT_USER_LOADED;

  constructor(public payload: fromCurrentUser.State) {
  }
}

/**
 * Export a type alias of all actions in this action group
 * so that reducers can easily compose action types
 */
export type CurrentUserActions = CurrentUserLoaded;
