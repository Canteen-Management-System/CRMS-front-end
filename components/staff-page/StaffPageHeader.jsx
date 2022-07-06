import Form from "../form/Form";
import Joi from "joi-browser";
import React, { useState } from "react";
import Modal from "../modal/Modal";

export default class AddNewIssueForm extends Form {
  state = {
    data: {},
    errors: {},
    animation: true,
  };

  schema = {};

  render() {
    this.doSubmit = () => {
      console.log("hello");
    };
    const { selectstyle, inputs, saveButton } = formStyle;
    const Department = [
      { _id: 1, name: "IT" },
      { _id: 2, name: "HR" },
      { _id: 3, name: "Accounts" },
      { _id: 4, name: "Mangment" },
    ];
    const Jobs = [
      { _id: 1, name: "HR officer" },
      { _id: 2, name: "CS" },
      { _id: 3, name: "account manger " },
      { _id: 4, name: "manger" },
    ];
    const Roll = [
      { _id: 1, name: "manger" },
      { _id: 2, name: "CS employee" },
      { _id: 3, name: "IT admin" },
      { _id: 4, name: "staff" },
    ];

    return (
      <div className="flex flex-col items-center justify-center h-full py-8 font-poppins ">
        <form
          className="flex flex-col justify-center items-left w-3/4 md:w-3/4 h-1/2 bg-[#748DA6] rounded-md shadow-md"
          onSubmit={this.handleForm}
        >
          <legend className="md:text-3xl pb-8 text-[#F2F2F2] py-5 px-5 font-bold">
            staff List
          </legend>
          <div className="mb-5 md:flex md:items-left">
            {this.renderSelect(
              "Department",
              "Department",
              Department,
              selectstyle
            )}
            {this.renderSelect("Job title", "Job title", Jobs, selectstyle)}
            {this.renderSelect("Roll", "Roll", Roll, selectstyle)}
          </div>
          <div className="flex mb-6 space-x-4 md:flex md:items-left">
            {this.renderInput("ID", "ID", "number", "staff ID", inputs)}
            {this.renderInput(
              "First Name",
              "First Name",
              "text",
              "Enter First name",
              inputs
            )}
            {this.renderInput(
              "Last Name",
              "Last Name",
              "text",
              "Enter Last name",
              inputs
            )}
          </div>
          <div className="flex px-6 mb-6 space-x-4 md:flex md:items-right">
            {this.renderButton("Search", saveButton)}
            {this.renderButton("Update", saveButton)}
          </div>
        </form>
      </div>
    );
  }
}

const formStyle = {
  inputs: {
    _input: "w-3/4 md:w-1/2 py-1 pl-2 rounded-sm",
    _label: "text-xl font-bold  text-red-200 pr-4 text-white ",
    _container:
      "pb-6  w-full flex flex-col md:flex-row items-center justify-center ",
    _errorMsg: "",
    _inputContainer: "",
  },
  saveButton:
    "bg-light-blue py-2 px-8 text-white rounded-sm hover:bg-[#616161] transition-all duration-300 cursor-pointer",
  selectstyle: {
    _label: "w-40 text-right pr-4",
    _container:
      "pb-6  w-full flex flex-col md:flex-row items-left justify-left px-9 ",
    _select: "w-64 bg-white shadow rounded w-1/3 ",
    _option: "w-64 bg-white shadow rounded w-1/3 ",
    _errorMsg: "",
  },
};
