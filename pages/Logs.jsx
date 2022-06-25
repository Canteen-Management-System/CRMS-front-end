import RenderHead from "../components/RenderHead";
import SideBar from "../components/navigation/SideBar";
import ClientModalForm from "../components/ClientModalForm";
import RenderHeader from "../components/RenderHeader";

const Logs = () => {
  return (
    <div className="relative ml-16">
      <RenderHead title="Logs" />
      <RenderHeader pageTitle="Logs" />
      <SideBar />
      <ClientModalForm />
    </div>
  );
};

export default Logs;
