import { ActionTypes } from "../contents/ActionTypes";
import axios from "axios";

export const fetchData = (page: number) => async (dispatch: any) => {
	const response = await axios.get(
		`https://hn.algolia.com/api/v1/search_by_date?tags=story&page=${page}`
	);
	dispatch({ type: ActionTypes.FETCH_DATA, payload: response.data.hits });
};
export const rowData = (row: any) => {
	return {
		type: ActionTypes.ROW_DATA,
		payload: row,
	};
};
export const pageCount = () => {
	return {
		type: ActionTypes.PAGE_COUNT,
	};
};
export const allPages = () => {
	return {
		type: ActionTypes.ALL_PAGES,
	};
};
