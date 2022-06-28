import React from "react";
import Form from "../form/Form";

const ActionTaken = () => {
    const options = [{_id:1 , name:"HR"},{_id:2 , name:"Accounts"},{_id:3 , name:"Administrator"}]
    const Namelist =  [{_id:1 , name:"HR"},{_id:2 , name:"Accounts"},{_id:3 , name:"Administrator"}]
    return (
        <div className="flex flex-col justify-center items-center  h-full w-screen font-poppins ">
        <label  className="text-lg text-red-200 pr-4 text-white ">
          Details
        </label>
        <textarea id="Details" name="Details" rows="4" cols="50"/>
        <label  className="text-lg text-red-200 pr-4 text-white ">
          Expectaion
        </label>
        <textarea id="Expectaion" name="Expectaion" rows="4" cols="50"/>
    <legend className="md:text-xl pb-8 text-[#F2F2F2] py-5">
      Assign To  
   </legend>
   <dev className="pb-6  w-full flex flex-col md:flex-row items-left justify-center px-9" >
   <label className="text-lg text-red-200 pr-4 text-white w-1/3">Department</label>
   <select >
          <option className="text-lg text-red-200 pr-4 text-white "  />
          {options.map((option) => (
            <option  key={option._id} value={option._id}>
              {option.name}
            </option>
          ))}
        </select>
   </dev>
   <dev className="pb-6  w-full flex flex-col md:flex-row items-left justify-center px-9">
   <label  className="text-lg text-red-200 pr-4 text-white  w-1/3">Name</label>
   <select >
          <option  className="text-lg text-red-200 pr-4 text-white " />
          {Namelist.map((option) => (
            <option  key={option._id} value={option._id}>
              {option.name}
            </option>
          ))}
        </select>
   </dev>

      </div>

);
};

export default ActionTaken;

