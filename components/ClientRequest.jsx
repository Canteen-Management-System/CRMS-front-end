import Form from "./form/Form";
import Joi from "joi-browser";

export default class Client extends Form {
  state = {
    data: {
      Name: "",
      Company: "",
      PhoneNumber: "",
      Email: "",
      Category: "",
      ServiceType: "",
      Description: "",
    },
    errors: {},
  };

  schema = {
    Name: Joi.string().required().label("Name"),
    Company: Joi.string().required().label("Company"),
    PhoneNumber: Joi.string().required().label("PhoneNumber"),
    Email: Joi.string().required().label("Email"),
    Category: Joi.string().required().label("Category"),
    ServiceType: Joi.string().required().label("ServiceType"),
    Description: Joi.string().required().label("Description"),
  };
  render() {
    this.doSubmit = () => {
      console.log("hello");
    };

    const { inputs, SendButton, selectstyle } = formStyle;
    const category = [
      { _id: 1, name: "Complaint" },
      { _id: 2, name: "Suggestion" },
      { _id: 3, name: "Request" },
    ];
    const service = [
      { _id: 1, name: "Quotation" },
      { _id: 2, name: "appointment" },
      { _id: 3, name: "technical support " },
      { _id: 4, name: "other " },
    ];

    return (
      <div>
        <div className="flex flex-col items-center w-full h-full justify-Top ">
          <form
            className="flex flex-col items-center justify-center rounded-md shadow-md w-130 md:w-1/3 h-1/2 bg-dark-blue"
            onSubmit={this.handleForm}
          >
            <legend className="pb-8 text-4xl text-white md:text-4xl">
              Client Request
            </legend>

            {this.renderInput(
              "Name",
              "Name",
              "text",
              "  Name..",

              inputs
            )}
            {this.renderInput(
              "Company",
              "Company",
              "text",
              "  Company name..",

              inputs
            )}
            {this.renderInput(
              "PhoneNumber",
              "PhoneNumber",
              "text",
              "  +962-XXXX-XXX",
              inputs
            )}

            {this.renderInput(
              "Email",
              "Email",
              "text",
              "  Email ",
              inputs
            )}

            {this.renderSelect("Category", "Category", category, selectstyle)}
            {this.renderSelect(
              "ServiceType",
              "ServiceType",
              service,
              selectstyle
            )}

              <legend className="md:text-xl pb-8 text-[#F2F2F2] py-5  items-left">
                Description
              </legend>
              <textarea id="Expectaion" name="Expectaion" rows="4" cols="40" />
            <div className="flex mb-6 space-x-4 md:flex md:items-center ">
              {this.renderButton("Send", SendButton)}
            </div>
          </form>
        </div>
      </div>
    );
  }
}

const formStyle = {
  inputs: {
    _input: "w-64 bg-white shadow rounded space-x-4  w-f",
    _label: "text-lg text-white pr-4 text-white w-1/4  ",
    _container:
      "pb-6  w-full flex flex-col md:flex-row items-center justify-center ",
    _errorMsg: "",
  },

  SendButton:
    " bg-light-blue py-2 px-8 text-white rounded-sm hover:bg-[#616161] transition-all duration-300 cursor-pointer mt-6",
  selectstyle: {
    _label: "text-lg text-white pr-4  w-1/3  ",
    _container:
      "pb-6  w-1/3  items-left justify-left px-9 ",
    _select: " bg-white shadow rounded space-x-4  w-f",
    _option: " bg-white shadow rounded space-x-4  w-f",
    _errorMsg: "",
  },
};
