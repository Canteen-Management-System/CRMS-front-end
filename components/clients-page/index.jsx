import React from "react";
import ClientsTable from "./ClientsTable";
import AddClientForm from "./AddClientForm";

export default function RenderClientsPage() {
  return (
    <div>
      <AddClientForm />
      <ClientsTable />
    </div>
  );
}
