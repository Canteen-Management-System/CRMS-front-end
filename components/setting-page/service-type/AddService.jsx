import React from "react";
import Modal from "../../modal/Modal";
import Form from "../../form/Form";
import Joi from "joi-browser";
import http from "../../../lib/services/httpService";
import auth from "../../../lib/services/authService";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const inputStyles = {
  _input: "p-2 rounded-lg w-full",
  _label: "w-40 text-right pr-4 ",
  _container: "font-poppins  p-4 mb-4 flex flex-row justify-left items-center",
  _errorMsg: "text-red-400 text-sm text-center pt-2",
  _inputContainer: "w-11/12",
};

export default class AddService extends Form {
  constructor(props) {
    super(props);
  }
  state = {
    data: { service: "" },
    errors: {},
  };
  schema = {
    service: Joi.string().required(),
  };

  render() {
    this.doSubmit = async () => {
      try {
        await http.post("/service-type-list", this.state.data, auth.config);
        this.props.toggleAddForm();
        this.state.data.service = "";
        this.props.getServices();
        toast.success("Added successfully");
      } catch (error) {
        toast.error("Sorry, something went wrong!");
      }
    };

    return (
      <div>
        <Modal modalTitle="Add new Category" animation={this.props.animation}>
          <form className="w-1/2 mx-auto" onSubmit={this.handleForm}>
            {this.renderInput(
              "service",
              "Service",
              "text",
              "Enter new service*",
              inputStyles
            )}
            <div className="flex flex-row w-1/2 mx-auto justify-evenly">
              <button
                type="submit"
                className="px-4 py-2 mt-4 text-white bg-green-400 rounded"
              >
                Submit
              </button>

              <button
                type="button"
                className="px-4 py-2 mt-4 text-white bg-red-400 rounded"
                onClick={this.props.toggleAddForm}
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
