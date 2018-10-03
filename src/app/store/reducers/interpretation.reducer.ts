import {
    EntityAdapter,
    EntityState,
    createEntityAdapter
} from '@ngrx/entity';

import { InterpretationAction, InterpretationActionTypes } from '../actions/interpretation.action';
import { Interpretation } from '../../models/interpretation.model'
import { InitialState } from '@ngrx/store/src/models';
export interface InterpretationState extends EntityState<Interpretation>{
    loading: boolean;
    loaded: boolean;
    error: any;
    deleting : boolean;
    deleted : boolean;
    editing: boolean;
    edited : boolean;
}
export const adapter : EntityAdapter<Interpretation> = createEntityAdapter<Interpretation>();

export const initialState: InterpretationState = adapter.getInitialState({
    loaded: false,
    loading: false,
    error: null,
    deleting : false,
    deleted : false,
    editing: false,
    edited : false
})

export function interpretationReducer(
    state = initialState,
    action : InterpretationAction
){
    switch(action.type){
        case InterpretationActionTypes.LoadInterpretation: 
        return {
            ...state,
            loading: true,
            loaded: false,
            error: null,
        };

        case InterpretationActionTypes.LoadInterpretationFail: 
        return {
            ...state,
            loading: false,
            loaded: false,
            error: action.error
        }

        case InterpretationActionTypes.LoadInterpretationSuccess: 
        return adapter.addAll(action.payload, {
            ...state,
            loading: false,
            loaded: true,
            error: null
        });

        case  InterpretationActionTypes.DeleteInterpretation: 
        return{
            ...state,
            deleted : false,
            deleting : true,
            error : null
        };

        case InterpretationActionTypes.DeleteInterpretationFail: 
        return{
            ...state,
            deleted : false,
            deleting : false,
            error : action.error
        };

        case InterpretationActionTypes.DeleteInterpretationSuccess: 
        return adapter.removeOne(action.payload.id, {
            ...state,
            deleted : false,
            deleting : true,
            error : null
        });

        case  InterpretationActionTypes.EditInterpretation: 
        return{
            ...state,
            edited : false,
            editing : true,
            error : null
        };

        case InterpretationActionTypes.EditInterpretationFail: 
        return{
            ...state,
            edited : false,
            editing : false,
            error : action.error
        };

        case InterpretationActionTypes.EditInterpretationSuccess: 
        return adapter.updateOne(action.payload, {
            ...state,
            edited : false,
            editing : true,
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

 export const getInterpretationLoadingState = (state : InterpretationState) => state. loading;
 export const getInterpretationLoadedState = (state : InterpretationState) => state. loaded;
 export const getINterpretationErrorState = (state : InterpretationState) => state.error;
 export const getInterpretationDeletingState = (state : InterpretationState) => state. loading;
 export const getInterpretationDeletedState = (state : InterpretationState) => state. loading;
 export const getInterpretationEditingState = (state : InterpretationState) => state. loading;
 export const getInterpretationEditedgState = (state : InterpretationState) => state. loading;

 