import React, { useState } from "react";
import Employee from "../components/Employee"


  export default function DisplayEmployees(props) {
    const list = props.employees;
    const listElements = list.map((emp) =>
    <Employee key={emp.Id}  data={emp} />
  );

    return(
        <div  className="flex flex-col justify-center items-center w-1/4 md:w-1/5 h-1/5 bg-[#748DA6] rounded-md shadow-md">
            {listElements}
        </div>
    );

  




}