import React from "react";

const ActionTaken = ({ id }) => {
  return (
    <div className="flex flex-col items-center justify-center w-screen h-full font-poppins ">
      <label className="pr-4 text-lg text-black ">Action Taken</label>
      <textarea formid={id} name="action_taken" rows="4" cols="50" />
    </div>
  );
};

export default ActionTaken;
