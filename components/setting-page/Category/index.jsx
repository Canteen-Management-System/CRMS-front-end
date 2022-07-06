import React, { useState, useEffect } from "react";
import AddCategory from "./AddCategory";
import Category from "./Category";
import ViewCategories from "./ViewCategories";
import http from "../../../lib/services/httpService";
import auth from "../../../lib/services/authService";

export default function Index() {
  const [toggleAdd, setToggleAdd] = useState(false);
  const [toggleView, setView] = useState(false);
  const [retrieveCategories, setRetrieveCategories] = useState([]);

  const toggleAddForm = () => {
    setToggleAdd(!toggleAdd);
  };

  const toggleViewCategories = () => {
    setView(!toggleView);
  };

  const getCategories = async () => {
    try {
      const res = await http.get("/category-list", auth.config);
      setRetrieveCategories(res.data);
      return res.data;
    } catch (error) {}
  };

  useEffect(() => {
    getCategories();
  }, []);

  return (
    <>
      <div>
        <Category
          toggleAddForm={toggleAddForm}
          toggleViewCategories={toggleViewCategories}
        />
        <div className="flex flex-row">
          <AddCategory
            toggleAddForm={toggleAddForm}
            animation={toggleAdd}
            getCategories={getCategories}
          />
          <ViewCategories
            toggleViewCategories={toggleViewCategories}
            animation={toggleView}
            getCategories={getCategories}
            categories={retrieveCategories}
          />
        </div>
      </div>
    </>
  );
}
