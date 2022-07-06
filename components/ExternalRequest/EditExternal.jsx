import "react-toastify/dist/ReactToastify.css";
import { ToastContainer, toast } from "react-toastify";
import Joi from "joi-browser";
import Modal from "../../components/modal/Modal"
import Form from "../../components/form/Form"
import auth from "../../lib/services/authService"
import http from "../../lib/services/httpService";

export default class EditExternal extends Form {
  state = {
    data: {
      taskId: null,
      category: "",
      priority: "",
      service_type: "",
      action_taken: "",
      details: "",
      expectation: "",
      assign_to: "",
    },
    decision: "",
    errors: {},
  };

  schema = {
    taskId: Joi.string(),
    category: Joi.string().required().label("Category"),
    priority: Joi.string().required().label("Priority"),
    service_type: Joi.string().required().label("service"),
    action_taken: Joi.string().allow(""),
    details: Joi.string().allow(""),
    expectation: Joi.string().allow(""),
    assign_to: Joi.string().allow(""),
  };

  mapToViewModel = (task) => {
    return {
        Name : task.client_name,
        company:task.client_company,
        phone: task.client_phone_number.toString(),
        email: task.client_email.toString(),
        category: task.task_category,
        service_type: task.task_service_type,
        details: task.task_details,
    };
  };

  componentDidMount() {
    const data = this.mapToViewModel(this.props.taskDetail);
    console.log(this.props)
    const decision = this.props.taskDetail.status == "open" ? "No" : "Yes";
    this.setState({ data, decision });
  }

  componentDidUpdate(prevProps, prevState) {
    if (prevProps.taskDetail.id != this.props.taskDetail.id) {
      const data = this.mapToViewModel(this.props.taskDetail);
      const decision = this.props.taskDetail.status == "open" ? "No" : "Yes";
      this.setState({ data, decision });
    }
  }

  handleDecision = (e) => {
    this.setState({ decision: e.target.value });
  };

  render() {
    const { users, taskDetail } = this.props;
    const category = [
        { _id: 1, name: "Complaint" },
        { _id: 2, name: "Suggestion" },
        { _id: 3, name: "Request" },
        { _id: 4, name: "other" },
      ];
      const service = [
        { _id: 1, name: "Quotation" },
        { _id: 2, name: "appointment" },
        { _id: 3, name: "technical support " },
        { _id: 4, name: "other " },
      ];
      const priority = [
        { _id: 1, name: "Low" },
        { _id: 2, name: "High" },
      ];

    this.doSubmit = async () => {
      const user = auth.getCurrentUser();
      const { data, decision } = this.state;
      const editedTask = { ...data };

      if (decision == "Yes") editedTask["assign_to"] = user?.user_id;

      editedTask["status"] = "open";
      if (decision == "Yes") editedTask["status"] = "closed";

      editedTask["user"] = user?.user_id;
      editedTask["client"] = taskDetail.client;

      try {
        const res = await http.put(
          `/task-detail/${editedTask.taskId}`,
          editedTask,
          auth.config
        );
        toast.success("Task updated successfully!");
        this.props.handleEditModal();
        this.props.getTaskData();
      } catch (error) {
        console.log(error);
        toast.success("Something went wrong!");
      }
    };



    return (
      <>
        <Modal animation={this.props.animation} modalTitle="Edit task">
          <form onSubmit={this.handleForm} className="w-1/2 mx-auto">
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
            <div className="flex flex-col justify-center w-full pb-6 items-left px-9">
              <div className="pb-3 mx-auto ">
                <label className="pr-4 mx-auto text-lg text-black">
                  Immediate resolution
                </label>
                <select
                  name="status"
                  value={this.state.decision}
                  onChange={this.handleDecision}
                >
                  <option className="pr-4 text-lg text-black " />
                  <option value="Yes">Yes</option>
                  <option value="No">No</option>
                </select>
              </div>
              <>
                {this.state.decision == "Yes" ? (
                  <>
                    <div className="flex flex-col items-center justify-center h-full font-poppins ">
                      <label className="pr-4 text-lg text-black ">
                        Action Taken
                      </label>
                      <textarea
                        id="action_taken"
                        name="action_taken"
                        rows="4"
                        cols="50"
                        onChange={this.handleChange}
                        value={this.state.data.action_taken}
                      />
                    </div>
                  </>
                ) : (
                  this.state.decision && (
                    <div className="flex flex-col items-center justify-center h-full font-poppins ">
                      <label className="pr-4 text-lg text-black ">
                        Details
                      </label>
                      <textarea
                        id="details"
                        name="details"
                        rows="4"
                        cols="50"
                        onChange={this.handleChange}
                        value={this.state.data.details}
                      />
                      <label className="pr-4 text-lg text-black ">
                        Expectation
                      </label>
                      <textarea
                        id="expectation"
                        name="expectation"
                        rows="4"
                        cols="50"
                        onChange={this.handleChange}
                        value={this.state.data.expectation}
                      />
                      <legend className="py-5 pb-8 text-black md:text-xl">
                        Assign To
                      </legend>

                      <div className="flex flex-col justify-center w-full pb-6 md:flex-row items-left px-9">
                        <label className="w-1/3 pr-4 text-lg text-black ">
                          Staff
                        </label>
                        <select
                          onChange={this.handleChange}
                          name="assign_to"
                          defaultValue={this.state.data.assign_to}
                        >
                          <option className="pr-4 text-lg text-black " />
                          {users?.map((user) => (
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
                onClick={this.props.handleEditModal}
              >
                Cancel
              </button>
            </div>
          </form>
        </Modal>
        <ToastContainer />
      </>
    );
  }
}

const modelStyle = {
  _input: "p-2 rounded-lg w-full",
  _label: "w-40 text-right pr-4 ",
  _container: "font-poppins  p-4 mb-4 flex flex-row justify-left items-center",
  _errorMsg: "text-red-400 text-sm",
  _inputContainer: "w-11/12",
};
