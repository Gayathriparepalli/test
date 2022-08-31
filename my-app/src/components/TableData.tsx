import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
	fetchData,
	rowData,
	pageCount,
	allPages,
} from "../redux/actions/AppActions";
import { RootState } from "../redux/reducer/Index";
import {
	TableContainer,
	Table,
	TableHead,
	TableBody,
	TableCell,
	TableRow,
	Stack,
	Pagination,
	TextField,
} from "@mui/material";
import { useNavigate } from "react-router-dom";

const TableData = () => {
	const hits: any = useSelector((state: RootState) => state.rootState.hits);
	const page: any = useSelector((state: RootState) => state.rootState.page);
	const allPageNos: any = useSelector(
		(state: RootState) => state.rootState.allPages
	);
	const navigate = useNavigate();
	const dispatch = useDispatch();
	const [pageNo, setPageNo] = useState(1);
	const rowsPerPage = 20;
	const [search, setSearch] = useState("");
	useEffect(() => {
		dispatch(allPages());
		const exists = allPageNos.filter((val: number) => val === page);
		if (exists.length === 0) {
			setTimeout(() => {
				dispatch(fetchData(page) as any);
				dispatch(pageCount());
			}, 10000);
		}
	}, [page]);
	const data = hits.slice((pageNo - 1) * rowsPerPage, pageNo * rowsPerPage);
	const handleChange = (e: any, value: number) => {
		setPageNo(value);
	};
	const handleClick = (row: any) => {
		dispatch(rowData(row));
		navigate("/rowData");
	};
	return (
		<>
			<TextField
				label="search by title or created_at"
				value={search}
				onChange={(e: any) => setSearch(e.target.value)}
				data-testid="search"
			/>
			<TableContainer
				sx={{
					my: 5,
					mx: "auto",
					width: 700,
					border: "1px black solid",
				}}
			>
				<Table sx={{ width: 650 }}>
					<TableHead>
						<TableRow data-testid="row1">
							<TableCell>pageNo</TableCell>
							<TableCell>title</TableCell>
							<TableCell>created_at</TableCell>
							<TableCell>author</TableCell>
							<TableCell>url</TableCell>
						</TableRow>
					</TableHead>
					<TableBody>
						{data
							.filter((val: any) => {
								if (search === "") {
									return val;
								} else if (
									val.title
										.toUpperCase()
										.includes(search.toUpperCase()) ||
									val.created_at
										.toUpperCase()
										.includes(search.toUpperCase())
								) {
									return val;
								}
							})
							.map((row: any) => (
								<TableRow
									key={row.title}
									data-testid="row2"
									onClick={() => handleClick(row)}
								>
									<TableCell>{pageNo}</TableCell>
									<TableCell>{row.title}</TableCell>
									<TableCell>{row.created_at}</TableCell>
									<TableCell>{row.author}</TableCell>
									<TableCell>{row.url}</TableCell>
								</TableRow>
							))}
					</TableBody>
				</Table>
				{hits.length ? (
					<Pagination
						page={pageNo}
						count={page}
						size="small"
						color="secondary"
						onChange={handleChange}
					/>
				) : null}
			</TableContainer>
		</>
	);
};

export default TableData;
