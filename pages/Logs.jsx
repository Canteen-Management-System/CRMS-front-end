import Logss from "../components/logss";
import RenderHeader from "../components/RenderHeader";
import RenderHead from "../components/RenderHead";
import TaskTable from "../components/logs-page/TasksTable";
import dynamic from "next/dynamic";

const SideBar = dynamic(() => import("../components/navigation/SideBar"), {
  ssr: false,
});

export default function Log() {
  return (
    <div className="relative ml-16">
      <RenderHead title="Logs" />
      <RenderHeader pageTitle="Logs" />
      <Logss />
      <TaskTable />
      <SideBar />
    </div>
  );
}
