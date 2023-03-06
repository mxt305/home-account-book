import DEF from "../stateDef";

const initialState = false;

export default function reducer(state = initialState, action: MenuOpenAction) {
  switch (action.type) {
    case DEF.MENU_OPEN:
      return true;
    case DEF.MENU_CLOSE:
      return false;
    default:
      return state;
  }
}

export type MenuOpenActionType = "MENU_OPEN" | "MENU_CLOSE";

export interface MenuOpenAction {
  type: MenuOpenActionType;
}
