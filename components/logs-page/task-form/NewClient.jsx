import Joi from "joi-browser";
import Form from "../../form/Form";
import Imm from "../../issue-form/Imm";
import ActionTaken from "../../issue-form/ActionTaken";
import AssignTo from "../../issue-form/AssignTo";

export default class NewClient extends Form {
  constructor(props) {
    super(props);
  }
  state = {
    data: {
      category: "",
      company: "",
      priority: "",
      service_type: "",
      name: "",
      address: "",
      phone_number: "",
      email: "",
      name: "",

      // assign_to: "",
      //   action_taken: "",
      //   status: "",
    },
    errors: {},
    decision: "",
  };

  schema = {
    company: Joi.string().label("Company"),
    category: Joi.string().required().label("Category"),
    priority: Joi.string().required().label("Priority"),
    service_type: Joi.string().required().label("Service Type"),
    name: Joi.string().required().label("Name"),
    address: Joi.string().allow("").label("Address"),
    phone_number: Joi.number().required().label("Mobile number"),
    email: Joi.string().email().required(),
    action_taken: Joi.string(),
    // assign_to: Joi.string().label("AssignTo"),
    // status: Joi.string().label("Status"),
  };

  toggleModal = () => {
    this.setState({ animation: !this.state.animation });
  };

  handleDecision = (e) => {
    this.setState({ decision: e.target.value });
  };
  render() {
    const { modelStyle } = formStyle;

    this.doSubmit = () => {
      if (this.state.decision == "Yes") {
        this.schema["action_taken"] = Joi.string().required().label("AssignTo");
        this.setState((prev) => {
          prev.data["action_taken"] = "";
        });
      }
      console.log("why");
      console.log(this.state.data);
    };

    this.generateOptions = (optionName, name) => {
      return this.props.options[optionName].map((option) => {
        return {
          id: option.id,
          name: option[name],
        };
      });
    };

    const category = this.generateOptions("categories", "category");
    const service = this.generateOptions("services", "service");
    const priority = this.generateOptions("priority", "priority");

    return (
      <div className="flex flex-col items-center justify-center w-full h-full py-8 font-poppins">
        <form
          onSubmit={this.handleForm}
          className="w-1/2 mx-auto"
          id="newClientForm"
        >
          <div className="flex flex-row">
            {this.renderSelect("category", "Category", category, modelStyle)}
            {this.renderSelect("priority", "Priority", priority, modelStyle)}
            {this.renderSelect(
              "service_type",
              "Service type",
              service,
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
            "company",
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
            "phone_number",
            "Mobile Number",
            "phone",
            " 07X-XXXX-XXX ",
            modelStyle
          )}
          {this.renderInput(
            "email",
            "Email Address",
            "email",
            "Enter email",
            modelStyle
          )}
          <div className="flex flex-col justify-center w-full pb-6 md:flex-row items-left px-9">
            <div>
              <label className="pr-4 text-lg text-black ">
                Immediate resolution
              </label>
              <select
                value={this.state.decision}
                onChange={this.handleDecision}
              >
                <option className="pr-4 text-lg text-white " />
                <option value="Yes">Yes</option>
                <option value="No">No</option>
              </select>
            </div>
            <>
              {this.state.decision == "Yes" ? (
                <>
                  <ActionTaken />
                </>
              ) : (
                this.state.decision && <AssignTo />
              )}
            </>
          </div>
          {/* <Imm id="newClientForm" /> */}
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
        ;
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

function sdf() {}
