import React, { useState } from "react";
import ActionTaken from "./ActionTaken";
import AssignTo from "./AssignTo";

const DECISION = [
  { _id: 1, name: "Yes" },
  { _id: 2, name: "No" },
];

export default function Imm({ id }) {
  const [decision, setDecision] = useState("");

  const handleChange = (e) => {
    setDecision(e.target.value);
  };

  return (
    <div className="flex flex-col justify-center w-full pb-6 md:flex-row items-left px-9">
      <div>
        <label className="pr-4 text-lg text-black ">Immediate resolution</label>
        <select value={decision} onChange={handleChange}>
          <option className="pr-4 text-lg text-white " />
          {DECISION.map((option) => (
            <option key={option._id} value={option.name}>
              {option.name}
            </option>
          ))}
        </select>
      </div>
      <>{decision == "Yes" ? <ActionTaken /> : decision && <AssignTo />}</>
    </div>
  );
}
