import Form from "./form/Form";
import Joi from "joi-browser";


export default  class Client extends Form {

  state = {
    data: { Name: "", Company: "", PhoneNumber : "" , Email : "" , Categorry : "" , ServiceType: "",Description: "" },
    errors: {},
  };

  schema = {
    Name: Joi.string().required().label("Name"),
    Company: Joi.string().required().label("Company"),
    PhoneNumber: Joi.string().required().label("PhoneNumber"),
    Email: Joi.string().required().label("Email"),
    Categorry: Joi.string().required().label("Categorry"),
    ServiceType: Joi.string().required().label("ServiceType"),
    Description: Joi.string().required().label("Description"),
   
    
    
  };
  render() {
    this.doSubmit = () => {
      console.log("hello");
    };



    const { inputs, SendButton } = formStyle;
    return(
      <div>
         <div className="flex flex-col items-center w-screen h-screen justify-Top font-poppins">
        <form
          className="flex flex-col items-center justify-center rounded-md shadow-md w-130 md:w-70 h-70 bg-dark-blue"
          onSubmit={this.handleForm}
        >
          <legend className=" text-4xl md:text-6xl pb-8 text-[#C5CAE9]">
            Client Request
          </legend>
          
          {this.renderInput(
            "Name",
            "Name",
            "text",
            "Enter you Name..",

            inputs
          )}
          {this.renderInput(
            "Company",
            "Company",
            "text",
            "Enter you Company..",

            inputs
          )}
          {this.renderInput(
            "PhoneNumber",
            "PhoneNumber",
            "text",
            "Enter you PhoneNumber..",
            inputs
          )}
          
          
            {this.renderInput(
            "Email",
            "Email",
            "text",
            "Enter you Email..",
            inputs
          )}

          {this.renderInput(
            "Categorry",
            "Categorry",
            "text",
            "Enter you Categorry..",
            inputs
          )}
          {this.renderInput(
            "ServiceType",
            "ServiceType",
            "text",
            "Enter you ServiceType..",
            inputs
          )}
            {this.renderInput(
            "Description",
            "Description",
            "text",
            "Enter you Description..",
            inputs
          )}
          
          


          <div class="md:flex md:items-center mb-6 flex space-x-4 ">
          {this.renderButton("Send", SendButton)}
          
          </div>

          
        </form>
      </div>

 

      </div>
      
    )
    }
    
}

const formStyle = {
  inputs: {
    _input: "w-64 bg-white shadow rounded space-x-4  w-1/3",
    _label: "block text-gray-500 font-bold md:text-right mb-1 md:mb-0 pr-4 space-x-4 justify-left  w-1/3 ",
    _container:
      "pb-6  w-full flex flex-col md:flex-row items-center justify-center ",
    _errorMsg: "",
  },

  SendButton:
    " bg-light-blue py-2 px-8 text-white rounded-sm hover:bg-[#616161] transition-all duration-300 cursor-pointer" ,


};


