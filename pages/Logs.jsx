import RenderHead from "../components/RenderHead";
import SideBar from "../components/navigation/SideBar";
import ClientModalForm from "../components/ClientModalForm";
import RenderHeader from "../components/RenderHeader";
import Test from "./test";

const Logs = () => {
  return (
    <div className="relative ml-20">
      <RenderHead title="Logs" />
      <RenderHeader pageTitle="Logs" />
      <SideBar />
      <Test />
      <ClientModalForm />
    </div>
  );
};

export default Logs;
