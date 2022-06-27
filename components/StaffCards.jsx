import React, { useState } from "react";
import Employee from "../components/Employee"


  export default function DisplayEmployees(props) {
    const list = props.employees;
    const listElements = list.map((emp) =>
    <Employee key={emp.Id}  data={emp} />
  );

    return(
        <div  className="flex flex-wrap  items-center w-1/4 md:w-full h-1/5  rounded-md shadow-md  z-0">
            {listElements}
        </div>
    );

  




}