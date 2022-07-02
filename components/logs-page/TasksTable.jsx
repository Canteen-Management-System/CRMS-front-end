import React, { useState } from "react";
import { XIcon, CogIcon } from "@heroicons/react/solid";
import {
  useTable,
  useSortBy,
  useFilters,
  useGlobalFilter,
  useAsyncDebounce,
} from "react-table";

function DefaultColumnFilter({
  column: { filterValue, preFilteredRows, setFilter },
}) {
  const count = preFilteredRows.length;

  return (
    <input
      value={filterValue || ""}
      onChange={(e) => {
        setFilter(e.target.value || undefined);
      }}
    />
  );
}

function TasksTable() {
  const data = React.useMemo(
    () => [
      {
        col1: "Request Hello world",
        col2: "Ahmed Ali",
        col3: "0795824515",
        col4: "New customer",
        col5: "Qutaion",
        col6: "new",
        col7: "High",
        col8: "open",
        col9: "fffff",
        col10: (
          <span className="flex">
            <XIcon
              onClick={() => {
                console.log("Hi");
              }}
            />
            <CogIcon
              onClick={() => {
                console.log("Hi");
              }}
            />
          </span>
        ),
      },
      {
        col1: "Vilnius",
        col2: "30",
        col3: "rain",
        col4: "740",
        col5: "87",
        col6: "90",
        col7: "90",
        col8: "90",
        col9: "90",
      },
      {
        col1: "London",
        col2: "23",
        col3: "rain",
        col4: "743",
        col5: "77",
        col6: "90",
        col7: "90",
        col8: "90",
        col9: "90",
      },
      {
        col1: "Madrid",
        col2: "34",
        col3: "sunny",
        col4: "738",
        col5: "40",
        col6: "90",
        col7: "90",
        col8: "90",
        col9: "90",
      },
      {
        col1: "Warsaw",
        col2: "25",
        col3: "heavy rain",
        col4: "739",
        col5: "88",
        col6: "90",
        col7: "90",
        col8: "90",
        col9: "90",
      },
    ],
    []
  );

  const columns = React.useMemo(
    () => [
      {
        Header: "Category",
        accessor: "col1", // accessor is the "key" in the data
      },
      {
        Header: "Name",
        accessor: "col2",
      },
      {
        Header: "Company",
        accessor: "col3",
      },
      {
        Header: "Mobile Number",
        accessor: "col4",
      },
      {
        Header: "Client type",
        accessor: "col5",
      },
      {
        Header: "Service type",
        accessor: "col6",
      },
      {
        Header: "Priority",
        accessor: "col7",
      },
      {
        Header: "Status",
        accessor: "col8",
      },
      {
        Header: "Assign To",
        accessor: "col9",
      },
      {
        Header: "Action",
        accessor: "col10",
      },
    ],
    []
  );

  const defaultColumn = React.useMemo(
    () => ({
      // Let's set up our default Filter UI
      Filter: DefaultColumnFilter,
    }),
    []
  );

  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    rows,
    prepareRow,
    state,
    visibleColumns,
    preGlobalFilteredRows,
    setGlobalFilter,
  } = useTable(
    {
      columns,
      data,
      defaultColumn, // Be sure to pass the defaultColumn option
    },
    useFilters,
    useGlobalFilter,
    useSortBy
  );

  return (
    <div className="w-11/12 mx-auto overflow-x-scroll scrollbar-hide">
      <div className="flex flex-col justify-center w-full px-3 py-3 rounded-md shadow-md bg-[#00000000]">
        <table
          {...getTableProps()}
          className="text-white border border-separate border-slate-400"
        >
          <thead>
            {headerGroups.map((headerGroup, idx) => (
              <tr key={idx} {...headerGroup.getHeaderGroupProps()}>
                {headerGroup.headers.map((column, idx) => (
                  <th
                    key={idx}
                    {...column.getHeaderProps(column.getSortByToggleProps())}
                    style={{
                      borderBottom: "solid 3px red",
                      color: "black",
                      background: "#D3CEDF",
                    }}
                  >
                    {column.render("Header")}
                    <span>
                      {column.isSorted
                        ? column.isSortedDesc
                          ? "🔽"
                          : "🔼"
                        : ""}
                    </span>
                    {column.render("Header") !== "Action" ? (
                      <div>
                        {column.canFilter ? column.render("Filter") : null}
                      </div>
                    ) : (
                      ""
                    )}
                  </th>
                ))}
              </tr>
            ))}
            <tr>
              <th
                colSpan={visibleColumns.length}
                style={{
                  textAlign: "left",
                }}
              ></th>
            </tr>
          </thead>
          <tbody {...getTableBodyProps()}>
            {rows.map((row, rowIdx) => {
              prepareRow(row);
              return (
                <tr key={rowIdx} {...row.getRowProps()}>
                  {row.cells.map((cell, cellIdx) => {
                    return (
                      <td
                        key={cellIdx}
                        {...cell.getCellProps()}
                        style={{
                          padding: "10px",
                          border: "solid 1px gray",
                        }}
                      >
                        {cell.render("Cell")}
                      </td>
                    );
                  })}
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default TasksTable;
