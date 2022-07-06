import React, { useState, useEffect } from "react";
import TableHeader from "../table/TableHeader";
import { TrashIcon } from "@heroicons/react/outline";
import TableFooter from "../table/TableFooter";
import XLSX from "xlsx";

function ClientsTable({ getClients, tableData, deleteLocation }) {
  let counter = 0;
  const [q, setQ] = useState("");
  const [searchcolumns, setSearchcolumns] = useState(["id"]);
  let t = 0;
  function search(rows) {
    return rows.filter((row) =>
      searchcolumns.some(
        (column) =>
          row[column].toString().toLowerCase().indexOf(q.toLowerCase()) > -1
      )
    );
  }
  const columns = tableData[0] && Object.keys(tableData[0]);

  const handleExport = () => {
    XLSX = require("xlsx");
    var wb = XLSX.utils.book_new(),
      ws = XLSX.utils.json_to_sheet(search(tableData));

    XLSX.utils.book_append_sheet(wb, ws, "clients");
    XLSX.writeFile(wb, "ClientsList.xlsx");
  };

  const [tableHeader, setTableHeader] = useState([]);
  useEffect(() => {
    if (tableData.length !== 0) {
      const headerKeys = Object.keys(tableData[0]);
      setTableHeader(headerKeys);
    }
  }, [tableData]);

  return (
    <div>
      <section className="w-full p-8 bg-gray-500 h-50">
        <input
          className="w-full h-10 px-3 px-8 mb-8 text-xl rounded shadow-lg focus:outline-none focus:shadow-outline"
          type="search"
          placeholder="Search..."
          value={q}
          onChange={(e) => setQ(e.target.value)}
        />
        {columns &&
          columns.map((column) => (
            <label key={(t += 1)} className="mx-4 text-white font-poppins ">
              <input
                className="mx-2 "
                type="checkbox"
                checked={searchcolumns.includes(column)}
                onChange={(e) => {
                  const checked = searchcolumns.includes(column);
                  setSearchcolumns((prev) =>
                    checked
                      ? prev.filter((sc) => sc !== column)
                      : [...prev, column]
                  );
                }}
              />
              {column}
            </label>
          ))}

        <button
          className="px-8 py-2 mb-5 ml-12 text-black bg-white rounded"
          onClick={handleExport}
        >
          Export
        </button>
      </section>
      <table className="pl-8 mt-8 ml-12 text-white font-poppins logs-table">
        <TableHeader tableHead={tableHeader} bg="bg-gray-600" />
        <tbody>
          {search(tableData).map((row, rowIdx) => {
            return (
              <tr key={rowIdx} className=" hover:bg-slate-700">
                {tableHeader.map((head, idx) => {
                  return (
                    <td
                      key={idx}
                      className="p-1 px-8 py-2 text-center border rounded-lg border-slate-700"
                    >
                      {head == "id" ? (counter = counter + 1) : row[head]}
                    </td>
                  );
                })}
                <td className="p-1 text-center border rounded-lg border-slate-700">
                  <TrashIcon
                    className="h-6 mx-auto cursor-pointer"
                    onClick={() => deleteLocation(row.id)}
                  />
                </td>
              </tr>
            );
          })}
        </tbody>
        <TableFooter />
      </table>
    </div>
  );
}

export default ClientsTable;
