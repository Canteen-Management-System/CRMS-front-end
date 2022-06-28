import Form from "./form/Form";
import Joi from "joi-browser";
import ActionTaken from "../components/issue-form/ActionTaken";
import AssignTo from "./issue-form/AssignTo";
import Imm from "../components/issue-form/Imm";
import React, { useState } from "react";

export default class AddNewIssueForm extends Form {
  state = {
    data: { Name: "" },
    errors: {},
  };

  schema = {
    Name: Joi.string().required().label("Username"),
  };

  render() {
    this.doSubmit = () => {
      console.log("hello");
    };
    const { selectstyle, inputs, saveButton } = formStyle;
    const category = [
      { _id: 1, name: "Complaint" },
      { _id: 2, name: "Suggestion" },
      { _id: 3, name: "Request" },
    ];
    const clientType = [
      { _id: 1, name: "Client" },
      { _id: 2, name: "new customer" },
      { _id: 3, name: "staff " },
      { _id: 4, name: "other " },
    ];
    const service = [
      { _id: 1, name: "Quotation" },
      { _id: 2, name: "appointment" },
      { _id: 3, name: "technical support " },
      { _id: 4, name: "other " },
    ];
    const priority = [
      { _id: 1, name: "High" },
      { _id: 2, name: "medium" },
      { _id: 3, name: "Low" },
    ];
    return (
      <div className="flex flex-col items-center justify-center w-screen h-full font-poppins ">
        <form
          className="flex flex-col justify-center items-center w-3/4 md:w-1/3 h-1/2 bg-[#748DA6] rounded-md shadow-md"
          onSubmit={this.handleForm}
        >
          <legend className="md:text-3xl pb-8 text-[#F2F2F2] py-5">
            Add New Issue
          </legend>
          {this.renderInput(
            "name",
            "Name",
            "text",
            "Enter Client full name ",
            inputs
          )}

          {<Imm />}

          {this.renderButton("Add", saveButton)}
        </form>
      </div>
    );
  }
}

const formStyle = {
  inputs: {
    _input: "w-3/4 md:w-1/2 py-1 pl-2 rounded-sm",
    _label: "text-lg text-red-200 pr-4 text-white ",
    _container:
      "pb-6  w-full flex flex-col md:flex-row items-left justify-left px-9 ",
    _errorMsg: "",
  },
  saveButton:
    " bg-[#7C4DFF] py-2 px-8  text-white rounded-sm hover:bg-[#673AB7] transition-all duration-300",
  selectstyle: {
    _label: "text-lg text-red-200 pr-4 text-white ",
    _container:
      "pb-6  w-full flex flex-col md:flex-row items-left justify-left px-9 ",
    _select: "w-3/4 md:w-1/4 py-1 pl-2 rounded-sm",
    _option: "w-3/4 md:w-1/2 py-1 pl-2 rounded-sm",
    _errorMsg: "",
  },
};
