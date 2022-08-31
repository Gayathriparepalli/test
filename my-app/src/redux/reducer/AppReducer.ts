import { ActionTypes } from "../contents/ActionTypes";

type stateType = {
	hits: any;
	row: any;
	page: number;
	allPages: any;
};
const initialState: stateType = {
	hits: [],
	row: [],
	page: 0,
	allPages: [],
};
type ReducerType = { type: string; payload: any };

export const AppReducer = (
	state = initialState,
	{ type, payload }: ReducerType
) => {
	switch (type) {
		case ActionTypes.FETCH_DATA:
			return { ...state, hits: [...state.hits, ...payload] };
		case ActionTypes.ROW_DATA:
			return { ...state, row: payload };
		case ActionTypes.PAGE_COUNT:
			return { ...state, page: state.page + 1 };
		case ActionTypes.ALL_PAGES:
			return { ...state, allPages: [...state.allPages, state.page] };
		default:
			return state;
	}
};
