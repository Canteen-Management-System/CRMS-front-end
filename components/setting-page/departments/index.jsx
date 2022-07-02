import { useState, useEffect } from "react";
import http from "../../../lib/services/httpService";
import auth from "../../../lib/services/authService";
import DepartmentsButtons from "./DepartmentsButtons";
import AddDepartment from "./AddDepartment";
import ViewDepartments from "./ViewDepartments";

export default function Index() {
  const [toggleAdd, setToggleAdd] = useState(false);
  const [toggleView, setView] = useState(false);
  const [retrieveDepartments, setRetrieveDepartments] = useState([]);

  const toggleAddForm = () => {
    setToggleAdd(!toggleAdd);
  };

  const toggleViewDepartments = () => {
    setView(!toggleView);
  };

  const getDepartments = async () => {
    try {
      const res = await http.get("/department-list", auth.config);
      setRetrieveDepartments(res.data);
      return res.data;
    } catch (error) {}
  };

  useEffect(() => {
    getDepartments();
  }, []);

  return (
    <>
      <DepartmentsButtons
        toggleAddForm={toggleAddForm}
        toggleViewDepartments={toggleViewDepartments}
      />
      <AddDepartment
        toggleAddForm={toggleAddForm}
        animation={toggleAdd}
        getDepartments={getDepartments}
      />
      <ViewDepartments
        toggleViewDepartments={toggleViewDepartments}
        animation={toggleView}
        getDepartments={getDepartments}
        departments={retrieveDepartments}
      />
    </>
  );
}
