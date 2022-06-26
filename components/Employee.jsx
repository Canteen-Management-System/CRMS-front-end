import React, { useState } from "react";
import Image from 'next/image'
import { MdFavoriteBorder, MdChat } from 'react-icons/md';

export default function DisplayEmployees( props ) {
    return(
        <dev className=" bg-[#748DA6] rounded-md  m-8  items-center justify-center pb-5">
             <p className="ml-2 "><Image
                src="https://pngimage.net/wp-content/uploads/2020/03/employee-logo-png-2.jpg"
                alt="Landscape picture"
                width={250}
                height={200}
            /></p>
            <p  className="ml-16 text-white" ><MdChat size={25} className=" ml-16 text-white"/> Employee ID : <b>{props.data.Id}</b></p>
    
            <p className="text-white">Employee Name : <b>{props.data.FirstName} {props.data.LastName}</b></p>
    
            <p className="text-white">Department : <b>{props.data.Department}</b></p>
    
            <p className="text-white">Mobile: <b>{props.data.Mobile}</b></p> 
            
            


    
        </dev>
    )
    
      }