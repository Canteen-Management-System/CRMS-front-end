import Form from "./form/Form";
import Modal from "./modal/Modal";
import Joi from "joi-browser";

export default class ClientModalForm extends Form {
  state = {
    data: { name: "" },
    errors: {},
    animation: false,
  };

  toggleModal = () => {
    this.setState({ animation: !this.state.animation });
  };

  schema = {
    name: Joi.string(),
  };
  render() {
    return (
      <>
        <button
          className="px-4 py-2 bg-red-300 rounded "
          onClick={this.toggleModal}
        >
          Open
        </button>
        <Modal
          modalTitle="Create new client"
          formId="clientForm"
          animation={this.state.animation}
          toggleModal={this.toggleModal}
        >
          <form id="clientForm" className="p-8">
            <div className="flex">
              {this.renderInput(
                "name",
                "Client name: ",
                "text",
                "Enter client name..",
                style.input
              )}
              {this.renderInput(
                "name",
                "Client name: ",
                "text",
                "Enter client name..",
                style.input
              )}
            </div>
          </form>
        </Modal>
      </>
    );
  }
}

const style = {
  input: {
    _input: "",
    _label: "",
    _container: "",
    _errorMsg: "",
  },
};
