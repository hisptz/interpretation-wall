import * as fromRoot from '../app.reducers';
import * as fromCurrentUser from '../reducers/current-user.reducer';
import {createSelector} from '@ngrx/store';

const currentUser = (state: fromRoot.State) => state.currentUser;

export const getCurrentUser = createSelector(currentUser, (currentUserInfo: fromCurrentUser.State) => currentUserInfo);
