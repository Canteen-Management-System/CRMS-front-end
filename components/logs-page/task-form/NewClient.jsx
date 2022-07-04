import Joi from "joi-browser";
import Form from "../../form/Form";
import AddClientForm from "../../clients-page/AddClientForm";
import http from "../../../lib/services/httpService";
import auth from "../../../lib/services/authService";

export default class NewClient extends Form {
  constructor(props) {
    super(props);
  }

  state = {
    data: {
      category: "",
      priority: "",
      service_type: "",
      expectation: "",
      details: "",
      staff: "",
      department: "",
      action_taken: "",
    },
    errors: {},
    decision: "",
    animation: false,
    newClientID: null,
  };

  schema = {
    category: Joi.string().required().label("Category"),
    priority: Joi.string().required().label("Priority"),
    service_type: Joi.string().required().label("Service Type"),
    action_taken: Joi.string().allow(""),
    expectation: Joi.string().allow(""),
    details: Joi.string().allow(""),
    department: Joi.string().allow(""),
    staff: Joi.string().allow(""),
  };

  toggleModal = () => {
    this.setState({ animation: !this.state.animation });
  };

  handleDecision = (e) => {
    this.setState({ decision: e.target.value });
  };
  clearForm = () => {
    this.setState({
      data: {
        category: "",
        priority: "",
        service_type: "",
        expectation: "",
        details: "",
        staff: "",
        department: "",
        action_taken: "",
      },
      decision: "",
    });
  };
  render() {
    const { modelStyle } = formStyle;
    const { category, service, priority } = this.props;

    this.doSubmit = async () => {
      console.log(this.state.data);
      const user = auth.getCurrentUser();
      const taskDetails = this.state.data;

      taskDetails["assign_to"] = user?.user_id;
      taskDetails["user"] = user?.user_id;
      taskDetails["status"] = "open";
      if (this.state.decision == "Yes") taskDetails["status"] = "closed";
      taskDetails["client"] = this.state.newClientID;

      try {
        const res = await http.post("/tasks-list", taskDetails, auth.config);
        this.props.getTasks();
        this.props.getTableList();
        this.clearForm();
        this.props.toggleModal();
      } catch (error) {
        console.log(error);
      }
    };

    this.toggleAddModal = () => {
      this.setState({ animation: !this.state.animation });
    };

    this.handleAddClient = async (data) => {
      try {
        const res = await http.post("/clients", data, auth.config);
        const newClientID = res.data.id;
        this.setState({ newClientID });
      } catch (error) {
        console.log(error);
      }
    };

    return (
      <>
        <AddClientForm
          handleAddClient={this.handleAddClient}
          animation={this.state.animation}
          toggleAddModal={this.toggleAddModal}
        />
        <div className="flex flex-col items-center justify-center w-full h-full py-8 font-poppins">
          <div className="flex justify-end pb-8 mr-16">
            <button
              className="px-4 py-2 text-white bg-gray-500 rounded "
              onClick={this.toggleAddModal}
            >
              Add new client
            </button>
          </div>
          {this.state.newClientID && (
            <form
              onSubmit={this.handleForm}
              className="w-1/2 mx-auto"
              id="newClientForm"
            >
              <div className="flex flex-row">
                {this.renderSelect(
                  "category",
                  "Category",
                  category,
                  modelStyle
                )}
                {this.renderSelect(
                  "priority",
                  "Priority",
                  priority,
                  modelStyle
                )}
                {this.renderSelect(
                  "service_type",
                  "Service type",
                  service,
                  modelStyle
                )}
              </div>
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
                      <div className="flex flex-col items-center justify-center w-screen h-full font-poppins ">
                        <label className="pr-4 text-lg text-black ">
                          Action Taken
                        </label>
                        <textarea
                          id="action_taken"
                          name="action_taken"
                          rows="4"
                          cols="50"
                          onChange={this.handleChange}
                        />
                      </div>
                    </>
                  ) : (
                    this.state.decision && (
                      <div className="flex flex-col items-center justify-center w-screen h-full font-poppins ">
                        <label className="pr-4 text-lg text-white ">
                          Details
                        </label>
                        <textarea
                          id="details"
                          name="details"
                          rows="4"
                          cols="50"
                          onChange={this.handleChange}
                        />
                        <label className="pr-4 text-lg text-white ">
                          Expectation
                        </label>
                        <textarea
                          id="expectation"
                          name="expectation"
                          rows="4"
                          cols="50"
                          onChange={this.handleChange}
                        />
                        <legend className="md:text-xl pb-8 text-[#F2F2F2] py-5">
                          Assign To
                        </legend>

                        <div className="flex flex-col justify-center w-full pb-6 md:flex-row items-left px-9">
                          <label className="w-1/3 pr-4 text-lg text-white ">
                            Staff
                          </label>
                          <select onChange={this.handleChange} name="staff">
                            <option
                              className="pr-4 text-lg text-white "
                              value=" "
                            />
                            {this.props.options?.users.map((user) => (
                              <option key={user.id} value={user.id}>
                                {`${user.first_name} ${user.last_name}`}
                              </option>
                            ))}
                          </select>
                        </div>
                      </div>
                    )
                  )}
                </>
              </div>
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
          )}
        </div>
      </>
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
