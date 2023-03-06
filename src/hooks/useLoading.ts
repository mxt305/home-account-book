import React from "react";
import { useDispatch } from "react-redux";

import DEF from "../store/stateDef";

function useLoading() {
  const dispatch = useDispatch();
  const add = () => {
    dispatch({ type: DEF.LOADING_SHOW });
  };

  const remove = () => {
    dispatch({ type: DEF.LOADING_DISMISS });
  };

  const removeAll = () => {
    dispatch({ type: DEF.LOADING_CLEAR });
  };

  return {
    addLoading: add,
    removeLoading: remove,
    removeAllLoading: removeAll,
  };
}

export default useLoading;
