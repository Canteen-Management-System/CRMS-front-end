import "react-toastify/dist/ReactToastify.css";
import { ToastContainer, toast } from "react-toastify";
import Modal from "../../modal/Modal";
import Form from "../../form/Form";
import http from "../../../lib/services/httpService";
import auth from "../../../lib/services/authService";
import TableHeader from "../../table/TableHeader";
import { TrashIcon, PencilAltIcon } from "@heroicons/react/outline";

export default class ViewDepartments extends Form {
  constructor(props) {
    super(props);

    this.state = {
      departments: [],
      tableHeader: ["id", "name", "Action"],
    };
  }
  async componentDidUpdate(prevProps) {
    if (prevProps.departments != this.state.departments) {
      this.setState({ departments: this.props.departments });
    }
  }

  render() {
    this.delete = async (id) => {
      try {
        await http.delete(`/department-detail/${id}`, auth.config);
        toast.success("Item deleted successfully!");
        const d = this.state.departments.filter((item) => {
          return item.id != id;
        });
        this.setState({ departments: d });
        console.log(d);
      } catch (error) {
        toast.error("Something went wrong!");
      }
    };

    return (
      <div>
        <Modal modalTitle="Departments" animation={this.props.animation}>
          <div className="flex flex-col items-center justify-center w-1/2 mx-auto mt-8">
            <table>
              <TableHeader tableHead={this.state.tableHeader} />
              <tbody>
                {this.state.departments?.map((row, rowIdx) => {
                  return (
                    <tr key={rowIdx}>
                      {this.state.tableHeader?.map((head, idx) => {
                        return (
                          <td
                            key={idx}
                            className="p-1 px-8 py-2 text-center border rounded-lg border-slate-700"
                          >
                            {head == "id" ? rowIdx + 1 : row[head]}
                            {head == "Action" && (
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
                onClick={this.props.toggleViewDepartments}
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
