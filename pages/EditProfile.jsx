import RenderHead from "../components/RenderHead";
import SideBar from "../components/navigation/SideBar";
import RenderHeader from "../components/RenderHeader";
import EditProfileCom from "../components/EditProfileCom";

export default function EditProfile() {

  return (
    <div className="ml-16 my-8">
      <RenderHead title="Edit Profile" />
      <SideBar />
      <RenderHeader pageTitle="Edit Profile" />
      <EditProfileCom/>

      </div>
  );
}