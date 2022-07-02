import React from "react";
import Form from "../form/Form";

const ActionTaken = () => {
  const options = [
    { _id: 1, name: "HR" },
    { _id: 2, name: "Accounts" },
    { _id: 3, name: "Administrator" },
  ];
  const nameList = [
    { _id: 1, name: "HR" },
    { _id: 2, name: "Accounts" },
    { _id: 3, name: "Administrator" },
  ];
  return (
    <div className="flex flex-col items-center justify-center w-screen h-full font-poppins ">
      <label className="pr-4 text-lg text-white ">Details</label>
      <textarea id="Details" name="Details" rows="4" cols="50" />
      <label className="pr-4 text-lg text-white ">Expectation</label>
      <textarea id="Expectation" name="Expectation" rows="4" cols="50" />
      <legend className="md:text-xl pb-8 text-[#F2F2F2] py-5">Assign To</legend>
      <div className="flex flex-col justify-center w-full pb-6 md:flex-row items-left px-9">
        <label className="w-1/3 pr-4 text-lg text-white ">Department</label>
        <select>
          <option className="pr-4 text-lg text-white " />
          {options.map((option) => (
            <option key={option._id} value={option._id}>
              {option.name}
            </option>
          ))}
        </select>
      </div>
      <div className="flex flex-col justify-center w-full pb-6 md:flex-row items-left px-9">
        <label className="w-1/3 pr-4 text-lg text-white ">Name</label>
        <select>
          <option className="pr-4 text-lg text-white " />
          {nameList.map((option) => (
            <option key={option._id} value={option._id}>
              {option.name}
            </option>
          ))}
        </select>
      </div>
    </div>
  );
};

export default ActionTaken;
