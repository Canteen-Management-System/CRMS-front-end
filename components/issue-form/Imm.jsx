import React, { useState } from "react";
import ActionTaken from "./ActionTaken";
import AssignTo from "./AssignTo";

const Immm = [
  { _id: 1, name: "Yes" },
  { _id: 2, name: "No" },
];

export default function Imm() {
  //   const getInitialState = () => {
  //     const value = "";
  //     return value;
  //   };

  const [value, setValue] = useState("");

  const handleChange = (e) => {
    setValue(e.target.value);
  };

  return (
    <dev className="flex flex-col justify-center w-full pb-6 md:flex-row items-left px-9">
      <div>
        <label className="pr-4 text-lg text-white ">Immediate resolution</label>
        <select value={value} onChange={handleChange}>
          <option className="pr-4 text-lg text-white " />
          {Immm.map((option) => (
            <option key={option._id} value={option._id}>
              {option.name}
            </option>
          ))}
        </select>
      </div>
      <>{value == "" ? <p /> : value == 1 ? <ActionTaken /> : <AssignTo />}</>
    </dev>
  );
}
