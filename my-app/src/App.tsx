import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import TableData from "./components/TableData";
import RowData from "./components/RowData";

function App() {
  return (
    <div className="App">
      <Router>
        <Routes>
          <Route path="/" element={<TableData />} />
          <Route path="/rowData" element={<RowData />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
