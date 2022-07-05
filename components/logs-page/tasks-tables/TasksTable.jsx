import { useState, useEffect, useCallback } from "react";
import { PencilAltIcon } from "@heroicons/react/outline";
import TableHeader from "../../table/TableHeader";
import EditTask from "../EditTask";
import auth from "../../../lib/services/authService";
import http from "../../../lib/services/httpService";

function TasksTable({
  tasks,
  getTasks,
  options,
  category,
  service,
  priority,
  users,
}) {
  const [taskDetail, setTaskDetail] = useState(null);
  const [animation, setAnimation] = useState(false);
  const [taskId, setTaskId] = useState(null);

  let counter = 0;
  const tableHeader = [
    "#",
    "Category",
    "Name",
    "Company",
    "Mobile Number",
    "Service type",
    "Priority",
    "Status",
    "Assign To",
    "date",
    "Action",
  ];

  const filterTableData = (filteredBy, id, name) => {
    const items = options[filteredBy];
    const value = items?.filter((item) => item.id == id);
    try {
      return value[0]?.[name];
    } catch (error) {
      return "";
    }
  };

  const handleEditModal = () => {
    setAnimation(!animation);
  };

  const handelEdit = (id) => {
    getTaskData(id);
    handleEditModal();
  };

  const getTaskData = async (taskId) => {
    try {
      const res = await http.get(`task-detail/${taskId}`, auth.config);
      setTaskDetail(res.data);
    } catch (error) {
      console.log(error);
    }
  };








  return (
    <>
      {/* taskDetail &&  */}
      {taskDetail && (
        <EditTask
          taskDetail={taskDetail}
          animation={animation}
          category={category}
          service={service}
          priority={priority}
          users={users}
          handleEditModal={handleEditModal}
        />
      )}
      <div className="mx-auto overflow-x-scroll ">
        <table className="mx-auto text-white font-poppins logs-table">
          <TableHeader tableHead={tableHeader} bg="bg-gray-600" />
          <tbody>
            {tasks?.map((task, idx) => {
              return (
                <tr key={idx} className=" hover:bg-slate-700">
                  <td>{task.id && (counter = counter + 1)}</td>
                  <td>
                    {filterTableData("categories", task.category, "category")}
                  </td>
                  <td>
                    {filterTableData("clients", task.client, "full_name")}
                  </td>
                  <td>{filterTableData("clients", task.client, "company")}</td>
                  <td>
                    {filterTableData("clients", task.client, "phone_number")}
                  </td>

                  <td>
                    {filterTableData("services", task.service_type, "service")}
                  </td>
                  <td>
                    {filterTableData("priority", task.priority, "priority")}
                  </td>
                  <td>
                    <span
                      className={
                        task.status == "open"
                          ? "bg-red-400 px-4 py-2 rounded"
                          : "bg-green-400 px-4 py-2 rounded"
                      }
                    >
                      {task.status}
                    </span>
                  </td>
                  <td>
                    {filterTableData("users", task.assign_to, "first_name")}
                  </td>
                  <td>{task.date}</td>
                  <td>
                    {
                      <PencilAltIcon
                        className="w-6 h-6 cursor-pointer hover:text-orange-300"
                        onClick={() => handelEdit(task.id)}
                      />
                    }
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </>
  );
}

export default TasksTable;
