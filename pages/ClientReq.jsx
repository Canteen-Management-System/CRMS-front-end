

import SideBar from "../components/navigation/SideBar";
import Client from "../components/ClientRequest";
import RenderHeader from "../components/RenderHeader";
import RenderHead from "../components/RenderHead";


export default function ClientReq() {
    return (
      <>
        <div className="relative ml-16">
        <RenderHead title="Client Request" />
        <RenderHeader pageTitle="Client Request" />
        <Client />
        <SideBar />
        </div>
      </>
    );
  }