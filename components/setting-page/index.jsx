import React from "react";
import RenderCategory from "./Category";
import RenderServices from "./service-type";
import RenderPriorities from "./priority";
import RenderDepartments from "./departments";
export default function Index() {
  return (
    <>
      <RenderCategory />
      <RenderServices />
      <RenderPriorities />
      <RenderDepartments />
    </>
  );
}
