import { createSelector } from '@ngrx/store';
import * as _ from 'lodash';

import { getRootState, State } from '../reducers';
import { getUsers } from '../reducers/users.reducer'
import { getAllInterpretations, getAllComments } from './interpretation.selector';
import { User } from '../../models/users.model';
import { Interpretation } from '../../models/interpretation.model';
import { Comment } from '../../models/interpretation-comment.model';

export const getUserState = createSelector(
    getRootState, (state : State) => state.users
);

export const getAllUsers = createSelector( getUserState, getUsers)

export const getTopAuthors = createSelector(
    getAllUsers,
     getAllInterpretations, 
     (users: User[], interpretations: Interpretation) =>{
         let rankedAuthorsList : Array<{ id : string,name : string, interpretationCounts : number}> = [ ]
        interpretations.map((interpretation: any) => {
            users.map( user => {
                if(user.id === interpretation.user.id){
                    if(_.some(rankedAuthorsList, {id : user.id})){
                        let alreadExistingAuthor = _.find(rankedAuthorsList, {id : user.id});
                        ++alreadExistingAuthor.interpretationCounts;
                    }else{
                        let newAuthor = {
                            id : user.id,
                            name : user.name,
                            interpretationCounts : 1
                        }
                        rankedAuthorsList.push(newAuthor)
                    }
                    }
                }) 
        } )
        rankedAuthorsList = _.reverse(_.sortBy(rankedAuthorsList, ['interpretationCounts']))
        return _.slice(rankedAuthorsList, 0 , 5);
     }
      );

export const getTopComentators = createSelector(
    getAllUsers,
    getAllComments,
    (users: User[], comments: Comment[]) => {
        let rankedCommentatorsList: Array<{ id : string,name : string, commentCounts : number}> = []
        comments.map((comment) =>{
            console.log(comment);
            users.map( (user) => {
                if(user.id === comment.user.id){
                    if(_.some(rankedCommentatorsList, {id : user.id})){
                        let alreadExistingCommntator = _.find(rankedCommentatorsList, {id : user.id});
                        ++alreadExistingCommntator.commentCounts;
                    }else{
                        let newCommentator = {
                            id : user.id,
                            name : user.name,
                            commentCounts : 1
                        }
                        rankedCommentatorsList.push(newCommentator)
                    }
                }
            })
        })

        rankedCommentatorsList = _.reverse(_.sortBy(rankedCommentatorsList, ['commentCounts']))
        return _.slice(rankedCommentatorsList, 0 , 5);
    }
)
      