import * as fromSystemInfoAction from '../actions/system-info.action';
/**
 * System info model
 */
export interface State {
  rootUrl: string;
  apiRootUrl: string;
  currentVersion: number;
  maxSupportedVersion: number;
  minSupportedVersion: number;
}

/**
 * System info initial details
 * @type {{rootUrl: any; apiRootUrl: any; currentVersion: number; maxSupportedVersion: number; minSupportedVersion: number; loaded: boolean}}
 */
export const INITIAL_SYSTEM_INFO: State = {
  rootUrl: undefined,
  apiRootUrl: undefined,
  currentVersion: 2.25,
  maxSupportedVersion: 2.25,
  minSupportedVersion: 2.18,
};


/**
 * System info reducers
 * @param {State} state
 * @param action
 * @returns {State}
 */
export function systemInfoReducer(state: State = INITIAL_SYSTEM_INFO, action: any) {
  switch (action.type) {
    case fromSystemInfoAction.SYSTEM_INFO_LOADED:
      return {...action.payload};
    default:
      return state;
  }
}
