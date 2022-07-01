import Modal from "../../modal/Modal";
import Form from "../../form/Form";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import http from "../../../lib/services/httpService";
import auth from "../../../lib/services/authService";
import TableHeader from "../../table/TableHeader";
import { TrashIcon, PencilAltIcon } from "@heroicons/react/outline";

export default class ViewCategories extends Form {
  constructor(props) {
    super(props);

    this.state = {
      services: [],
      tableHeader: ["id", "service", "Action"],
    };
  }

  async componentDidUpdate(prevProps, pres) {
    if (prevProps.services != this.state.services) {
      this.setState({ services: this.props.services });
    }
  }

  render() {
    this.delete = async (id) => {
      try {
        await http.delete(`/service-type-detail/${id}`, auth.config);
        toast.success("Item deleted successfully!");
        const d = this.state.services.filter((item) => {
          return item.id != id;
        });
        this.setState({ services: d });
        console.log(d);
      } catch (error) {
        toast.error("Something went wrong!");
      }
    };

    return (
      <div>
        <Modal modalTitle="Add new Category" animation={this.props.animation}>
          <div className="flex flex-col items-center justify-center w-1/2 mx-auto mt-8">
            <table>
              <TableHeader tableHead={this.state.tableHeader} />
              <tbody>
                {this.state.services?.map((row, rowIdx) => {
                  return (
                    <tr key={rowIdx}>
                      {this.state.tableHeader.map((head, idx) => {
                        return (
                          <td
                            key={idx}
                            className="p-1 px-8 py-2 text-center border rounded-lg border-slate-700"
                          >
                            {head == "id" ? rowIdx + 1 : row[head]}
                            {head == "Action" ? (
                              <div className="flex">
                                <span>
                                  <TrashIcon
                                    className="w-6 h-6 text-red-400 cursor-pointer"
                                    onClick={() => this.delete(row.id)}
                                  />
                                </span>
                                <span>
                                  <PencilAltIcon className="w-6 h-6 text-red-400 cursor-pointer" />
                                </span>
                              </div>
                            ) : (
                              ""
                            )}
                          </td>
                        );
                      })}
                    </tr>
                  );
                })}
              </tbody>
            </table>
            <div className="flex flex-row w-1/2 mx-auto justify-evenly">
              <button
                type="button"
                className="px-4 py-2 mt-4 text-white bg-red-400 rounded"
                onClick={this.props.toggleViewCategories}
              >
                Close
              </button>
            </div>
          </div>
        </Modal>
        <ToastContainer />
      </div>
    );
  }
}
