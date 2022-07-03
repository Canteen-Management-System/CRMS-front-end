import RenderHead from "../components/RenderHead";
// import ReportList from "../components/ReportList";

import dynamic from 'next/dynamic'
const ReportList = dynamic(() => import("../components/ReportList"), {
ssr: false,
});

const RenderHeader = dynamic(() => import("../components/RenderHeader"), {
  ssr: false,
  });

  const SideBar = dynamic(() => import("../components/navigation/SideBar"), {
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