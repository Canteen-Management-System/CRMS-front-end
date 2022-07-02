import Form from "./form/Form";
import Joi from "joi-browser";
import Modal from "./modal/Modal";
import Imm from "./issue-form/Imm";

export default class Logss extends Form {
  state = {
    data: {
      Category: "",
      Company: "",
      Service: "",
      AssignTo: "",
      Status: "",
      Date: "",
    },
    errors: {},
  };

  schema = {
    Category: Joi.string().label("Category"),
    Company: Joi.string().label("Company"),
    Service: Joi.string().label("ServiceType"),
    AssignTo: Joi.string().label("AssignTo"),
    Status: Joi.string().label("Status"),
    Date: Joi.string().label("Date"),
  };

  toggleModal = () => {
    this.setState({ animation: !this.state.animation });
  };

  render() {
    this.doSubmit = () => {
      console.log("hello");
    };

    const {
      inputs,
      NewButton,
      UpdateButton,
      DeleteButton,
      selectStyle,
      modelstyle,
    } = formStyle;
    const category = [
      { id: 1, name: "Complaint" },
      { id: 2, name: "Suggestion" },
      { id: 3, name: "Request" },
    ];
    const status = [
      { id: 1, name: "Open" },
      { id: 2, name: "closed" },
      { id: 3, name: "pending" },
    ];
    const service = [
      { id: 1, name: "Quotation" },
      { id: 2, name: "appointment" },
      { id: 3, name: "technical support " },
      { id: 4, name: "other " },
    ];
    const clientType = [
      { id: 1, name: "Client" },
      { id: 2, name: "new customer" },
      { id: 3, name: "staff " },
      { id: 4, name: "other " },
    ];
    const priority = [
      { id: 1, name: "High" },
      { id: 2, name: "medium" },
      { id: 3, name: "Low" },
    ];

    return (
      <div className="flex flex-col items-center justify-center w-full h-full py-8 font-poppins">
        <button
          className="px-4 py-2 bg-red-300 rounded "
          onClick={this.toggleModal}
        >
          Open
        </button>
        <Modal
          modalTitle="Add New Task"
          formId="newStaffForm"
          animation={this.state.animation}
          toggleModal={this.toggleModal}
        >
          <form id="newStaffForm" onSubmit={this.handleForm}>
            {this.renderSelect("Category", "Category", category, modelstyle)}
            {this.renderInput(
              "name",
              "Name",
              "text",
              "Enter Client full name ",
              modelstyle
            )}
            {this.renderInput(
              "Company",
              "Company",
              "text",
              "Enter Comapy Name ",
              modelstyle
            )}
            {this.renderInput(
              "Address",
              "Address",
              "text",
              "Enter Address ",
              modelstyle
            )}
            {this.renderInput(
              "Mobile Number",
              "Mobile Number",
              "phone",
              " 07X-XXXX-XXX ",
              modelstyle
            )}
            {this.renderSelect(
              "client type",
              "client type",
              clientType,
              modelstyle
            )}

            {this.renderInput(
              "Email Address",
              "Email Address",
              "email",
              "Enter email",
              modelstyle
            )}
            {this.renderSelect(
              "service type",
              "service type",
              service,
              modelstyle
            )}

            {this.renderSelect("priority", "priority", priority, modelstyle)}
            <Imm />
          </form>
        </Modal>
      </div>
    );
  }
}

