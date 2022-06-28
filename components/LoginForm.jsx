import Form from "./form/Form";
import Joi from "joi-browser";
import auth from "../lib/services/authService";
import http from "../lib/services/httpService";

export default class LoginForm extends Form {
  state = {
    data: { username: "", password: "" },
    errors: {},
  };

  schema = {
    username: Joi.string().required().label("Username"),
    password: Joi.string().required().label("Password"),
  };

  render() {
    this.doSubmit = async () => {
      const { username, password } = this.state.data;
      await auth.login(username, password);
      window.location.href = "/";
    };

    const { inputs, loginButton } = formStyle;
    return (
      <section className="flex flex-col items-center justify-center w-screen h-screen font-poppins ">
        <form
          className="flex flex-col items-center justify-center w-3/4 rounded-md shadow-md md:w-1/2 h-1/2 bg-dark-blue"
          onSubmit={this.handleForm}
        >
          <legend className=" text-4xl md:text-6xl pb-8 text-[#C5CAE9] ">
            Login
          </legend>
          {this.renderInput(
            "username",
            "Username",
            "text",
            "Enter you username..",
            inputs
          )}
          {this.renderInput(
            "password",
            "Password",
            "password",
            "Enter your password",
            inputs
          )}
          {this.renderButton("login", loginButton)}
        </form>
      </section>
    );
  }
}

const formStyle = {
  inputs: {
    _input: "w-3/4 md:w-1/2 py-1 pl-2 rounded-sm",
    _label: "text-lg text-red-200 pr-4 text-white",
    _container:
      "pb-6  w-full flex flex-col md:flex-col items-center justify-center ",
    _errorMsg: "",
  },

  loginButton:
    "bg-light-blue py-2 px-8 text-white rounded-sm hover:bg-[#616161] transition-all duration-300 cursor-pointer",
};
