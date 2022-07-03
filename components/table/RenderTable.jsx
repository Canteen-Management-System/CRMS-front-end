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


  return (
    <>
      {tableHead.length != 0 && bodyData.length != 0 && (
        <table className="mx-8 text-white font-poppins">
          <TableHeader tableHead={tableHead} />
          <TableBody bodyData={bodyData} tableHead={tableHead} />
          <TableFooter />
        </table>
      )}        
      <table className="mx-8 text-white font-poppins">
        <TableHeader tableHead={tableHead} />
        <TableBody bodyData={search(bodyData)} tableHead={tableHead}  deleteLocation={deleteLocation}/>
        <TableFooter />
      </table>
    </>

);
}
