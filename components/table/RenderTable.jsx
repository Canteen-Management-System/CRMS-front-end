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

export default function RenderTable({tableHeader, tableData}) {

  return (
    <>
      {tableHeader.length != 0 && tableData.length != 0 && (
        <table className="mx-8 text-white font-poppins">
          <TableHeader tableHead={tableHeader} />
          <TableBody bodyData={tableData}  />
          <TableFooter />
        </table>
      )}        
    </>

);
      }