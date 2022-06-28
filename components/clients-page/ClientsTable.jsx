import React, { useState, useEffect } from "react";
import http from "../../lib/services/httpService";
import auth from "../../lib/services/authService";
import RenderTable from "../table/RenderTable";

function ClientsTable() {
  const [tableData, setTableData] = useState([]);
  const [tableHeader, setTableHeader] = useState([]);

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
    getClients();
  }, []);

  useEffect(() => {
    if (tableData.length !== 0) {
      const headerKeys = Object.keys(tableData[0]);
      setTableHeader(headerKeys);
    }
  }, [tableData]);

  return <RenderTable tableHead={tableHeader} bodyData={tableData} />;
}

export default ClientsTable;
