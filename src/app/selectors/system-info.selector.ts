import * as fromRoot from '../app.reducers';
import * as fromSystemInfo from '../reducers/system-info.reducer';
import {createSelector} from '@ngrx/store';

const systemInfo = (state: fromRoot.State) => state.systemInfo;

export const getApiRootUrl = createSelector(systemInfo, (systemInfoObject: fromSystemInfo.State) => systemInfoObject.apiRootUrl);
