import { useState, useEffect } from "react";
import http from "../../../lib/services/httpService";
import auth from "../../../lib/services/authService";
import PrioritiesButton from "./PrioritiesButton";
import AddPriority from "./AddPriority";
import ViewPriorities from "./ViewPriorities";

export default function Index() {
  const [toggleAdd, setToggleAdd] = useState(false);
  const [toggleView, setView] = useState(false);
  const [retrievePriorities, setRetrievePriorities] = useState([]);

  const toggleAddForm = () => {
    setToggleAdd(!toggleAdd);
  };

  const toggleViewPriorities = () => {
    setView(!toggleView);
  };

  const getPriorities = async () => {
    try {
      const res = await http.get("/priority-list", auth.config);
      setRetrievePriorities(res.data);
      return res.data;
    } catch (error) {}
  };

  useEffect(() => {
    getPriorities();
  }, []);

  return (
    <>
      <PrioritiesButton
        toggleAddForm={toggleAddForm}
        toggleViewPriorities={toggleViewPriorities}
      />
      <AddPriority
        toggleAddForm={toggleAddForm}
        animation={toggleAdd}
        getPriorities={getPriorities}
      />
      <ViewPriorities
        toggleViewPriorities={toggleViewPriorities}
        animation={toggleView}
        getPriorities={getPriorities}
        priorities={retrievePriorities}
      />
    </>
  );
}
