import SideBar from "../components/navigation/SideBar";
import Logss from "../components/logss";
import RenderHeader from "../components/RenderHeader";
import RenderHead from "../components/RenderHead";
import TaskTable from "../components/tables/TasksTable";

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
