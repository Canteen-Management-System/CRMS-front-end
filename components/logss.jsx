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


    const { inputs, NewButton , UpdateButton , DeleteButton ,selectstyle} = formStyle;
    const category = [{_id:1 , name:"Complaint"},{_id:2 , name:"Suggestion"},{_id:3 , name:"Request"}]
    const status = [{_id:1 , name:"Active"},{_id:2 , name:"unActive"}]
    const service= [{_id:1 , name:"Quotation"},{_id:2 , name:"appointment"},{_id:3 , name:"technical support "},{_id:4 , name:"other "}]
    return(
      <div>
         <div className="flex flex-col items-center w-screen h-screen justify-Top font-poppins ">
        <form
          className="flex flex-col items-center justify-center rounded-md shadow-md w-130 md:w-70 h-70 bg-dark-blue"
          onSubmit={this.handleForm}
        >
          <legend className="pb-8 text-4xl text-white md:text-6xl">
            Logs
          </legend>
          <div class="md:flex md:items-center mb-6 flex space-x-4">
       
          {this.renderInput(
            "Company",
            "Company",
            "text",
            "Enter Company Name..",

            inputs
          )}

{this.renderInput(
            "AssginTo",
            "AssginTo",
            "text",
            "Enter you AssginTo..",
            inputs
          )}

{this.renderInput(
            "Date",
            "Date",
            "text",
            "dd/mm/yy",
            inputs
          )}
       
          </div>
          <div class="md:flex md:items-center mb-6 flex space-x-4">
               
          {this.renderSelect(
            "Service",
            "Service",
            service,
            selectstyle
          )}
             {this.renderSelect(
            "Category",
            "Category",
            category,
            selectstyle
          )}
         

          {this.renderSelect(
            "Status",
            "Status",
            status ,
            selectstyle,
            
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
    _label: "text-lg text-red-200 pr-4 text-white w-1/3",
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
  selectstyle:{
    _label: "text-lg text-red-200 pr-4 text-white w-1/3 space-x-4  ",
    _container:"pb-6  w-full flex flex-col md:flex-row items-left justify-left px-9  w-1/3",
    _select: " w-3/4 md:w-1/4 py-1 pl-2 rounded-sm w-1/3 ",
    _option: "w-3/4 md:w-1/2 py-1 pl-2 rounded-sm w-1/3 ",
    _errorMsg: "",

}
  

};


