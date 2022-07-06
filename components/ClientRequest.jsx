import Form from "./form/Form";
import Joi from "joi-browser";
import "react-toastify/dist/ReactToastify.css";
import { ToastContainer, toast } from "react-toastify";
import http from "../lib/services/httpService";
import TextArea from "./form/TextArea";

export default class Client extends Form {
  constructor(props) {
    super(props);
  }
  state = {
    data: {
      client_name: "",
      client_company: "",
      client_phone_number: "",
      client_email: "",
      task_category: "",
      task_service_type: "",
      task_details: "",
    },
    errors: {},
  };

  schema = {
    client_name: Joi.string().required().label("Name"),
    client_company: Joi.string().required().label("Company"),
    client_phone_number: Joi.string().required().label("PhoneNumber"),
    client_email: Joi.string().required().label("Email"),
    task_category: Joi.string().required().label("Category"),
    task_service_type: Joi.string().required().label("ServiceType"),
    task_details: Joi.string().required().label("Description"),
  };

  render() {
    this.clearForm = () => {
      this.setState({
        data: {
          client_name: "",
          client_company: "",
          client_phone_number: "",
          client_email: "",
          task_category: "",
          task_service_type: "",
          task_details: "",
        },
      });
    };

    this.getErrorValues = (error) => {
      const errors = Object.values(error);
      return errors.join(", ");
    };

    this.doSubmit = async () => {
      console.log(this.state.data);
      try {
        const res = await http.post("/clientReq-list", this.state.data);
        toast.success("Your request sent successfully!");
        this.clearForm();
      } catch (error) {
        console.log(error.response.data);
      }
    };

    const { inputs, SendButton, selectstyle } = formStyle;
    const category = [
      { id: 1, name: "Complaint" },
      { id: 2, name: "Suggestion" },
      { id: 3, name: "Request" },
      { id: 4, name: "other" },
    ];
    const service = [
      { id: 1, name: "Quotation" },
      { id: 2, name: "appointment" },
      { id: 3, name: "technical support " },
      { id: 4, name: "other " },
    ];

    return (
      <div>
        <div className="flex flex-col items-center w-full h-full justify-Top font-poppins">
          <form
            id="formId"
            className="flex flex-col items-center justify-center rounded-md shadow-md md:w-1/3 h-1/2 bg-dark-blue"
          >
            <legend className="pb-8 text-4xl text-white md:text-4xl">
              Client Request
            </legend>

            {this.renderInput(
              "client_name",
              "Name",
              "text",
              "  Name..",

              inputs
            )}
            {this.renderInput(
              "client_company",
              "Company",
              "text",
              "  Company name..",

              inputs
            )}
            {this.renderInput(
              "client_phone_number",
              "PhoneNumber",
              "text",
              "  +962-XXXX-XXX",
              inputs
            )}

            {this.renderInput(
              "client_email",
              "Email",
              "text",
              "  Email ",
              inputs
            )}

            {this.renderSelect(
              "task_category",
              "Category",
              category,
              selectstyle
            )}
            {this.renderSelect(
              "task_service_type",
              "ServiceType",
              service,
              selectstyle
            )}
            <label
              htmlFor="description"
              className="md:text-xl pb-8 text-[#F2F2F2] py-5  items-left"
            >
              Description
            </label>

            <textarea
              name="task_details"
              form="formId"
              onChange={this.handleChange}
            />

            <div className="flex mb-6 space-x-4 md:items-center">
              <button
                type="button"
                className=" bg-light-blue py-2 px-8 text-white rounded-sm hover:bg-[#616161] transition-all duration-300 cursor-pointer mt-6 mb-7"
                onClick={this.doSubmit}
              >
                Send
              </button>
            </div>
          </form>
          <ToastContainer />
        </div>
      </div>
    );
  }
}

const formStyle = {
  inputs: {
    _input: "w-64 bg-white shadow rounded space-x-4  w-f ml-4",
    _label: "text-lg text-white pr-4 text-white w-1/4  ",
    _container:
      "pb-6  w-full flex flex-col md:flex-row items-center justify-center ",
    _errorMsg: "",
  },

  SendButton:
    " bg-light-blue py-2 px-8 text-white rounded-sm hover:bg-[#616161] transition-all duration-300 cursor-pointer mt-6 mb-7",
  selectstyle: {
    _label: "text-lg text-white pr-4  w-1/3  ",
    _container: "pb-6  w-1/3  items-left justify-left px-9 ",
    _select: " bg-white shadow rounded space-x-4  w-f",
    _option: " bg-white shadow rounded space-x-4  w-f",
    _errorMsg: "",
  },
};
