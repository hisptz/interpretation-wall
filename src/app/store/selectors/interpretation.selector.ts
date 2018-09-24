import { createSelector } from '@ngrx/store';
import { getRootState, State } from '../reducers';
import { Comment } from '../../models/interpretation-comment.model';
import { Interpretation } from '../../models/interpretation.model';

import { getInterpretations, getInterpretationLoaded } from '../reducers/interpretation.reducer';

export const getInterpretationState = createSelector(
    getRootState, (state: State) => state.interpretations
)

export const getAllInterpretations = createSelector(getInterpretationState, getInterpretations);

export const getInterpretationLoadedStatus =  createSelector(getInterpretationState, getInterpretationLoaded);

export const getAllComments = createSelector(
    getAllInterpretations,
    (interpretations: Interpretation) =>{
        let interpretationsComments: Comment[] = [];
        interpretations.map(
            (interpretation) => {
                interpretationsComments.push(interpretation.comments)
            }
        )
        return interpretationsComments;
    }

)