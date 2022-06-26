import RenderHead from "../components/RenderHead";
import SideBar from "../components/navigation/SideBar";
import RenderHeader from "../components/RenderHeader";
import StaffPageHeader from "../components/StaffPageHeader"
import StaffCards from "../components/StaffCards"

export default function contacts() {
    const employees = [

        {Id:101,FirstName:'Abhinav',LastName:'Ali',Department:'HR',Jobtitle: 'HR officer',Mobile: '0792689554'},
        {Id:102,FirstName:'mohammad',LastName:'faresh',Department:'HR',Jobtitle: 'HR officer',Mobile: '0792689554'},
        {Id:102,FirstName:'mohammad',LastName:'faresh',Department:'HR',Jobtitle: 'HR officer',Mobile: '0792689554'},
        {Id:102,FirstName:'mohammad',LastName:'faresh',Department:'HR',Jobtitle: 'HR officer',Mobile: '0792689554'},
        {Id:102,FirstName:'mohammad',LastName:'faresh',Department:'HR',Jobtitle: 'HR officer',Mobile: '0792689554'},
        {Id:102,FirstName:'mohammad',LastName:'faresh',Department:'HR',Jobtitle: 'HR officer',Mobile: '0792689554'},
        {Id:102,FirstName:'mohammad',LastName:'faresh',Department:'HR',Jobtitle: 'HR officer',Mobile: '0792689554'},
        {Id:102,FirstName:'mohammad',LastName:'faresh',Department:'HR',Jobtitle: 'HR officer',Mobile: '0792689554'},
        {Id:102,FirstName:'mohammad',LastName:'faresh',Department:'HR',Jobtitle: 'HR officer',Mobile: '0792689554'},
        {Id:102,FirstName:'mohammad',LastName:'faresh',Department:'HR',Jobtitle: 'HR officer',Mobile: '0792689554'},
        {Id:102,FirstName:'mohammad',LastName:'faresh',Department:'HR',Jobtitle: 'HR officer',Mobile: '0792689554'},
        {Id:102,FirstName:'mohammad',LastName:'faresh',Department:'HR',Jobtitle: 'HR officer',Mobile: '0792689554'},
        {Id:102,FirstName:'mohammad',LastName:'faresh',Department:'HR',Jobtitle: 'HR officer',Mobile: '0792689554'},
        {Id:102,FirstName:'mohammad',LastName:'faresh',Department:'HR',Jobtitle: 'HR officer',Mobile: '0792689554'},

        

      
      
      ];
  return (
    <div className="ml-16">
      <RenderHead title="staff" />
      <SideBar />
      <RenderHeader pageTitle="staff" />
      <StaffPageHeader/>
      <StaffCards employees={employees}/>
      </div>
  );
}