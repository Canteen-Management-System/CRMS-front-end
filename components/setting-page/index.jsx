import React from "react";
import RenderCategory from "./Category";
import RenderServices from "./service-type";
import RenderPriorities from "./priority";

export default function Index() {
  return (
    <div>
      <RenderCategory />
      <RenderServices />
      <RenderPriorities />
    </div>
  );
}
