import React, { useState, useEffect } from "react";
import AddService from "./AddService";
import ServicesButton from "./ServiceButtons";
import ViewCategories from "./ViewServices";
import http from "../../../lib/services/httpService";
import auth from "../../../lib/services/authService";

export default function Index() {
  const [toggleAdd, setToggleAdd] = useState(false);
  const [toggleView, setView] = useState(false);
  const [retrieveServices, setRetrieveServices] = useState([]);

  const toggleAddForm = () => {
    setToggleAdd(!toggleAdd);
  };

  const toggleViewCategories = () => {
    setView(!toggleView);
  };

  const getServices = async () => {
    try {
      const res = await http.get("/service-type-list", auth.config);
      setRetrieveServices(res.data);
      return res.data;
    } catch (error) {}
  };

  useEffect(() => {
    getServices();
  }, []);

  return (
    <>
      <ServicesButton
        toggleAddForm={toggleAddForm}
        toggleViewCategories={toggleViewCategories}
      />
      <AddService
        toggleAddForm={toggleAddForm}
        animation={toggleAdd}
        getServices={getServices}
      />
      <ViewCategories
        toggleViewCategories={toggleViewCategories}
        animation={toggleView}
        getServices={getServices}
        services={retrieveServices}
      />
    </>
  );
}
