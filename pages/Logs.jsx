import RenderTasks from "../components/logs-page"
import RenderHeader from "../components/RenderHeader";
import RenderHead from "../components/RenderHead";
import dynamic from "next/dynamic";

const SideBar = dynamic(() => import("../components/navigation/SideBar"), {
  ssr: false,
});

export default function Log() {
  return (
    <div className="relative ml-16">
      <RenderHead title="Logs" />
      <RenderHeader pageTitle="Logs" />
      <RenderTasks/>
      <SideBar />
    </div>
  );
}
