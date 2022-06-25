import React from "react";

const ActionTaken = () => {
  return (
    <div className="flex flex-col justify-center items-center  h-full w-screen font-poppins ">
      <label  className="text-lg text-red-200 pr-4 text-white ">
        Action Taken
      </label>
      <textarea id="w3review" name="w3review" rows="4" cols="50" bp-5/>
    </div>
  );
};

export default ActionTaken;