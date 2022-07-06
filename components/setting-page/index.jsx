import React from "react";
import RenderCategory from "./Category";
import RenderServices from "./service-type";
import RenderPriorities from "./priority";
import RenderDepartments from "./departments";
export default function Index() {
  return (
    <div className="flex flex-wrap items-center w-1/4 text-white rounded-md shadow-md md:w-full h-1/5" >
      <RenderCategory />
      <RenderServices />
      <RenderPriorities />
      <RenderDepartments />
    </div>
  );
}
