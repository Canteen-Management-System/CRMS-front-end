import React, { useState } from "react";
import ActionTaken from "../components/ActionTaken";
import AssignTo from "../components/AssignTo"

const Immm = [{_id:1 , name:"Yes"},{_id:2 , name:"No"}]


export default function Imm() {
  const getInitialState = () => {
    const value = "";
    return value;
  };

  const [value, setValue] = useState(getInitialState);

  const handleChange = (e) => {
    setValue(e.target.value);
  };



  return (
    <dev className="pb-6  w-full flex flex-col md:flex-row items-left justify-center px-9">

         <div>
         <label  className="text-lg text-red-200 pr-4 text-white ">Immediate resolution</label>
    <select value={value} onChange={handleChange}>            
           <option  className="text-lg text-red-200 pr-4 text-white " />
           {Immm.map((option) => (
             <option  key={option._id} value={option._id}>
               {option.name}
             </option>
           ))}
         </select>

        </div>
    <>
                { 
               value==1 ?
               <ActionTaken />         
               :
               <AssignTo/>       

        }


    </>
    </dev>



  
  );

}