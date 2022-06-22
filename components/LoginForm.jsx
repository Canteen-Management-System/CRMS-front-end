import Form from "./form/Form";
import Joi from "joi-browser";

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
    this.doSubmit = () => {
      console.log("hello");
    };

    const { inputs, loginButton } = formStyle;
    return (
      <div className="flex flex-col justify-center items-center  h-screen w-screen font-poppins bg-[#303F9F]">
        <form
          className="flex flex-col justify-center items-center w-3/4 md:w-1/2 h-1/2 bg-[#3F51B5] rounded-md shadow-md"
          onSubmit={this.handleForm}
        >
          <legend className=" text-4xl md:text-6xl pb-8 text-[#C5CAE9]">
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
      </div>
    );
  }
}

const formStyle = {
  inputs: {
    _input: "w-3/4 md:w-1/2 py-1 pl-2 rounded-sm",
    _label: "text-lg text-red-200 pr-4 text-white ",
    _container:
      "pb-6  w-full flex flex-col md:flex-row items-center justify-center ",
    _errorMsg: "",
  },

  loginButton:
    " bg-[#7C4DFF] py-2 px-8 text-white rounded-sm hover:bg-[#673AB7] transition-all duration-300",
};
