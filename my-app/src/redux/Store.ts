import { createStore, compose, applyMiddleware } from "redux";
import { reducer } from "./reducer/Index";
import thunk from "redux-thunk";

declare global {
	interface Window {
		__REDUX_DEVTOOLS_EXTENSION_COMPOSE__?: typeof compose;
	}
}
const composeEnhancer = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
export const store = createStore(
	reducer,
	composeEnhancer(applyMiddleware(thunk))
);
