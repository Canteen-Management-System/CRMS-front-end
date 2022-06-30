import React, { useState } from "react";
import Employee from "./Employee";

export default function DisplayEmployees(props) {
  const list = props.employees;
  const listElements = list.map((emp, idx) =>
    idx > 0 ? <Employee key={idx} data={emp} /> : ""
  );

  return (
    <div className="z-0 flex flex-wrap items-center w-1/4 rounded-md shadow-md md:w-full h-1/5">
      {listElements}
    </div>
  );
}
