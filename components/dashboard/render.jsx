import { useState, useEffect } from "react";
import auth from "../../lib/services/authService";
import http from "../../lib/services/httpService";
import BarChart from "./BarChart";
import PieChart from "./PieChart";

import Counters from "./Counters";
import RenderHeader from "../RenderHeader";

function Dashboard() {
  const [retrievedTasks, setRetrievedTasks] = useState([]);
  const [retrievedSeviceTypes, setRetrievedSeviceTypes] = useState([]);
  const getTasks = async () => {
    try {
      const res = await http.get("/tasks-list", auth.config);
      setRetrievedTasks(res.data);
    } catch (error) {
      console.log(error);
    }
  };

  const getServiceType = async () => {
    try {
      const res = await http.get("/service-type-list", auth.config);
      setRetrievedSeviceTypes(res.data);
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    getTasks();
    getServiceType();
  }, []);

  var today = new Date();
  var dd = String(today.getDate()).padStart(2, "0");
  var mm = String(today.getMonth() + 1).padStart(2, "0"); //January is 0!
  var yyyy = today.getFullYear();

  today = dd + "/" + mm + "/" + yyyy;
  // console.log(retrievedTasks[0].date)
  function filterTasksByDate(status, date) {
    const filteredTasks = retrievedTasks.filter((task) => {
      const dateUpdated = task.updated.split("/");
      return (
        task.status == status && `${dateUpdated[1]}/${dateUpdated[2]}` == date
      );
    });

    return filteredTasks;
  }
  // console.log(retrievedTasks)

  function filterServiceType(service_name) {
    const getServiceId = retrievedSeviceTypes.filter((service) => {
      console.log(service);
      return service.service == service_name;
    });
    const filteredTasks = retrievedTasks.filter((task) => {
      return task.service_type == getServiceId[0]?.id;
    });
    return filteredTasks;
  }

  console.log(filterServiceType("offer").length);
  const isOpen = (value) => value.status == "open";
  const isClosed = (value) => value.status == "closed";
  const open = retrievedTasks.filter(isOpen);
  const closed = retrievedTasks.filter(isClosed);
  const isOpenToday = (value) =>
    value.status == "open" && value.updated == today;
  const isClosedToday = (value) =>
    value.status == "closed" && value.updated == today;
  const openToday = retrievedTasks.filter(isOpenToday);
  const closedToday = retrievedTasks.filter(isClosedToday);
  return (
    <div>
      <RenderHeader pageTitle={"Dashboard"} />
      <Counters
        openToday={openToday}
        closedToday={closedToday}
        open={open}
        closed={closed}
      />
      <div className=" flex flex-row gap-20	">
        <BarChart filteredTasks={filterTasksByDate} />
        <PieChart filterServiceType ={filterServiceType}/>
      </div>
    </div>
  );
}

export default Dashboard;
