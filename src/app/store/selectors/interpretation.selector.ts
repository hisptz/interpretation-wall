import { createSelector } from '@ngrx/store';
import * as _ from 'lodash';

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
                const comments = _.filter(interpretation.comments, (comment)=>{return comment.id});
                comments.map((comment) => { 
                    interpretationsComments.push(comment);
                })
            }
        )
        return interpretationsComments;
    }

)

export const getTopInterpetations = createSelector(
    getAllInterpretations,
    (interpretations : Interpretation) => {
        let rankedInterpretation : Array<{id : string, text: string, user : {id: string, name : string, displayName: string},commentCounts: number}> = [];
        interpretations.map(
            (interpretation) => {
                let countedComments = 0;
                const comments = _.filter(interpretation.comments, (comment)=>{return comment.id});
                comments.map( () =>{
                    ++countedComments
                })
                const addedInterpretation = {id: interpretation.id,text : interpretation.text, user : interpretation.user, commentCounts: countedComments}
                rankedInterpretation = [...rankedInterpretation, addedInterpretation] 
            }
        )

        rankedInterpretation = _.reverse(_.sortBy(rankedInterpretation, ['commentCounts']))
        return _.slice(rankedInterpretation, 0 , 5);
    }
)