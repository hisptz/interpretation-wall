import * as fromRoot from '../app.reducers';
import * as fromInterpretation from '../reducers/interpretation.reducer';
import {createSelector} from '@ngrx/store';

const interpretations = (state: fromRoot.State) => state.interpretations;

export const getInterpretations = createSelector(interpretations, (interpretation: fromInterpretation.State[]) => interpretation);
