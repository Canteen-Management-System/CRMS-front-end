import Client from "../components/ClientRequest";
import RenderHeader from "../components/RenderHeader";
import RenderHead from "../components/RenderHead";
import ExteralRequestTable from "../components/ExternalRequestTable"
import dynamic from "next/dynamic";

const SideBar = dynamic(() => import("../components/navigation/SideBar"), {
  ssr: false,
});

export default function ClientReq() {
  return (
    <>
      <div  className="ml-16">
        <RenderHead title="Client Request" />
        <RenderHeader pageTitle="Client Request" />
        <SideBar/>
        <ExteralRequestTable/>

      </div>
    </>
  );
}
