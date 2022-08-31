import { combineReducers } from "redux";
import { AppReducer } from "./AppReducer";

export const reducer = combineReducers({
	rootState: AppReducer,
});
export type RootState = ReturnType<typeof reducer>;
