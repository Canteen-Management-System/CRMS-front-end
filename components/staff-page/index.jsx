import dynamic from "next/dynamic";
import { useState, useEffect } from "react";
import auth from "../../lib/services/authService";
import http from "../../lib/services/httpService";
import AddNewStaff from "./AddNewStaff";

const StaffPageHeader = dynamic(() => import("./StaffPageHeader"), {
  ssr: false,
});

const StaffCards = dynamic(() => import("./StaffCards"), {
  ssr: false,
});

export default function Index() {
  const [staff, setStaff] = useState([]);

  const getStaff = async () => {
    const res = await http.get("/users", auth.config);
    setStaff(res.data);
    return res.data;
  };

  useEffect(() => {
    getStaff().then((res) => setStaff(res));
  }, []);

  return (
    <>
      <AddNewStaff />
      <StaffPageHeader />
      <StaffCards employees={staff} />
    </>
  );
}

// const employees = [
//   {
//     Id: 101,
//     FirstName: "Abhinav",
//     LastName: "Ali",
//     Department: "HR",
//     Jobtitle: "HR officer",
//     Mobile: "0792689554",
//   },
//   {
//     Id: 102,
//     FirstName: "mohammad",
//     LastName: "faresh",
//     Department: "HR",
//     Jobtitle: "HR officer",
//     Mobile: "0792689554",
//   },
//   {
//     Id: 102,
//     FirstName: "mohammad",
//     LastName: "faresh",
//     Department: "HR",
//     Jobtitle: "HR officer",
//     Mobile: "0792689554",
//   },
//   {
//     Id: 102,
//     FirstName: "mohammad",
//     LastName: "faresh",
//     Department: "HR",
//     Jobtitle: "HR officer",
//     Mobile: "0792689554",
//   },
//   {
//     Id: 102,
//     FirstName: "mohammad",
//     LastName: "faresh",
//     Department: "HR",
//     Jobtitle: "HR officer",
//     Mobile: "0792689554",
//   },
//   {
//     Id: 102,
//     FirstName: "mohammad",
//     LastName: "faresh",
//     Department: "HR",
//     Jobtitle: "HR officer",
//     Mobile: "0792689554",
//   },
//   {
//     Id: 102,
//     FirstName: "mohammad",
//     LastName: "faresh",
//     Department: "HR",
//     Jobtitle: "HR officer",
//     Mobile: "0792689554",
//   },
//   {
//     Id: 102,
//     FirstName: "mohammad",
//     LastName: "faresh",
//     Department: "HR",
//     Jobtitle: "HR officer",
//     Mobile: "0792689554",
//   },
//   {
//     Id: 102,
//     FirstName: "mohammad",
//     LastName: "faresh",
//     Department: "HR",
//     Jobtitle: "HR officer",
//     Mobile: "0792689554",
//   },
//   {
//     Id: 102,
//     FirstName: "mohammad",
//     LastName: "faresh",
//     Department: "HR",
//     Jobtitle: "HR officer",
//     Mobile: "0792689554",
//   },
//   {
//     Id: 102,
//     FirstName: "mohammad",
//     LastName: "faresh",
//     Department: "HR",
//     Jobtitle: "HR officer",
//     Mobile: "0792689554",
//   },
//   {
//     Id: 102,
//     FirstName: "mohammad",
//     LastName: "faresh",
//     Department: "HR",
//     Jobtitle: "HR officer",
//     Mobile: "0792689554",
//   },
//   {
//     Id: 102,
//     FirstName: "mohammad",
//     LastName: "faresh",
//     Department: "HR",
//     Jobtitle: "HR officer",
//     Mobile: "0792689554",
//   },
//   {
//     Id: 102,
//     FirstName: "mohammad",
//     LastName: "faresh",
//     Department: "HR",
//     Jobtitle: "HR officer",
//     Mobile: "0792689554",
//   },
// ];
