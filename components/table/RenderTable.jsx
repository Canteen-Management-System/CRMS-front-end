import TableHeader from "./TableHeader";
import TableFooter from "./TableFooter";
import TableBody from "./TableBody";
import React, { useState, useEffect } from "react";

import { setRequestMeta } from "next/dist/server/request-meta";

const HEAD = ["Date", "Category", "Company"];
const BODY_DATA = [
  ["25-06-2022", "RFQ", "ASAC"],
  ["25-06-2022", "RFQ", "ASAC"],
  ["25-06-2022", "RFQ", "ASAC"],
];

export default function RenderTable({ tableHead, bodyData }) {
  const [q,setQ]=useState("");
  const [searchcolumns,setSearchcolumns] = useState([])
  const t = 0
  function search(rows){
    return rows.filter((row) =>
      columns.some((column) => row[column].toString().toLowerCase().indexOf(q.toLowerCase())>-1
      )
    );
  }
  const columns = bodyData[0] && Object.keys(bodyData[0]);
  return (
    <>
      <div className="flex flex-column justify-left items-left w-3/4 md:w-3/4 h-3/4 pb-8  px-12 py-8 mx-8 my-8 bg-gray-500 rounded-md shadow-md">
        

        <input placeholder="  Search" type={"text"} value={q} onChange={(e)=> setQ(e.target.value)} />
        {columns &&
          columns.map((column)=>( 
          <label  key={t+1} className="mx-6 font-poppins text-white" >

            <input 
            className="mx-2"
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

      </div>
      <div>
      <table className="mx-8 text-white font-poppins">
        <TableHeader tableHead={tableHead} />
        <TableBody bodyData={search(bodyData)} tableHead={tableHead} />
        <TableFooter />
      </table>
    </div>
    </>

);
}
