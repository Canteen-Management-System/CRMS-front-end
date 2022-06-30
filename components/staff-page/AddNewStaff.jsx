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

export default class AddNewStaff extends Form {
  constructor(props) {
    super(props);
  }

  state = {
    data: {
      username: "",
      password: "",
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
    username: Joi.string().required(),
    password: Joi.string().required(),
    first_name: Joi.string().required(),
    last_name: Joi.string().required(),
    phone: Joi.number().required(),
    birthday: Joi.string().required(),
    position: Joi.number().required(),
    department: Joi.number().required(),
    role: Joi.number().integer().required(),
    email: Joi.string().email().required(),
  };
  toggleModal = () => {
    this.setState({ animation: !this.state.animation });
  };

  async componentDidMount() {
    const data = await this.props.getStaff();
    this.setState({
      department: data.departments,
      role: data.roles,
      position: data.positions,
    });
  }
  render() {
    this.doSubmit = async () => {
      console.log(this.state.data);
      try {
        const res = await http.post(
          "/create-user",
          this.state.data,
          auth.config
        );
        console.log(res.data);
      } catch (error) {
        console.log(error.response.data);
      }
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
              "username",
              "Username",
              "text",
              "Enter Username",
              modalStyle
            )}
            {this.renderInput(
              "password",
              "Password",
              "password",
              "Enter Password",
              modalStyle
            )}
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