const formStyle = {
  inputs: {
    _input: "w-3/4  md:w-1/2 py-1 pl-2 rounded-sm",
    _label: "text-xl font-bold  text-white pr-4 text-white ",
    _container: "pb-6  w-full flex flex-row items-center bg-gray-300 ",
    _errorMsg: "text-center text-red-700",
  },

  UpdateButton:
    " bg-light-blue py-2 px-8 text-white rounded-sm hover:bg-[#616161] transition-all duration-300 cursor-pointer",
  NewButton:
    " bg-light-blue py-2 px-8 text-white rounded-sm hover:bg-[#616161] transition-all duration-300 cursor-pointer",
  DeleteButton:
    " bg-light-blue py-2 px-8 text-white rounded-sm hover:bg-[#616161] transition-all duration-300 cursor-pointer",
  selectStyle: {
    _label: "text-xl font-bold text-white pr-4 text-white ",
    _container:
      "pb-6  w-full flex flex-col items-left justify-left px-9  w-1/3 bg-red-300",
    _select: " w-3/4 md:w-1/2 py-1 pl-2 rounded-sm",
    _option: "w-3/4 md:w-1/2 py-1 pl-2 rounded-sm",
    _errorMsg: "text-red-700 text-center",
  },
  modelstyle: {
    _input: "w-3/4 md:w-1/2 py-1 pl-2 rounded-sm",
    _label: "text-xl font-bold text-white pr-4 text-black w-1/3 ",
    _container:
      "pb-6 px-6 py-3  w-full flex flex-col md:flex-row items-left justify-left ",
    _errorMsg: "",
  },
};

/*

<div>
                <Modal
                  modalTitle="Add New Staff"
                  formId="newStaffForm"
                  animation={this.state.animation}
                  toggleModal={this.toggleModal}
                >
                  <form
                    id="newStaffForm"
                    className="flex flex-col justify-center items-center w-3/4 md:w-1/3 h-1/2 bg-[#748DA6] rounded-md shadow-md"
                    onSubmit={this.handleForm}
                  >
                    {this.renderSelect(
                      "Category",
                      "Category",
                      category,
                      modelstyle
                    )}
                    {this.renderInput(
                      "name",
                      "Name",
                      "text",
                      "Enter Client full name ",
                      modelstyle
                    )}
                    {this.renderInput(
                      "Company",
                      "Company",
                      "text",
                      "Enter Comapy Name ",
                      modelstyle
                    )}
                    {this.renderInput(
                      "Address",
                      "Address",
                      "text",
                      "Enter Address ",
                      modelstyle
                    )}
                    {this.renderInput(
                      "Mobile Number",
                      "Mobile Number",
                      "phone",
                      " 07X-XXXX-XXX ",
                      modelstyle
                    )}
                    {this.renderSelect(
                      "client type",
                      "client type",
                      clientType,
                      modelstyle
                    )}

                    {this.renderInput(
                      "Email Address",
                      "Email Address",
                      "email",
                      "Enter email",
                      modelstyle
                    )}
                    {this.renderSelect(
                      "service type",
                      "service type",
                      service,
                      modelstyle
                    )}

                    {this.renderSelect(
                      "priority",
                      "priority",
                      priority,
                      modelstyle
                    )}
                    <Imm />
                  </form>
                </Modal>
              </div>

*/

/*

{/* <legend className="md:text-3xl pb-8 text-[#F2F2F2] py-5 px-5 font-bold">
            Logs
          </legend> 
           <div className="pb-6">
            {this.renderInput(
              "Company",
              "Company",
              "text",
              "Enter Company Name..",
              inputs
            )}

            {this.renderInput(
              "AssignTo",
              "AssignTo",
              "text",
              "Enter you AssignTo..",
              inputs
            )}

            {this.renderInput("Date", "Date", "text", "dd/mm/yy", inputs)}
          </div> 
          <div className="pb-6 ">
            {this.renderSelect("Service", "Service", service, selectStyle)}
            {this.renderSelect("Category", "Category", category, selectStyle)}

            {this.renderSelect("Status", "Status", status, selectStyle)}
          </div>

*/

/*
<form
          className="flex flex-col justify-center w-3/4 rounded-md items-left md:w-3/4 h-1/2"
          onSubmit={this.handleForm}
        >
          <div className="flex flex-col justify-around w-2/3 pb-8 mx-auto md:flex-row">
            <button
              className="bg-light-blue py-2 px-8 text-white rounded-sm hover:bg-[#616161] transition-all duration-300 cursor-pointer"
              onClick={this.toggleModal}
            >
              Add
            </button>
            {this.renderButton("Update", UpdateButton)}
            {this.renderButton("Delete", DeleteButton)}
          </div>
        </form>
*/
