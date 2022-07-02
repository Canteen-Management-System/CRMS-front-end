import TableHeader from "./TableHeader";
import TableFooter from "./TableFooter";
import TableBody from "./TableBody";
import React, { useState, useEffect } from "react";
import XLSX from "xlsx";


import { setRequestMeta } from "next/dist/server/request-meta";

const HEAD = ["Date", "Category", "Company"];
const BODY_DATA = [
  ["25-06-2022", "RFQ", "ASAC"],
  ["25-06-2022", "RFQ", "ASAC"],
  ["25-06-2022", "RFQ", "ASAC"],
];

export default function RenderTable({ tableHead, bodyData , deleteLocation}) {
  const [q,setQ]=useState("");
  const [searchcolumns,setSearchcolumns] = useState(["id"])
  let  t = 0
  function search(rows){
    return rows.filter((row) =>
    searchcolumns.some((column) => row[column].toString().toLowerCase().indexOf(q.toLowerCase())>-1
      )
    );
  }
  const columns = bodyData[0] && Object.keys(bodyData[0]);





  const handleExport = () =>{
        XLSX = require('xlsx');
        var wb = XLSX.utils.book_new(),
        ws = XLSX.utils.json_to_sheet(search(bodyData))

        XLSX.utils.book_append_sheet(wb,ws,"clients");
        XLSX.writeFile(wb,"ClientsList.xlsx");
  };


  return (
    <>
      <div className="flex flex-column justify-left items-left w-3/4 md:w-3/4 h-3/4 pb-6  px-12 py-6 mx-8 my-4 bg-gray-500 rounded-md shadow-md">
        

        <input placeholder="  Search" type={"text"} value={q} onChange={(e)=> setQ(e.target.value)} />
        {columns &&
          columns.map((column)=>( 
          <label  key={t+=1} className="mx-4 font-poppins text-white " >

            <input 
            className="mx-2 "
            type="checkbox"
            checked = {searchcolumns.includes(column)}
            onChange={(e)=>{
              const checked = searchcolumns.includes(column);
            setSearchcolumns((prev) =>
            checked
            
            ? prev.filter((sc)=> sc !== column)
          : [...prev, column]
          );
          }}
        />
        {column}
          </label>
        ))}

          <button className="px-8 py-2   ml-12 mb-5 text-black bg-white  rounded" onClick={handleExport}>Export</button>

      </div>
      <div>
        
      <table className="mx-8 text-white font-poppins">
        <TableHeader tableHead={tableHead} />
        <TableBody bodyData={search(bodyData)} tableHead={tableHead}  deleteLocation={deleteLocation}/>
        <TableFooter />
      </table>
    </div>
    </>

);
}
