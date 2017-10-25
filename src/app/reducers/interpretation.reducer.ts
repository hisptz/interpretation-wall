import * as fromInterpretationAction from '../actions/interpretation.action';
export interface State {
  id: string;
  text: string;
  type: string;
  created: string;
  lastUpdated: string;
  likes: number;
  likedBy: Array<any>;
  comments: Array<{
    id: string;
    created: string;
    text: string;
    user: {
      id: string;
      name: string;
      displayName: string;
    }
  }>;
  eventReport: any;
  eventChart: any;
  chart: any;
  map: any;
  reportTable: any;
}

export function interpretationReducer (state: State[] = [], action: any) {
  switch (action.type) {
    case fromInterpretationAction.INTERPRETATION_LOADED:
      return [...action.payload];
    default:
      return state;
  }
}
