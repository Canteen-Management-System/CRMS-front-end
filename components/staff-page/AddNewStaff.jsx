import Modal from "../modal/Modal";
import Joi from "joi-browser";
import auth from "../../lib/services/authService";
import http from "../../lib/services/httpService";
import Form from "../form/Form";
import axios from "axios";
const modalStyle = {
  _input: "p-2 rounded-lg w-full",
  _label: "w-40 text-right pr-4 ",
  _container: "font-poppins  p-4 mb-4 flex flex-row justify-left items-center",
  _errorMsg: "text-red-400 text-sm",
  _inputContainer: "w-11/12",
};

// const department = [
//   { _id: 1, name: "IT" },
//   { _id: 2, name: "HR" },
//   { _id: 3, name: "Accounts" },
//   { _id: 4, name: "Management" },
// ];
// const Jobs = [
//   { _id: 1, name: "HR officer" },
//   { _id: 2, name: "CS" },
//   { _id: 3, name: "account manger " },
//   { _id: 4, name: "manger" },
// ];
// const Roll = [
//   { _id: 1, name: "manger" },
//   { _id: 2, name: "CS employee" },
//   { _id: 3, name: "IT admin" },
//   { _id: 4, name: "staff" },
// ];

export default class AddNewStaff extends Form {
  state = {
    data: {
      first_name: "",
      last_name: "",
      position: "",
      phone: "",
      birthday: "",
      department: "",
      role: "",
      email: "",
    },
    errors: {},
    animation: false,
    department: [],
    role: [],
    position: [],
  };

  schema = {
    first_name: Joi.string().required(),
    last_name: Joi.string().required(),
    position: Joi.number().required(),
    phone: Joi.number().required(),
    birthday: Joi.string(),
    department: Joi.number().required(),
    role: Joi.number().integer().required(),
    email: Joi.string().email().required(),
  };
  toggleModal = () => {
    this.setState({ animation: !this.state.animation });
  };

  async componentDidMount() {
    const positionsReq = http.get("/positions-list", auth.config);
    const departmentReq = http.get("/department-list", auth.config);
    const roleReq = http.get("/role-list", auth.config);
    axios
      .all([positionsReq, departmentReq, roleReq])
      .then(
        axios.spread((...responses) => {
          const positions = responses[0];
          const departments = responses[1];
          const roles = responses[2];
          // use/access the results
          console.log(departments.data);
          this.setState({
            department: departments.data,
            role: roles.data,
            position: positions.data,
          });
        })
      )
      .catch((errors) => {
        // react on errors.
      });
  }
  /*
{
    "first_name": "Nour",
    "last_name": "Eddein",
    "position": null,
    "phone": "",
    "birthday": "2022-06-13",
    "department": null,
    "role": null,
    "email": "admin2@admin.com"
}
*/
  render() {
    this.doSubmit = async () => {
      const res = http.post("/users", this.state.data, auth.config);
      console.log(res.data);
    };
    return (
      <>
        <div className="flex justify-end pb-8 mr-16">
          <button
            className="bg-light-blue py-2 px-8 text-white rounded-sm hover:bg-[#616161] transition-all duration-300 cursor-pointer"
            onClick={this.toggleModal}
          >
            Add
          </button>
        </div>
        <Modal
          modalTitle="Add New Staff"
          animation={this.state.animation}
          toggleModal={this.toggleModal}
        >
          <form className="w-1/2 mx-auto" onSubmit={this.handleForm}>
            {this.renderInput(
              "first_name",
              "First Name",
              "text",
              "Enter First name",
              modalStyle
            )}
            {this.renderInput(
              "last_name",
              "Last Name",
              "text",
              "Enter Last name",
              modalStyle
            )}
            {this.renderInput(
              "phone",
              "Mobile Number",
              "text",
              " 07X-XXXX-XXX ",
              modalStyle
            )}
            {this.renderInput("birthday", "Birthday", "date", "", modalStyle)}
            {this.renderInput("email", "Email", "email", "", modalStyle)}

            <div className="flex flex-row justify-center">
              {this.renderSelect(
                "department",
                "Department",
                this.state.department,
                modalStyle
              )}
              {this.renderSelect(
                "position",
                "Position",
                this.state.position,
                modalStyle
              )}
              {this.renderSelect("role", "Role", this.state.role, modalStyle)}
            </div>
            <div className="flex flex-row w-1/2 mx-auto justify-evenly">
              {this.renderButton(
                "Submit",
                "px-4 py-2 mt-4 text-white bg-green-400 rounded"
              )}
              <button
                type="button"
                className="px-4 py-2 mt-4 text-white bg-red-400 rounded"
                onClick={this.toggleModal}
              >
                Cancel
              </button>
            </div>
          </form>
        </Modal>
      </>
    );
  }
}
