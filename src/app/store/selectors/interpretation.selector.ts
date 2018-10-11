import { createSelector } from '@ngrx/store';
import * as _ from 'lodash';

import { getRootState, State } from '../reducers';
import { Comment } from '../../models/interpretation-comment.model';
import { Interpretation } from '../../models/interpretation.model';

import * as fromInterpretation from '../reducers/interpretation.reducer';

export const getInterpretationState = createSelector(
    getRootState, (state: State) => state.interpretations
)

export const getAllInterpretations = createSelector(getInterpretationState, fromInterpretation.selectAllInterpretations);

export const getInterpretationLoadedStatus =  createSelector(getInterpretationState, fromInterpretation.getInterpretationLoadedState);
export const getInterpretationEditingStatus = createSelector(getInterpretationState, fromInterpretation.getInterpretationEditingState);
export const getInterpretationEditedStatus = createSelector(getInterpretationState, fromInterpretation.getInterpretationEditedState);
export const getInterpretationDeletingtingStatus = createSelector(getInterpretationState, fromInterpretation.getInterpretationDeletingState);
export const getInterpretationDeletedtingStatus = createSelector(getInterpretationState, fromInterpretation.getInterpretationDeletedState);
export const getInterpretationLikingStatus = createSelector(getInterpretationState, fromInterpretation.getInterpretationLikingState);
export const getInterpretationLikedStatus = createSelector(getInterpretationState, fromInterpretation.getInterpretationLikedState);
export const getCommentEditingStatus = createSelector(getInterpretationState, fromInterpretation.getCommentEditingState);
export const getCommentEditedStatus = createSelector(getInterpretationState, fromInterpretation.getCommentEditedState);
export const getCommentDeletingStatus = createSelector(getInterpretationState, fromInterpretation.getCommentDeletingState);
export const getCommentDeletedStatus = createSelector(getInterpretationState, fromInterpretation.getCommentDeletedState);
export const getCommentPostingStatus = createSelector(getInterpretationState, fromInterpretation.getCommentPostingState);
export const getCommentPostedStatus = createSelector(getInterpretationState, fromInterpretation.getCommentPostedState);

export const getAllComments = createSelector(
    getAllInterpretations,
    (interpretations: Interpretation[]) =>{
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
    (interpretations : Interpretation[]) => {
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