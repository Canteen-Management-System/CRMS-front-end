import React, { useState, useEffect } from "react";

import RenderTable from "../table/RenderTable";

function ClientsTable({ getClients, tableData }) {
  const [tableHeader, setTableHeader] = useState([]);
  useEffect(() => {
    if (tableData.length !== 0) {
      const headerKeys = Object.keys(tableData[0]);
      setTableHeader(headerKeys);
    }
  }, [tableData]);

  return <RenderTable tableHead={tableHeader} bodyData={tableData} />;
}

export default ClientsTable;
