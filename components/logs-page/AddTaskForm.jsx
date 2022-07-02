import { useState } from "react";
import NewClient from "./task-form/NewClient";
import Modal from "../modal/Modal";
import ExistingClientForm from "./task-form/ExistingClient";

export default function AddTaskForm({ options }) {
  const [animation, setAnimation] = useState(false);
  const [clientType, setClientType] = useState("");
  const [existingClient, setExistingClient] = useState(null);
  const { clients } = options;

  const toggleModal = () => {
    setAnimation(!animation);
  };

  const handleClientType = (event) => {
    setClientType(event.target.value);
  };

  const isPhoneExist = (e) => {
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
      <div>
        <button className="px-4 py-2 bg-red-300 rounded " onClick={toggleModal}>
          Open
        </button>
      </div>
      <Modal
        modalTitle="Add New Task"
        animation={animation}
        toggleModal={toggleModal}
      >
        <div>
          <label>Client Type</label>
          <select value={clientType} onChange={handleClientType}>
            <option value="" />
            <option value="new">New customer</option>
            <option value="existed">Existing customer</option>
          </select>
        </div>

        <div>
          {clientType == "new" ? (
            <>
              <NewClient toggleModal={toggleModal} options={options} />
            </>
          ) : (
            clientType && (
              <>
                <div>
                  <label htmlFor="phone">Phone number: </label>
                  <input name="phone" onChange={isPhoneExist} />
                </div>
                {existingClient && <ExistingClientForm />}
              </>
            )
          )}
        </div>
      </Modal>
    </div>
  );
}

[
  {
    id: 1,
    full_name: "Ahmed",
    phone_number: "+962790057526",
    email: "abd@hotmail.com",
    address: "shamasani",
    company: "Al mutakhamelah",
    created_by: 1,
  },
  {
    id: 2,
    full_name: "Nour Al Deen Hussein Rashid",
    phone_number: "+962791057526",
    email: "noureddein@gmail.com",
    address: "Al Rowaq, Ahmad Al Eifan St",
    company: "Al mutakhamelah",
    created_by: 1,
  },
  {
    id: 3,
    full_name: "Nour Al Deen Hussein Rashid",
    phone_number: "+962791257526",
    email: "2ureddein@gmail.com",
    address: "Al Rowaq, Ahmad Al Eifan St",
    company: "Al mutakhamelah",
    created_by: 1,
  },
  {
    id: 4,
    full_name: "Nour Al Deen Hussein Rashid",
    phone_number: "+962799957526",
    email: "n44eddein@gmail.com",
    address: "Al Rowaq, Ahmad Al Eifan St",
    company: "Al mutakhamelah",
    created_by: 1,
  },
  {
    id: 5,
    full_name: "Nour Al Deen Hussein Rashid",
    phone_number: "+962791057523",
    email: "nourdeddein@gmail.com",
    address: "Al Rowaq, Ahmad Al Eifan St",
    company: "Al mutakhamelah",
    created_by: 1,
  },
  {
    id: 6,
    full_name: "Nour Al Deen Hussein Rashid",
    phone_number: "+962790227526",
    email: "nou22reddein@gmail.com",
    address: "Al Rowaq, Ahmad Al Eifan St",
    company: "Al mutakhamelah",
    created_by: 1,
  },
  {
    id: 7,
    full_name: "Nour Al Deen Hussein Rashid",
    phone_number: "+962790054426",
    email: "44noureddein@gmail.com",
    address: "Al Rowaq, Ahmad Al Eifan St",
    company: "Al mutakhamelah",
    created_by: 1,
  },
];
