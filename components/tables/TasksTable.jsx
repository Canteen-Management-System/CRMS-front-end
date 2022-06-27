
// const data = [
//     { Category: "suggestion", Name: "Ahmed Ali", Company: "LTUC", Mobile: "089654123842", cltype: "customer", sertype: "appointment", priority: "High", Status: "closed", assign: ""},
//     { Category: "suggestion", Name: "Ahmed Ali", Company: "LTUC", Mobile: "089654123842", cltype: "customer", sertype: "appointment", priority: "High", Status: "closed", assign: ""},
//     { Category: "suggestion", Name: "Ahmed Ali", Company: "LTUC", Mobile: "089654123842", cltype: "customer", sertype: "appointment", priority: "High", Status: "closed", assign: ""},
//     { Category: "suggestion", Name: "Ahmed Ali", Company: "LTUC", Mobile: "089654123842", cltype: "customer", sertype: "appointment", priority: "High", Status: "closed", assign: ""},
//     { Category: "suggestion", Name: "Ahmed Ali", Company: "LTUC", Mobile: "089654123842", cltype: "customer", sertype: "appointment", priority: "High", Status: "closed", assign: ""},
//   ]

// function TaskTable() {
// return (
// 	<div className="flex flex-col justify-center items-center w-full px-3 py-3 h-1/2  rounded-md shadow-md">
    
// 	<table className="w-3/4 border-collapse text-white border-separate border border-slate-400">
// 		<tr>
// 		<th className="border border-slate-300">Category</th>
// 		<th className="border border-slate-300">Name</th>
// 		<th className="border border-slate-300">Company</th>
//         <th className="border border-slate-300">Mobile Number</th>
//         <th className="border border-slate-300">Client type</th>
//         <th className="border border-slate-300">Service type</th>
//         <th className="border border-slate-300">Priority</th>
//         <th className="border border-slate-300">Status</th>
//         <th className="border border-slate-300">Assign To</th>
// 		</tr>
//         {data.map((val, key) => {
//           return (
//             <tr key={key}>
//               <td className="border border-slate-300">{val.Category}</td>
//               <td className="border border-slate-300">{val.Name}</td>
//               <td className="border border-slate-300">{val.Company}</td>
//               <td className="border border-slate-300">{val.Mobile}</td>
//               <td className="border border-slate-300">{val.cltype}</td>
//               <td className="border border-slate-300">{val.sertype}</td>
//               <td className="border border-slate-300">{val.priority}</td>
//               <td className="border border-slate-300">{val.Status}</td>
//               <td className="border border-slate-300">{val.assign}</td>
//             </tr>
//           )
//         })}
	
// 	</table>
// 	</div>
// );
// }

// export default TaskTable;


import React, { useState } from 'react';

import { useTable, useSortBy, useFilters, useGlobalFilter, useAsyncDebounce } from 'react-table';

// function GlobalFilter({
//                        preGlobalFilteredRows,
//                        globalFilter,
//                        setGlobalFilter,
//                      }) {
//  const count = preGlobalFilteredRows.length
//  const [value, setValue] = useState(globalFilter)
// //  const onChange = useAsyncDebounce(value => {
// //    setGlobalFilter(value || undefined)
// //  }, 200)

//  return (
//    <span>
//      Search:{' '}
//      <input
//        value={value || ""}
//        onChange={e => {
//          setValue(e.target.value);
//          onChange(e.target.value);
//        }}
//        placeholder={`${count} records...`}
//        style={{
//          fontSize: '1.1rem',
//          border: '0',
//        }}
//      />
//    </span>
//  )
// }

// Define a default UI for filtering
function DefaultColumnFilter({
                              column: { filterValue, preFilteredRows, setFilter },
                            }) {
 const count = preFilteredRows.length

 return (
   <input
     value={filterValue || ''}
     onChange={e => {
       setFilter(e.target.value || undefined) // Set undefined to remove the filter entirely
     }}
    //  placeholder={`Search ${count} records...`}
   />
 )
}

