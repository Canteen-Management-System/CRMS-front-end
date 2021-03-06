import dynamic from "next/dynamic";
import { useState, useEffect, useCallback } from "react";
import axios from "axios";
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
  const [returnedData, setReturnedData] = useState(null);

  const getStaff = async () => {
    const usersReq = http.get("/users", auth.config);
    const departmentReq = http.get("/department-list", auth.config);
    const roleReq = http.get("/role-list", auth.config);
    const positionsReq = http.get("/positions-list", auth.config);

    try {
      const res = await axios.all([
        positionsReq,
        departmentReq,
        roleReq,
        usersReq,
      ]);
      const positions = res[0];
      const departments = res[1];
      const roles = res[2];
      const users = res[3];

      returnedData = {
        positions: positions.data,
        departments: departments.data,
        roles: roles.data,
        users: users.data,
      };
      console.log(returnedData);
      setReturnedData(returnedData);
      return returnedData;
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getStaff();
  }, []);

  return (
    <>
      <AddNewStaff getStaff={getStaff} />
      {returnedData && (
        <StaffCards getStaff={getStaff} returnedData={returnedData} />
      )}
    </>
  );
}
