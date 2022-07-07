import { useState, useEffect } from "react";
import Modal from "./../modal/Modal";
import Form from "./../form/Form";
import Joi from "joi-browser";
import auth from "../../lib/services/authService";
import http from "../../lib/services/httpService";

export default class ClientsMessage extends Form {
  state = {
    data: {
      subject: "",
      message: "",
    },
    errors: {},
  };

  schema = {
    subject: Joi.string().required().label("Subject"),
    message: Joi.string().required().label("Message"),
  };

  clearForm = () => {
    this.setState({
      data: {
        subject: "",
        message: "",
      },
    });
  };

  getClients = async () => {
    try {
      const res = await http.get("/clients", auth.config);
      return res.data;
    } catch (error) {
      console.log(error.response);
    }
  };

  render() {
    this.doSubmit = async () => {
      const clients = await this.getClients();
      console.log(clients);
      const email = {
        subject: this.state.data.subject,
        message: this.state.data.message,
        email: clients.map((n) => n.email),
      };
      try {
        const send = await http.post("/email", email, auth.config);
        toast.success("email sent successfully");
      } catch (error) {
        console.log(error);
      }
    };

    const {
      inputs,
      NewButton,
      UpdateButton,
      DeleteButton,
      selectStyle,
      modelStyle,
    } = formStyle;
    return (
      <div className="flex justify-center pb-5 pr-8 text-black">
        <Modal
          modalTitle="Send Email"
          animation={this.props.animation}
          toggleModal={this.handleToggleEmailModal}
        >
          <form
            onSubmit={this.handleForm}
            className="w-1/2 mx-auto"
            id="w-modal"
          >
            {this.renderInput(
              "subject",
              "Subject",
              "text",
              "Enter the subject",
              modelStyle
            )}
            <div className="flex flex-row justify-center mx-auto">
              <label htmlFor="message" className="pr-2">
                Message:
              </label>
              <textarea
                onChange={this.handleChange}
                name="message"
                rows="4"
                cols="40"
              />
            </div>
            {/* <TextArea
      name = "message" 
      fromId = "w-modal"
      style= {{
        _container: "",
        _label: "",
      }
      }>

     </TextArea> */}

            <div className="flex flex-row w-1/2 mx-auto justify-evenly">
              {this.renderButton(
                "Submit",
                "px-4 py-2 mt-4 text-white bg-green-400 rounded"
              )}
              <button
                type="button"
                className="px-4 py-2 mt-4 text-white bg-red-400 rounded"
                onClick={this.props.handleToggleEmailModal}
              >
                Cancel
              </button>
            </div>
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
