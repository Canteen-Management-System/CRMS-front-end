import React, { useState, useEffect } from "react";
import ClientsTable from "./ClientsTable";
import AddClientForm from "./AddClientForm";
import http from "../../lib/services/httpService";
import auth from "../../lib/services/authService";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function RenderClientsPage() {
  const [tableData, setTableData] = useState([]);

  const deleteLocation = async (id) => {
    console.log(id)
    try {
       const res= await http.delete(`/client-detail/${id}`, auth.config);
       getClients();
    } catch (error) {
      console.log(error);
    }
  };


  const getClients = async () => {
    try {
      const res = await http.get("/clients", auth.config);
      setTableData(res.data);
      return res.data;
    } catch (error) {
      console.log(error.response);
    }
  };

  useEffect(() => {
    console.log(tableData);
    getClients().then((res) => setTableData(res));
  }, []);

  return (
    <div>
      
      <AddClientForm getClients={getClients} />
      <ClientsTable getClients={getClients} tableData={tableData} deleteLocation={deleteLocation}/>
      <ToastContainer />
    </div>
  );
}
