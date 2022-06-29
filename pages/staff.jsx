import RenderHead from "../components/RenderHead";
import RenderHeader from "../components/RenderHeader";
import RenderStaff from "../components/staff-page";
import dynamic from "next/dynamic";

const SideBar = dynamic(() => import("../components/navigation/SideBar"), {
  ssr: false,
});

export default function Contacts() {
  return (
    <div className="ml-16">
      <RenderHead title="Staff" />
      <SideBar />
      <RenderHeader pageTitle="Staff" />
      <RenderStaff />
    </div>
  );
}
