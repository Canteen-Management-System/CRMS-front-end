import React, { useState } from "react";

export default function DisplayEmployees( props ) {
    return(
        <dev>
            <p className="text-white" >Employee ID : <b>{props.data.Id}</b></p>
    
            <p className="text-white">Employee Name : <b>{props.data.FirstName}</b></p>
    
            <p className="text-white">Employee Location : <b>{props.data.LastName}</b></p>
    
            <p className="text-white">Employee Salary : <b>{props.data.Department}</b></p> 
    
        </dev>
    )
    
      }