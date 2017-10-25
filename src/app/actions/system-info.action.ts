import {Action} from '@ngrx/store';
import * as fromSystemInfo from '../reducers/system-info.reducer';

export const LOAD_SYSTEM_INFO = 'LOAD_SYSTEM_INFO';
export const SYSTEM_INFO_LOADED = 'SYSTEM_INFO_LOADED';

export class LoadSystemInfo implements Action {
  readonly type = LOAD_SYSTEM_INFO;
}

export class SystemInfoLoaded implements Action {
  readonly type = SYSTEM_INFO_LOADED;

  constructor( public payload: fromSystemInfo.State) {}
}


/**
 * Export a type alias of all actions in this action group
 * so that reducers can easily compose action types
 */
export type SystemInfoActions = LoadSystemInfo | SystemInfoLoaded;
