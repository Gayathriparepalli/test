import { useSelector } from "react-redux";

import { RootState } from "../redux/reducer/Index";

const RowData = () => {
	const row: any = useSelector((state: RootState) => state.rootState.row);
	return <div data-testid="row">{JSON.stringify(row)}</div>;
};

export default RowData;
