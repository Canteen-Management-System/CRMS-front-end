import Form from "./form/Form";
import Joi from "joi-browser";


export default  class Logss extends Form {
  state = {
    data: { Category: "", Company: "", ServiceType : "" , AssignTo : "" , Status : "" , Date: "" },
    errors: {},
  };

  schema = {
    Category: Joi.string().required().label("Category"),
    Company: Joi.string().required().label("Company"),
    ServiceType: Joi.string().required().label("ServiceType"),
    AssignTo: Joi.string().required().label("AssignTo"),
    Status: Joi.string().required().label("Status"),
    Date: Joi.string().required().label("Date"),
    
    
  };

  render() {
    this.doSubmit = () => {
      console.log("hello");
    };



    const { inputs, NewButton , UpdateButton , DeleteButton } = formStyle;
    return(
      <div>
         <div className="flex flex-col items-center w-screen h-screen justify-Top font-poppins ">
        <form
          className="flex flex-col items-center justify-center rounded-md shadow-md w-130 md:w-70 h-70 bg-dark-blue"
          onSubmit={this.handleForm}
        >
          <legend className=" text-4xl md:text-6xl pb-8 text-[#C5CAE9]">
            Logs
          </legend>
          <div class="md:flex md:items-center mb-6 flex space-x-4">
          {this.renderInput(
            "Category",
            "category",
            "text",
            "Enter you Category..",

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
            "ServiceType",
            "ServiceType",
            "text",
            "Enter you ServiceType..",
            inputs
          )}
          </div>
          <div class="md:flex md:items-center mb-6 flex space-x-4">
            {this.renderInput(
            "AssginTo",
            "AssginTo",
            "text",
            "Enter you AssginTo..",
            inputs
          )}

          {this.renderInput(
            "Status",
            "Status",
            "text",
            "Enter you Status..",
            inputs
          )}
          
          {this.renderInput(
            "Date",
            "Date",
            "text",
            "Enter you Date..",
            inputs
          )}
          
          </div>


          <div class="md:flex md:items-center mb-6 flex space-x-4 ">
          {this.renderButton("New", NewButton)}
          {this.renderButton("Update", UpdateButton)}
          {this.renderButton("Delete", DeleteButton)}
          </div>

          
        </form>
      </div>

 

      </div>
      
    )
    }
    
}

const formStyle = {
  inputs: {
    _input: "w-64 bg-white shadow rounded w-1/3 ",
    _label: "block text-gray-500 font-bold md:text-right mb-1 md:mb-0 pr-4   w-1/3",
    _container:
      "pb-6  w-full flex flex-col md:flex-row items-center justify-center ",
    _errorMsg: "",
  },

  UpdateButton:
    " bg-light-blue py-2 px-8 text-white rounded-sm hover:bg-[#616161] transition-all duration-300 cursor-pointer" ,

  NewButton:
  " bg-light-blue py-2 px-8 text-white rounded-sm hover:bg-[#616161] transition-all duration-300 cursor-pointer",
  DeleteButton:
  " bg-light-blue py-2 px-8 text-white rounded-sm hover:bg-[#616161] transition-all duration-300 cursor-pointer",
};


