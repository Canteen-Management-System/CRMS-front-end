import Joi from "joi-browser";
import Form from "../../form/Form";
import Modal from "../../modal/Modal";
import Imm from "../../issue-form/Imm";

export default class ExistingClientForm extends Form {
  state = {
    data: {
      Category: "",
      Company: "",
      Service: "",
      AssignTo: "",
      Status: "",
      Date: "",
      name: "",
      address: "",
    },
    errors: {},
  };

  schema = {
    name: Joi.string().required().label("Name"),
    Category: Joi.string().label("Category"),
    Company: Joi.string().label("Company"),
    Service: Joi.string().label("ServiceType"),
    AssignTo: Joi.string().label("AssignTo"),
    Status: Joi.string().label("Status"),
    Date: Joi.string().label("Date"),
    address: Joi.string().allow("").label("Address"),
  };

  toggleModal = () => {
    this.setState({ animation: !this.state.animation });
  };

  render() {
    this.doSubmit = () => {
      console.log("hello");
    };
    console.log(this.props.options);
    const {
      inputs,
      NewButton,
      UpdateButton,
      DeleteButton,
      selectStyle,
      modelStyle,
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
        <form onSubmit={this.handleForm} className="w-1/2 mx-auto">
          <div className="flex flex-row">
            {this.renderSelect("Category", "Category", category, modelStyle)}
            {this.renderSelect("priority", "Priority", priority, modelStyle)}
            {this.renderSelect(
              "service type",
              "Service type",
              service,
              modelStyle
            )}
            {this.renderSelect(
              "client type",
              "Client type",
              clientType,
              modelStyle
            )}
          </div>
          {this.renderInput(
            "name",
            "Name",
            "text",
            "Enter Client full name ",
            modelStyle
          )}
          {this.renderInput(
            "Company",
            "Company",
            "text",
            "Enter Company Name ",
            modelStyle
          )}
          {this.renderInput(
            "address",
            "Address",
            "text",
            "Enter Address ",
            modelStyle
          )}
          {this.renderInput(
            "Mobile Number",
            "",
            "phone",
            " 07X-XXXX-XXX ",
            modelStyle
          )}

          {this.renderInput(
            "Email Address",
            "Email Address",
            "email",
            "Enter email",
            modelStyle
          )}

          <Imm />
          <div className="flex flex-row w-1/2 mx-auto justify-evenly">
            {this.renderButton(
              "Submit",
              "px-4 py-2 mt-4 text-white bg-green-400 rounded"
            )}
            <button
              type="button"
              className="px-4 py-2 mt-4 text-white bg-red-400 rounded"
              onClick={this.props.toggleModal}
            >
              Cancel
            </button>
          </div>
        </form>
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
    _label: "text-xl font-bold text-white pr-4 text-white",
    _container:
      "pb-6  w-full flex flex-col items-left justify-left px-9  w-1/3 bg-red-300",
    _select: " w-3/4 md:w-1/2 py-1 pl-2 rounded-sm",
    _option: "w-3/4 md:w-1/2 py-1 pl-2 rounded-sm",
    _errorMsg: "text-red-700 text-center",
  },
  modelStyle: {
    _input: "p-2 rounded-lg w-full",
    _label: "w-40 text-right pr-4 ",
    _container:
      "font-poppins  p-4 mb-4 flex flex-row justify-left items-center",
    _errorMsg: "text-red-400 text-sm",
    _inputContainer: "w-11/12",
  },
};
