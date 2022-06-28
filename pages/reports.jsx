import RenderHead from "../components/RenderHead";
import SideBar from "../components/navigation/SideBar";
import RenderHeader from "../components/RenderHeader";
// import ReportList from "../components/ReportList";

import dynamic from 'next/dynamic'
const ReportList = dynamic(() => import("../components/ReportList"), {
ssr: false,
});
export default function reports() {

  return (
    <div className="ml-16 my-8">
      <RenderHead title="Reports" />
      <SideBar />
      <RenderHeader pageTitle="Reports" />
      <ReportList/>

      </div>
  );
}