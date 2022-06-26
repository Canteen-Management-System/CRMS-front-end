import Form from "./form/Form";
import Joi from "joi-browser";
import Modal from "./modal/Modal";
import Imm from "./Imm";



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

  toggleModal = () => {
    this.setState({ animation: !this.state.animation });
  };

  render() {
    this.doSubmit = () => {
      console.log("hello");
    };


    const { inputs, NewButton , UpdateButton , DeleteButton ,selectstyle,modelstyle} = formStyle;
    const category = [{_id:1 , name:"Complaint"},{_id:2 , name:"Suggestion"},{_id:3 , name:"Request"}]
    const status = [{_id:1 , name:"Open"},{_id:2 , name:"closed"},{_id:3 , name:"pending"}]
    const service= [{_id:1 , name:"Quotation"},{_id:2 , name:"appointment"},{_id:3 , name:"technical support "},{_id:4 , name:"other "}]
    const clientType = [{_id:1 , name:"Client"},{_id:2 , name:"new customer"},{_id:3 , name:"staff "},{_id:4 , name:"other "}]
    const priority= [{_id:1 , name:"High"},{_id:2 , name:"medium"},{_id:3 , name:"Low"}]


    return(
      <div>
         <div className="flex flex-col justify-center items-center  h-full w-screen font-poppins py-8">
        <form
          className="flex flex-col justify-center items-left w-3/4 md:w-3/4 h-1/2 bg-[#748DA6] rounded-md shadow-md"
          onSubmit={this.handleForm}
        >
          <legend className="md:text-3xl pb-8 text-[#F2F2F2] py-5 px-5 font-bold">
            Logs
          </legend>
          <div className="md:flex md:items-left mb-5">
       
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
          <div className="md:flex md:items-left mb-6 flex space-x-4">
               
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
          <>
        <button
          className="bg-light-blue py-2 px-8 text-white rounded-sm hover:bg-[#616161] transition-all duration-300 cursor-pointer"
          onClick={this.toggleModal}
        >
          Add 
        </button>
        <div>
        <Modal
          className= "flex flex-col justify-left items-left w-3/4 md:w-1/3 h-1/2 bg-[#748DA6] rounded-md shadow-md"
          modalTitle="Add New Staff"
          formId="newstaffform"
          animation={this.state.animation}
          toggleModal={this.toggleModal}
        >
          <div className="flex flex-col justify-center items-center  h-full w-screen font-poppins ">
        <form id="newstaffform"
          className="flex flex-col justify-center items-center w-3/4 md:w-1/3 h-1/2 bg-[#748DA6] rounded-md shadow-md"
          onSubmit={this.handleForm}
        >

          {
            this.renderSelect("Category","Category",category,modelstyle )
          }
          {
          this.renderInput( "name", "Name", "text","Enter Client full name ", modelstyle)
          }
          {
            this.renderInput("Company","Company","text","Enter Comapy Name ",modelstyle)
          }
          {
            this.renderInput( "Address","Address","text","Enter Address ",modelstyle)
          }
          {
            this.renderInput("Mobile Number","Mobile Number","phone"," 07X-XXXX-XXX ",modelstyle)
        }
          {
            this.renderSelect("client type", "client type",clientType, modelstyle )
          }

          {
            this.renderInput( "Email Address","Email Address","email","Enter email",modelstyle )
          }
          {
            this.renderSelect("service type","service type",service,modelstyle )
          }

          {
            this.renderSelect("priority","priority", priority,modelstyle )
          }
      
          {
                <Imm/>
          }
 
           
        </form>
      </div>
        </Modal>
        </div>
      </>




          {/* {this.renderButton("New", NewButton)} */}
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
    _input:"w-3/4 md:w-1/2 py-1 pl-2 rounded-sm",
    _label: "text-xl font-bold  text-red-200 pr-4 text-white ",
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
    _label: "text-xl font-bold  text-red-200 pr-4 text-white ",
    _container:"pb-6  w-full flex flex-col md:flex-row items-left justify-left px-9  w-1/3",
    _select: " w-3/4 md:w-1/2 py-1 pl-2 rounded-sm",
    _option: "w-3/4 md:w-1/2 py-1 pl-2 rounded-sm",
    _errorMsg: "",

},
modelstyle: {
  _input:"w-3/4 md:w-1/2 py-1 pl-2 rounded-sm",
  _label: "text-xl font-bold  text-red-200 pr-4 text-black w-1/3 ",
  _container:
    "pb-6 px-6 py-3  w-full flex flex-col md:flex-row items-left justify-left ",
  _errorMsg: "",
},
  

};


