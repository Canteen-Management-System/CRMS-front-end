import RenderHead from "../components/RenderHead";
import SideBar from "../components/navigation/SideBar";
import RenderHeader from "../components/RenderHeader";
import StaffPageHeader from "../components/StaffPageHeader"
import StaffCards from "../components/StaffCards"

export default function contacts() {
    const employees = [

        {Id:101,FirstName:'Abhinav',LastName:'Ali',Department:'HR',Jobtitle: 'HR officer',Jobtitle: 'HR officer'},
      
        {Id:102,FirstName:'mohammad',LastName:'faresh',Department:'HR',Jobtitle: 'HR officer',Jobtitle: 'HR officer'},
      
        {Id:103,FirstName:'karam',LastName:'Taha',Department:'HR',Jobtitle: 'HR officer',Jobtitle: 'HR officer'},
      
      ];
  return (
    <>
      <RenderHead title="staff" />
      <SideBar />
      <RenderHeader pageTitle="staff" />
      <StaffPageHeader/>
      <StaffCards employees={employees}/>


    </>
  );
}