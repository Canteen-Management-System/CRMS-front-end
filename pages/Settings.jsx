import React from "react";
import RenderHead from "../components/RenderHead";
import dynamic from "next/dynamic";
import RenderHeader from "../components/RenderHeader";
import RenderSettings from "../components/setting-page";

const SideBar = dynamic(() => import("../components/navigation/SideBar"), {
  ssr: false,
});
export default function Settings() {
  return (
    <section className="ml-16">
      <RenderHead title="Settings" />
      <RenderHeader pageTitle="Settings" />
      <SideBar />
      <RenderSettings />
    </section>
  );
}
