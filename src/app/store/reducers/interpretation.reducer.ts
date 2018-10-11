import {
    EntityAdapter,
    EntityState,
    createEntityAdapter
} from '@ngrx/entity';

import { InterpretationAction, InterpretationActionTypes } from '../actions/interpretation.action';
import { Interpretation } from '../../models/interpretation.model'
export interface InterpretationState extends EntityState<Interpretation>{
    loadingInterpretation: boolean;
    loadedInterpretation: boolean;
    hasError : boolean;
    error: any;
    deletingInterpretation : boolean;
    deletedInterpretation : boolean;
    editingInterpretation: boolean;
    editedInterpretation : boolean;
    likingInterpretation : boolean;
    likedInterpretation : boolean;
    deletingInterpretationComment : boolean;
    deletedInterpretationComment : boolean;
    editingInterpretationComment : boolean;
    editedInterpretationComment : boolean;
}
export const adapter : EntityAdapter<Interpretation> = createEntityAdapter<Interpretation>();

export const initialState: InterpretationState = adapter.getInitialState({
    loadedInterpretation: false,
    loadingInterpretation: false,
    hasError : false,
    error: null,
    deletingInterpretation : false,
    deletedInterpretation : false,
    editingInterpretation: false,
    editedInterpretation : false,
    likingInterpretation : false,
    likedInterpretation : false,
    deletingInterpretationComment : false,
    deletedInterpretationComment : false,
    editingInterpretationComment : false,
    editedInterpretationComment : false    

})

export function interpretationReducer(
    state = initialState,
    action : InterpretationAction
){
    switch(action.type){
        case InterpretationActionTypes.LoadInterpretation: 
        return {
            ...state,
            loadingInterpretation: true,
            loadedInterpretation: false,
            hasError : false,
            error: null,
        };

        case InterpretationActionTypes.LoadInterpretationFail: 
        return {
            ...state,
            loadingInterpretation: false,
            loadedInterpretation: false,
            hasError : true,
            error: action.error
        }

        case InterpretationActionTypes.LoadInterpretationSuccess: 
        return adapter.addAll(action.payload, {
            ...state,
            loadingInterpretation: false,
            loadedInterpretation: true,
            hasError : false,
            error: null
        });

        case  InterpretationActionTypes.DeleteInterpretation: 
        return{
            ...state,
            deletedInterpretation : false,
            deletingInterpretation : true,
            hasError : false,
            error : null
        };

        case InterpretationActionTypes.DeleteInterpretationFail: 
        return{
            ...state,
            deletedInterpretation : false,
            deletingInterpretation : false,
            hasError : true,
            error : action.error
        };

        case InterpretationActionTypes.DeleteInterpretationSuccess: 
        return adapter.removeOne(action.payload.id, {
            ...state,
            deletedInterpretation : true,
            deletingInterpretation : false,
            hasError : false,
            error : null
        });

        case  InterpretationActionTypes.EditInterpretation: 
        return{
            ...state,
            editedInterpretation : false,
            editingInterpretation : true,
            hasError : false,
            error : null
        };

        case InterpretationActionTypes.EditInterpretationFail: 
        return{
            ...state,
            editedInterpretation : false,
            editingInterpretation : false,
            hasError : true,
            error : action.error
        };

        case InterpretationActionTypes.EditInterpretationSuccess: 
        return adapter.updateOne(action.payload.interpretation, {
            ...state,
            editedInterpretation : true,
            editingInterpretation : false,
            harError : false,
            error : null
        });

        default: return state
    }

}

export const {
    selectIds: selectInterpretationIds,
    selectEntities: selectInterpretationEntities,
    selectAll: selectAllInterpretations
 } = adapter.getSelectors(); 

 export const getInterpretationLoadingState = (state : InterpretationState) => state. loadingInterpretation;
 export const getInterpretationLoadedState = (state : InterpretationState) => state. loadedInterpretation;
 export const getInterpretationErrorState = (state : InterpretationState) => state.error;
 export const getInterpretationDeletingState = (state : InterpretationState) => state. deletingInterpretation;
 export const getInterpretationDeletedState = (state : InterpretationState) => state. deletedInterpretation;
 export const getInterpretationEditingState = (state : InterpretationState) => state. editingInterpretation;
 export const getInterpretationEditedState = (state : InterpretationState) => state. editedInterpretation;

 