import React, { useState, useEffect } from "react";
import ClientsTable from "./ClientsTable";
import AddClientForm from "./AddClientForm";
import http from "../../lib/services/httpService";
import auth from "../../lib/services/authService";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import ClientsMessage from "../logs-page/ClientsMessage";

export default function RenderClientsPage() {
  const [tableData, setTableData] = useState([]);
  const [animation, setAnimation] = useState(false);
  const [emailAnimation, setEmailAnimation] = useState(false);

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

  const handleToggleEmailModal = () => {
    setEmailAnimation(!emailAnimation);
  };
  useEffect(() => {
    console.log(tableData);
    getClients().then((res) => setTableData(res));
  }, []);

  return (
    <div>
      <div className="flex justify-between w-1/4 mx-auto mr-16">
        <button
          className="px-4 py-2 text-white bg-gray-500 rounded "
          onClick={toggleModal}
        >
          Add new client
        </button>
        <button
          type="button"
          className="px-4 py-2 text-white bg-purple-700 rounded"
          onClick={handleToggleEmailModal}
        >
          Send announcement
        </button>
      </div>

      <ClientsMessage
        handleToggleEmailModal={handleToggleEmailModal}
        animation={emailAnimation}
      />
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
