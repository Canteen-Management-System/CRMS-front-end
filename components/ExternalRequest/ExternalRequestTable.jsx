import React, { useState, useEffect } from "react";
import TableHeader from "../table/TableHeader";
import TableFooter from "../table/TableFooter";
import XLSX from "xlsx";
import auth from "../../lib/services/authService";
import http from "../../lib/services/httpService";
import { TableIcon } from "@heroicons/react/outline";
import EditExternal from "../ExternalRequest/EditExternal"




export default function ExteralRequestTable() {
const [tableData, setTableData] = useState([]);
const [taskId, setTaskId] = useState(null);



// delete function 
const deleteLocation = async (id) => {
  console.log(id);
  try {
    const res = await http.delete(`/clientReq-detail/${id}`);
    getExternalRequest();
  } catch (error) {
    console.log(error);
  }
};

// get  the data from backend
const getExternalRequest = async () => {
  try {
    const res = await http.get("/clientReq-list", auth.config);
    setTableData(res.data);
    return res.data;
  }
   catch (error) {
    console.log(error.response);
  }
};
useEffect(() => {
    getExternalRequest().then((res) => setTableData(res));
  }, []);

  let counter = 0;
  const [q,setQ]=useState("");
  const [searchcolumns,setSearchcolumns] = useState(["id"])
  let  t = 0
  function search(rows){
    return rows.filter((row) =>
    searchcolumns.some((column) => row[column].toString().toLowerCase().indexOf(q.toLowerCase())>-1
      )
    );
  }
  const columns = tableData[0] && Object.keys(tableData[0]);





  const handleExport = () =>{
        XLSX = require('xlsx');
        var wb = XLSX.utils.book_new(),
        ws = XLSX.utils.json_to_sheet(search(tableData))

        XLSX.utils.book_append_sheet(wb,ws,"Requests");
        XLSX.writeFile(wb,"ExternalRequestList.xlsx");
  };


  const [tableHeader, setTableHeader] = useState([]);
  useEffect(() => {
    if (tableData.length !== 0) {
      const headerKeys = Object.keys(tableData[0]);
      setTableHeader(headerKeys);
    }
  }, [tableData]);

  // Handle solve the task 
  const [animation, setAnimation] = useState(false);

  const handleEditModal = () => {
    setAnimation(!animation);
  };


  const handelEdit = (id) => {
    getTaskData(id)
    handleEditModal();
  };
  const [taskDetail, setTaskDetail] = useState(null);
  const getTaskData = async (taskId) => {
    try {
      const res = await http.get(`clientReq-detail/${taskId}`);
      setTaskDetail(res.data);
    } catch (error) {
      console.log(error);
    }
  };

  const [retrievedUser, setretrievedUser] = useState([]);
  const getUser = async () => {
    try {
      const resUser = await http.get("/users", auth.config);
      setretrievedUser(resUser.data);
      } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    getUser();
  }, []);
  console.log(taskDetail)
  return (
    <>
    {taskDetail ? (
      <EditExternal
        taskDetail={taskDetail}
        animation={animation}
        handleEditModal={handleEditModal}
        getTaskData={tableData}
        users={retrievedUser}
      />
    ) : null}
    <div>
    <section  className="bg-gray-500 h-50 p-8 w-full"> 
        

     <input className="w-full h-10 px-3 rounded mb-8 focus:outline-none focus:shadow-outline text-xl px-8 shadow-lg"  type="search" placeholder="Search..." value={q} onChange={(e)=> setQ(e.target.value)} />
    {columns &&
      columns.map((column)=>( 
      <label  key={t+=1} className="mx-4 font-poppins text-white " >

        <input 
        className="mx-2 "
        type="checkbox"
        checked = {searchcolumns.includes(column)}
        onChange={(e)=>{
          const checked = searchcolumns.includes(column);
        setSearchcolumns((prev) =>
        checked
        
        ? prev.filter((sc)=> sc !== column)
      : [...prev, column]
      );
      }}
    />
    {column}
      </label>
    ))}

      <button className="px-8 py-2   ml-12 mb-5 text-black bg-white  rounded" onClick={handleExport}>Export</button>

  </section>
    <table className="text-white font-poppins logs-table ml-12 pl-8 mt-8">
      <TableHeader tableHead={tableHeader} bg="bg-gray-600"/>
      <tbody>
      {search(tableData).map((row, rowIdx) => {
        return (
          <tr key={rowIdx} className=" hover:bg-slate-700">
            {tableHeader.map((head, idx) => {
              return (
                <td
                  key={idx}
                  className="p-1 px-8 py-2 text-center border rounded-lg border-slate-700"
                >
                  {head == "id" ? (counter = counter + 1) : row[head]}
                </td>
                
              );
            })}
            <td className="p-1 text-center border rounded-lg border-slate-700">
            <td>
                    <TableIcon
                      className="w-6 h-6 cursor-pointer hover:text-orange-300"
                      onClick={() => handelEdit(row.id)}
                    />
                  </td>
              </td>
          </tr>
        );
      })}
    </tbody>
      <TableFooter />

    </table>
    </div>
    </>
  );
}