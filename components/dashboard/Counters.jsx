import { useState, useEffect } from "react";
import auth from "../../lib/services/authService";
import http from "../../lib/services/httpService";
function Counters() {
  const [retrievedTasks, setRetrievedTasks] = useState([]);
  const getTasks = async () => {
    try {
      const res = await http.get("/tasks-list", auth.config);
      setRetrievedTasks(res.data);
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    getTasks();
  }, []);
  console.log(retrievedTasks);

  // let TasksStatus = ListA.filter((itemA)=> {
  //   return !ListB.find((itemB)=> {
  //     return item.id === itemP.id;
  //   })
  // })

  var today = new Date();
  var dd = String(today.getDate()).padStart(2, "0");
  var mm = String(today.getMonth() + 1).padStart(2, "0"); //January is 0!
  var yyyy = today.getFullYear();

  today = dd + "/" + mm + "/" + yyyy;
  // console.log(retrievedTasks[0].date)
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
  // for (let i=0; i<retrievedTasks.length; i++) {
  //   if (retrievedTasks[i].status=="open")
  //   setOpenTasks(retrievedTasks[i].s
  //   else
  //   closedTasks.push(retrievedTasks[i])
  //   if (retrievedTasks[i].status=="open")
  //   openTasks.push(retrievedTasks[i])
  //   else
  //   closedTasks.push(retrievedTasks[i])
  // }
  return (
    <div className="flex items-stretch gap-20">
      <div className="w-40 h-20 text-xl text-center bg-green-700 border rounded-lg border-slate-700">
        Total Closed
        <br />
        {closed.length}
      </div>
      <div className="w-40 h-20 text-xl text-center bg-green-700 border rounded-lg border-slate-700">
        Total Pending
        <br />
        {open.length}
      </div>
      <div className="w-40 h-20 text-xl text-center bg-green-700 border rounded-lg border-slate-700">
        ClosedToday
        <br />
        {closedToday.length}
      </div>
      <div className="w-40 h-20 text-xl text-center bg-green-700 border rounded-lg border-slate-700">
        PendingToday
        <br />
        {openToday.length}
      </div>
    </div>
  );
}

export default Counters;
