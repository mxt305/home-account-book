import { configureStore } from "@reduxjs/toolkit";
import type { ThunkAction, Action } from "@reduxjs/toolkit";
import { createWrapper } from "next-redux-wrapper";

import { loading, menuOpen } from "./reducers";

const makeStore = () =>
  configureStore({
    reducer: {
      loading,
      menuOpen,
    },
    middleware: (getDefaultMiddleware) =>
      getDefaultMiddleware({
        immutableCheck: false,
        serializableCheck: false,
      }),
    devTools: true,
  });

export type AppStore = ReturnType<typeof makeStore>;
export type AppState = ReturnType<AppStore["getState"]>;
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  AppState,
  unknown,
  Action
>;

export const wrapper = createWrapper<AppStore>(makeStore);

export type AppDispatch = ReturnType<AppStore["dispatch"]>;
