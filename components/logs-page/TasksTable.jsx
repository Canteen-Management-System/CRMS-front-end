import TableHeader from "../table/TableHeader";
import { PencilAltIcon } from "@heroicons/react/outline";
function TasksTable({ tasks, getTasks, tableList }) {
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
    const items = tableList[filteredBy];
    const value = items?.filter((item) => item.id == id);
    try {
      return value[0]?.[name];
    } catch (error) {
      return "";
    }
  };

  const handelEdit = (taskId) => {
    console.log(taskId);
  };

  return (
    <div className="mx-8 overflow-y-scroll">
      <table className="text-white font-poppins logs-table">
        <TableHeader tableHead={tableHeader} bg="bg-gray-600" />
        <tbody>
          {tasks?.map((task, idx) => {
            return (
              <tr key={idx} className=" hover:bg-slate-700">
                <td>{task.id && (counter = counter + 1)}</td>
                <td>
                  {filterTableData("categories", task.category, "category")}
                </td>
                <td>{filterTableData("clients", task.client, "full_name")}</td>
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
  );
}

export default TasksTable;
