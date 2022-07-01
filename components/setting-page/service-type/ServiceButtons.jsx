import React from "react";

export default function ServicesButton({
  toggleAddForm,
  toggleViewCategories,
}) {
  return (
    <div className="flex flex-row items-center justify-around w-1/2 mx-4 mt-8">
      <h3 className="text-4xl font-thin text-white">Services</h3>
      <div className="flex flex-row items-center justify-between w-1/4 text-white ">
        <button
          className="bg-[#2c3e50]  text-white py-2 px-4 rounded-sm hover:bg-[#616161] transition-all duration-300 ease-in shadow-lg font-poppins"
          onClick={toggleViewCategories}
        >
          View
        </button>
        <button
          type="button"
          className="bg-[#2c3e50]  text-white py-2 px-4 rounded-sm hover:bg-[#616161] transition-all duration-300 ease-in shadow-lg font-poppins"
          onClick={toggleAddForm}
        >
          Add
        </button>
      </div>
    </div>
  );
}
