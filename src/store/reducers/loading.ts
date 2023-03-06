import DEF from "../stateDef";

const initialState: true[] = [];

export default function reducer(state = initialState, action: LoadingAction) {
  switch (action.type) {
    case DEF.LOADING_SHOW:
      initialState.push(true);
      return [...initialState];
    case DEF.LOADING_DISMISS:
      initialState.pop();
      return [...initialState];
    case DEF.LOADING_CLEAR:
      return [];
    default:
      return state;
  }
}

export type LoadingActionType =
  | "LOADING_SHOW"
  | "LOADING_DISMISS"
  | "LOADING_CLEAR";

export interface LoadingAction {
  type: LoadingActionType;
}
