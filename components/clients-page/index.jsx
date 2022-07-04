import React, { useState, useEffect } from "react";
import ClientsTable from "./ClientsTable";
import AddClientForm from "./AddClientForm";
import http from "../../lib/services/httpService";
import auth from "../../lib/services/authService";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function RenderClientsPage() {
  const [tableData, setTableData] = useState([]);
  const [animation, setAnimation] = useState(false);

  const deleteLocation = async (id) => {
    console.log(id);
    try {
      const res = await http.delete(`/client-detail/${id}`, auth.config);
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

  const handleAddClient = async (data) => {
    await http.post("/clients", data, auth.config);
    getClients();
  };

  const toggleModal = () => {
    setAnimation(!animation);
  };

  useEffect(() => {
    getClients().then((res) => setTableData(res));
  }, []);

  return (
    <div>
      <div className="flex justify-end pb-8 mr-16">
        <button
          className="px-4 py-2 text-white bg-gray-500 rounded "
          onClick={toggleModal}
        >
          Add new client
        </button>
      </div>
      <AddClientForm
        handleAddClient={handleAddClient}
        animation={animation}
        toggleAddModal={toggleModal}
      />
      <ClientsTable
        getClients={getClients}
        tableData={tableData}
        deleteLocation={deleteLocation}
      />
      <ToastContainer />
    </div>
  );
}
