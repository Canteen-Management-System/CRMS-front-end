import RenderHead from "../components/RenderHead";
import SideBar from "../components/navigation/SideBar";
import ClientModalForm from "../components/ClientModalForm";
import RenderTable from "../components/table/RenderTable";

export default function Home() {
  return (
    <>
      <div className="relative p-4 ml-16">
        <RenderHead title="Home" />
        <SideBar />
        <ClientModalForm />
        <RenderTable />
      </div>
    </>
  );
}
