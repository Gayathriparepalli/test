import { render as newRender } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import * as redux from "react-redux";
import TableData from "./components/TableData";
import RowData from "./components/RowData";

jest.mock("react-redux", () => ({
	useSelector: jest.fn(),
	useDispatch: jest.fn(),
}));
const mockStore = {
	rootState: {
		hits: [{ title: "Chess Replay: You versus Bebchuk" }],
		row: [{ title: "Chess Replay: You versus Bebchuk" }],
		page: 0,
		allPages: [],
	},
};

const mockuseSelector: any = redux.useSelector;
const mockUseDispatch: any = redux.useDispatch;

beforeEach(() => {
	mockUseDispatch.mockImplementation((selector: any) => selector(mockStore));
	mockUseDispatch.mockImplementation(() => () => {});
});
afterEach(() => {
	mockUseDispatch.mockClear();
	mockuseSelector.mockClear();
});
const render = (component: any) =>
	newRender(<MemoryRouter>{component}</MemoryRouter>);

const renderApp = () => render(<TableData />);
const renderApp1 = () => render(<RowData />);

test("test to check childNodes of row1", () => {
	const { queryByTestId } = renderApp();
	const row: any = queryByTestId("row1");
	expect(row.childNodes).toHaveLength(5);
	expect(row.childNodes[0]).toHaveTextContent("pageNo");
	expect(row.childNodes[1]).toHaveTextContent("title");
	expect(row.childNodes[2]).toHaveTextContent("created_at");
	expect(row.childNodes[3]).toHaveTextContent("author");
	expect(row.childNodes[4]).toHaveTextContent("url");
});
test("test to check childNodes of row2", () => {
	const { queryByTestId } = renderApp();
	const row: any = queryByTestId("row2");
	expect(row.childNodes).toHaveLength(5);
	expect(row.childNodes[0]).toHaveTextContent("1");
	expect(row.childNodes[1]).toHaveTextContent(
		"Chess Replay: You versus Bebchuk"
	);
	expect(row.childNodes[2]).toHaveTextContent("");
	expect(row.childNodes[3]).toHaveTextContent("");
	expect(row.childNodes[4]).toHaveTextContent("");
});
test("test to check row data in RowData page", () => {
	const { getByTestId } = renderApp1();
	expect(getByTestId("row")).toHaveTextContent(
		JSON.stringify([{ title: "Chess Replay: You versus Bebchuk" }])
	);
});