function Example() {

 const data = React.useMemo(
     () => [
       {
         col1: 'Request',
         col2: 'Ahmed Ali',
         col3: '0795824515',
         col4: 'New customer',
         col5: 'Qutaion',
         col6: 'new',
         col7: 'High',
         col8: 'open',
         col9: '',
       },
       {
         col1: 'Vilnius',
         col2: '30',
         col3: 'rain',
         col4: '740',
         col5: '87',
         col6: '90',
         col7: '90',
         col8: '90',
         col9: '90',
       },
       {
         col1: 'London',
         col2: '23',
         col3: 'rain',
         col4: '743',
         col5: '77',
         col6: '90',
         col7: '90',
         col8: '90',
         col9: '90',
       },
       {
         col1: 'Madrid',
         col2: '34',
         col3: 'sunny',
         col4: '738',
         col5: '40',
         col6: '90',
         col7: '90',
         col8: '90',
         col9: '90',
       },
       {
         col1: 'Warsaw',
         col2: '25',
         col3: 'heavy rain',
         col4: '739',
         col5: '88',
         col6: '90',
         col7: '90',
         col8: '90',
         col9: '90',
       },
     ],
     []
 )

 const columns = React.useMemo(
     () => [
       {
         Header: 'Category',
         accessor: 'col1', // accessor is the "key" in the data
       },
       {
         Header: 'Name',
         accessor: 'col2',
       },
       {
         Header: 'Company',
         accessor: 'col3',
       },
       {
         Header: 'Mobile Number',
         accessor: 'col4',
       },
       {
         Header: 'Client type',
         accessor: 'col5',
       },
       {
        Header: 'Service type',
        accessor: 'col6',
      },
      {
        Header: 'Priority',
        accessor: 'col7',
      },
      {
        Header: 'Status',
        accessor: 'col8',
      },
      {
        Header: 'Assign To',
        accessor: 'col9',
      },
     ],
     []
 )

 const defaultColumn = React.useMemo(
   () => ({
     // Let's set up our default Filter UI
     Filter: DefaultColumnFilter,
   }),
   []
 )

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
     <div  className="flex flex-col justify-center items-center w-full px-3 py-3 h-1/2  rounded-md shadow-md bg-[#00000000]">
       <table {...getTableProps()} className="w-3/4 border-collapse text-white border-separate border border-slate-400">
         <thead>
         {headerGroups.map(headerGroup => (
             <tr {...headerGroup.getHeaderGroupProps()}>
               {headerGroup.headers.map(column => (
                   <th
                       {...column.getHeaderProps(column.getSortByToggleProps())}
                       style={{
                         borderBottom: 'solid 3px red',
                         color: 'black',
                         background:'#D3CEDF',
                       }}
                   >
                     {column.render('Header')}
                     <span>
                       {column.isSorted
                           ? column.isSortedDesc
                               ? '🔽'
                               : '🔼'
                           : ''}
                    </span>
                    <div>{column.canFilter ? column.render('Filter') : null}</div>
                   </th>
               ))}
             </tr>
         ))}
         <tr>
           <th
             colSpan={visibleColumns.length}
             style={{
               textAlign: 'left',
             }}
           >
             {/* <GlobalFilter
               preGlobalFilteredRows={preGlobalFilteredRows}
               globalFilter={state.globalFilter}
               setGlobalFilter={setGlobalFilter}
             /> */}
           </th>
         </tr>
         </thead>
         <tbody {...getTableBodyProps()}>
         {rows.map(row => {
           prepareRow(row)
           return (
               <tr {...row.getRowProps()}>
                 {row.cells.map(cell => {
                   return (
                       <td
                           {...cell.getCellProps()}
                           style={{
                             padding: '10px',
                             border: 'solid 1px gray',
                           }}
                       >
                         {cell.render('Cell')}
                       </td>
                   )
                 })}
               </tr>
           )
         })}
         </tbody>
       </table>
     </div>
 );
}

export default Example;
