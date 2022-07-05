import { useState, useEffect } from "react";
import axios from "axios";
import auth from "../../lib/services/authService";
import http from "../../lib/services/httpService";
import TasksTable from "./TasksTable";
import AddTaskForm from "./AddTaskForm";
import ClientsMessage from "./ClientsMessage";
export default function Index() {
  const [retrievedTasks, setRetrievedTasks] = useState([]);
  const [retrievedTableList, setRetrievedTableList] = useState([]);

  const getTableList = async () => {
    const categoriesReq = http.get("/category-list", auth.config);
    const servicesReq = http.get("/service-type-list", auth.config);
    const priorityReq = http.get("/priority-list", auth.config);
    const usersReq = http.get("/users", auth.config);
    const departmentReq = http.get("/department-list", auth.config);
    const clientsReq = http.get("/clients", auth.config);

    try {
      const res = await axios.all([
        categoriesReq,
        servicesReq,
        priorityReq,
        usersReq,
        departmentReq,
        clientsReq,
      ]);
      const categories = res[0].data;
      const services = res[1].data;
      const priority = res[2].data;
      const users = res[3].data;
      const department = res[4].data;
      const clients = res[5].data;

      retrievedTableList = {
        categories,
        services,
        priority,
        users,
        department,
        clients,
      };
      setRetrievedTableList(retrievedTableList);
      return retrievedTableList;
    } catch (error) {
      console.log(error);
    }
  };

  const getTasks = async () => {
    try {
      const res = await http.get("/tasks-list", auth.config);
      setRetrievedTasks(res.data);
    } catch (error) {
      console.log(error);
    }
  };

  const generateOptions = (optionName, name) => {
    if (retrievedTableList) {
      return retrievedTableList[optionName]?.map((option) => {
        return {
          id: option.id,
          name: option[name],
        };
      });
    }
  };
  

  const category = generateOptions("categories", "category");
  const service = generateOptions("services", "service");
  const priority = generateOptions("priority", "priority");

  useEffect(() => {
    getTasks();
    getTableList();
  }, []);
  return (
    <div>

      <AddTaskForm
        users={retrievedTableList["users"]}
        clients={retrievedTableList["clients"]}
        getTasks={getTasks}
        getTableList={getTableList}
        category={category}
        service={service}
        priority={priority}
      />
      <ClientsMessage/>
      <TasksTable
        tasks={retrievedTasks}
        getTasks={getTasks}
        options={retrievedTableList}
        category={category}
        service={service}
        priority={priority}
        users={retrievedTableList["users"]}
      />
    </div>
  );
}
