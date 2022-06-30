import Form from "./form/Form";
import Joi from "joi-browser";
import auth from "../lib/services/authService";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

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
      try {
        await auth.login(username, password);
        window.location.href = "/";
      } catch (error) {
        toast.error(error.response.data.detail);
      }
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
        <ToastContainer />
      </section>
    );
  }
}

const formStyle = {
  inputs: {
    _input: "md:w-56 py-1 pl-2 rounded-sm",
    _label: "text-lg text-white pr-4 text-white",
    _container:
      "pb-6  w-full flex flex-col md:flex-row items-center justify-center",
    _errorMsg: "w-56 pt-2 text-red-300",
  },

  loginButton:
    "bg-light-blue py-2 px-8 text-white rounded-sm hover:bg-[#616161] transition-all duration-300 cursor-pointer",
};
