import Form from "../form/Form";
import Modal from "../modal/Modal";
import Joi from "joi-browser";
import auth from "../../lib/services/authService";
import http from "../../lib/services/httpService";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const formStyle = {
  input: {
    _input: "p-2 rounded-lg w-full",
    _label: "w-40 text-right pr-4 ",
    _container:
      "font-poppins  p-4 mb-4 flex flex-row justify-left items-center",
    _errorMsg: " text-red-400 text-sm",
    _inputContainer: "w-11/12",
  },
};

export default class AddClientForm extends Form {
  constructor(props) {
    super(props);
  }
  state = {
    data: {
      full_name: "",
      phone_number: "",
      email: "",
      address: "",
      company: "",
    },
    errors: {},
    animation: false,
  };

  schema = {
    full_name: Joi.string().required(),
    phone_number: Joi.number().required(),
    email: Joi.string().email().required(),
    address: Joi.string().allow(""),
    company: Joi.string().allow(""),
  };

  toggleModal = () => {
    this.setState({ animation: !this.state.animation });
  };

  render() {
    this.clearForm = () => {
      this.setState({
        data: {
          full_name: "",
          phone_number: "",
          email: "",
          address: "",
          company: "",
        },
      });
    };

    this.getErrorValues = (error) => {
      const errors = Object.values(error);
      return errors.join(", ");
    };

    this.doSubmit = async () => {
      const { user_id } = auth.getCurrentUser();
      this.state.data["created_by"] = user_id;

      try {
        await http.post("/clients", this.state.data, auth.config);
        toast.success("Wow, Client added successfully!");
        this.props.getClients();
        this.clearForm();
        window.location.href = "/Clients";
      } catch (err) {
        const errors = this.getErrorValues(err.response.data);
        toast.error(errors);
      }
    };

    return (
      <div className="pt-8">
        <div className="flex justify-end pb-8 mr-16">
          <button
            className="px-4 py-2 text-white bg-gray-500 rounded "
            onClick={this.toggleModal}
          >
            Add new client
          </button>
        </div>
        <Modal
          modalTitle="Add new client"
          animation={this.state.animation}
          toggleModal={this.toggleModal}
          formId="clientForm"
        >
          <form className="w-1/2 mx-auto " onSubmit={this.handleForm}>
            {this.renderInput(
              "full_name",
              "Full name",
              "text",
              "Enter client name",
              formStyle.input
            )}
            {this.renderInput(
              "phone_number",
              "Phone number",
              "text",
              "Enter client phone",
              formStyle.input
            )}
            {this.renderInput(
              "email",
              "Email",
              "email",
              "Enter client email",
              formStyle.input
            )}
            {this.renderInput(
              "address",
              "Address",
              "text",
              "Enter client address",
              formStyle.input
            )}
            {this.renderInput(
              "company",
              "Company",
              "text",
              "Enter client company",
              formStyle.input
            )}
            <div className="flex flex-row w-1/2 mx-auto justify-evenly">
              {this.renderButton(
                "Submit",
                "px-4 py-2 mt-4 text-white bg-green-400 rounded"
              )}
              <button
                type="button"
                className="px-4 py-2 mt-4 text-white bg-red-400 rounded"
                onClick={this.toggleModal}
              >
                Cancel
              </button>
            </div>
          </form>
        </Modal>
        <ToastContainer />
      </div>
    );
  }
}
