import Form from "../../components/form/Form";
import { withRouter } from "next/router";
import Joi from "joi-browser";
import auth from "../../lib/services/authService";
import http from "../../lib/services/httpService";
import axios from "axios";

const mapToViewModel = (task) => {
  return {
    category: task.category,
    priority: task.priority,
  };
};

const generateOptions = (list, optionName) => {
  if (list) {
    return list.map((option) => {
      return {
        id: option.id,
        name: option[optionName],
      };
    });
  }
};

class EditTask extends Form {
  state = {
    data: {
      category: "",
      priority: "",
    },
    categories: [],
    priorities: [],
    services: [],
    users: [],
    errors: {},
  };

  schema = {
    category: Joi.string().required().label("Category"),
    priority: Joi.string().required().label("Priority"),
  };

  getData = async (id) => {
    const categoriesReq = http.get("/category-list", auth.config);
    const servicesReq = http.get("/service-type-list", auth.config);
    const priorityReq = http.get("/priority-list", auth.config);
    const usersReq = http.get("/users", auth.config);
    const taskDetailsReq = http.get(`/task-detail/${id}`, auth.config);

    try {
      const res = await axios.all([
        categoriesReq,
        servicesReq,
        priorityReq,
        usersReq,
        taskDetailsReq,
      ]);
      let categories = res[0].data;
      let services = res[1].data;
      let priorities = res[2].data;
      let users = res[3].data;
      let taskDetails = res[4].data;

      categories = generateOptions(categories, "category");
      priorities = generateOptions(priorities, "priority");

      const retrievedTableList = {
        categories,
        services,
        priorities,
        users,
        taskDetails,
      };
      return retrievedTableList;
    } catch (error) {
      console.log(error);
    }
  };

  async componentDidMount() {
    if (this.props.router.isReady) {
      const { id } = this.props.router.query;
      const { categories, services, priorities, users, taskDetails } =
        await this.getData(id);

      const data = mapToViewModel(taskDetails);
      this.setState({ categories, services, priorities, users, data });
    }
  }

  render() {
    const { categories, priorities } = this.state;
    return (
      <div>
        <form onSubmit={this.handleForm}>
          <div>
            <label className="text-white ">Category</label>
            {console.log(this.state.data.category)}
            <select
              defaultValue={this.state.data.category}
              onChange={(e) => this.handleChange(this.state.data.category)}
            >
              <option value="" />
              {categories.map((category) => (
                <option key={category.id} value={category.id}>
                  {category.name}
                </option>
              ))}
            </select>
          </div>
          <div className="flex flex-row w-1/2 mx-auto justify-evenly">
            {this.renderButton(
              "Submit",
              "px-4 py-2 mt-4 text-white bg-green-400 rounded"
            )}
            <button
              type="button"
              className="px-4 py-2 mt-4 text-white bg-red-400 rounded"
              onClick={this.props.handleEditModal}
            >
              Cancel
            </button>
          </div>
        </form>
      </div>
    );
  }
}

const modelStyle = {
  _input: "p-2 rounded-lg w-full",
  _label: "w-40 text-right pr-4 ",
  _container: "font-poppins  p-4 mb-4 flex flex-row justify-left items-center",
  _errorMsg: "text-red-400 text-sm",
  _inputContainer: "w-11/12",
};

export default withRouter(EditTask);
