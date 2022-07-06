import { useState } from "react";
import NewClient from "./task-form/NewClient";
import Modal from "../modal/Modal";
import ExistingClientForm from "./task-form/ExistingClient";

export default function AddTaskForm({
  clients,
  users,
  getTasks,
  getTableList,
  category,
  service,
  priority,
  
}) {
  const [animation, setAnimation] = useState(false);
  const [clientType, setClientType] = useState("");
  const [existingClient, setExistingClient] = useState(null);

  const toggleModal = () => {
    setAnimation(!animation);
  };

  const handleClientType = (event) => {
    setClientType(event.target.value);
  };

  const isClientExist = (e) => {
    const mobileNumber = e.target.value;
    const clientInfo = clients?.filter(
      (client) => client?.phone_number == mobileNumber
    );
    if (clientInfo) {
      return setExistingClient(clientInfo[0]);
    }
    return setExistingClient(null);
  };

  return (
    <div>
      (
      <div className="flex justify-end pb-12 pr-8 text-white">
        <button
          className="px-4 py-2 bg-gray-500 rounded "
          onClick={toggleModal} 
        >
          Add task
        </button>
      </div>
      )
      <Modal
        modalTitle="Add New Task"
        animation={animation}
        toggleModal={toggleModal}
        // sendEmail = {sendEmail}
      >
        <div className="flex flex-row justify-center w-1/2 py-4 mx-auto font-poppins">
          <div className="mx-auto">
            <label className="pr-2 font-semibold">Client Type: </label>
            <select
              value={clientType}
              onChange={handleClientType}
              className="px-2 py-1 rounded-sm"
            >
              <option value="" />
              <option value="new">New customer</option>
              <option value="existed">Existing customer</option>
            </select>
          </div>
        </div>

        <div className="py-4 mx-auto ">
          {clientType == "new" ? (
            <>
              <NewClient
                toggleModal={toggleModal}
                getTasks={getTasks}
                getTableList={getTableList}
                category={category}
                service={service}
                priority={priority}
                users={users}
              />
            </>
          ) : (
            clientType && (
              <>
                <div className="flex flex-row justify-center w-1/2 py-4 mx-auto">
                  <label htmlFor="phone" className="pr-2 font-semibold">
                    Phone number:{" "}
                  </label>
                  <input
                    name="phone"
                    onChange={isClientExist}
                    placeholder="+962XXXXXXXXX"
                    className="px-2 py-1 rounded-sm"
                  />
                </div>
                {existingClient && (
                  <ExistingClientForm
                    users={users}
                    toggleModal={toggleModal}
                    clientInfo={existingClient}
                    getTasks={getTasks}
                    category={category}
                    service={service}
                    priority={priority}
                  />
                )}
              </>
            )
          )}
        </div>
      </Modal>
    </div>
  );
}
