import { useDispatch, useSelector } from "react-redux";
import type { TypedUseSelectorHook } from "react-redux";

import type { AppState, AppDispatch } from "../store";

// Use throughout your app instead of plain `useDispatch` and `useSelector`
export const useAppDispatch: () => AppDispatch = useDispatch;
export const useAppSelector: TypedUseSelectorHook<AppState> = useSelector;

export { default as useLogin } from "./useLogin";
export { default as useLogout } from "./useLogout";
export { default as useUserAuth } from "./useUserAuth";
