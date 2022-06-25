import RenderHead from "../components/RenderHead";
import SideBar from "../components/navigation/SideBar";
import AddNewIssueForm from "../components/AddNewIssueForm"
import ActionTaken from "../components/ActionTaken";

export default function Home() {
  return (
    <div>
      <RenderHead title="Home" />
      <SideBar />
      {/* <AddNewIssueForm/> */}
    </div>
  );
}
