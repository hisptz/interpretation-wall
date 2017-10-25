import {Action} from '@ngrx/store';

export const LOAD_INTERPRETATIONS = 'LOAD_INTERPRETATIONS';
export const INTERPRETATION_LOADED = 'INTERPRETATION_LOADED';

export class LoadInterpretation implements Action {
  readonly type = LOAD_INTERPRETATIONS;
  constructor(public payload: string) {}
}

export class InterpretationLoaded implements Action {
  readonly type = INTERPRETATION_LOADED;
  constructor(public payload: any[]) {}
}
