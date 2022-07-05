import Moment from 'react-moment';
import { useState, useEffect } from "react";
import axios from "axios";
import auth from "../lib/services/authService"
import http from "../lib/services/httpService";
import XLSX from "xlsx";
import BarPlot from './Reports-page/BarPlot';
import ParPlot  from './Reports-page/ParPlot';
import {XYPlot, XAxis, YAxis, HorizontalGridLines, LabelSeries, VerticalGridLines, BarSeries} from 'react-vis';
import { yellow } from '@mui/material/colors';



function ReportList() {

  var date1= new Date().toISOString().slice(0,10)


  const [retrievedUser, setretrievedUser] = useState([]);
  const getUser = async () => {
    try {
      const resUser = await http.get("/users", auth.config);
      setretrievedUser(resUser.data);
      } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    getUser();
  }, []);


  const [retrievedDepartment, setretrievedDepartment] = useState([]);
  const getDepartment = async () => {
    try {
      const departmentReq =await  http.get("/department-list", auth.config);
      setretrievedDepartment(departmentReq.data);

      } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    getDepartment();
  }, []);

  const [retrievedTasks, setRetrievedTasks] = useState([]);

  const getTasks = async () => {
    try {
      const res = await http.get("/tasks-list", auth.config);
      setRetrievedTasks(res.data);
      } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    getTasks();
  }, []);

  const departments = retrievedDepartment.map(({ name }) => name);
  const departid = retrievedDepartment.map(({ id }) => id);


// filter dapetment 





var today = new Date();
var dd = String(today.getDate()).padStart(2, '0');
var mm = String(today.getMonth() + 1).padStart(2, '0'); //January is 0!
var yyyy = today.getFullYear();
today = dd + '/' + mm + '/' + yyyy;


 



  // Filter Function 
  const filtered = retrievedTasks.filter(task => {
    return task.date === Datevalue ;
  });
  const handleExportReport1 = () =>{
    console.log(filtered)
    XLSX = require('xlsx');
    var wb = XLSX.utils.book_new(),
    ws = XLSX.utils.json_to_sheet(filtered)
    XLSX.utils.book_append_sheet(wb,ws,"Report");
    XLSX.writeFile(wb,"Reports.xlsx");
};



const getInitialState = () => {
  const value = "" ;
  return value;
};

const [value, setValue] = useState(getInitialState);
const handleChange = (e) => {
  setValue(e.target.date1);
  
};





const filteredUser = retrievedTasks.filter(employee => {
  return employee.assign_to === parseInt(value);
});
const handleExportReport2 = () =>{
  XLSX = require('xlsx');
  var wb = XLSX.utils.book_new(),
  ws = XLSX.utils.json_to_sheet(filteredUser)
  XLSX.utils.book_append_sheet(wb,ws,"Report");
  XLSX.writeFile(wb,"Reports.xlsx");
};

//Report 3
const filterComplainTasks = retrievedTasks.filter(employee => {
  return employee.category === 1;
});
const filterClosedComplainTasks = retrievedTasks.filter(employee => {
  return employee.status === "closed";
});
const handleExportReport3 = () =>{
  XLSX = require('xlsx');
  var wb = XLSX.utils.book_new(),
  ws = XLSX.utils.json_to_sheet(filterClosedComplainTasks)
  XLSX.utils.book_append_sheet(wb,ws,"Report");
  XLSX.writeFile(wb,"Reports.xlsx");
};

// Report 4 
const filteropenComplainTasks = retrievedTasks.filter(employee => {
  return employee.status === "open";
});
const handleExportReport4 = () =>{
  XLSX = require('xlsx');
  var wb = XLSX.utils.book_new(),
  ws = XLSX.utils.json_to_sheet(filteropenComplainTasks)
  XLSX.utils.book_append_sheet(wb,ws,"Report");
  XLSX.writeFile(wb,"Reports.xlsx");
};

function filterTasksByDate(status, date) {
  const filteredTasks = retrievedTasks.filter((task) => {
    const dateUpdated = task.updated.split("/");
    return (
      task.status == status && `${dateUpdated[1]}/${dateUpdated[2]}` == date
    );
  });

  return filteredTasks;
}

const [Datevalue, setDateValue] = useState(date1);
const [x, setx] = useState([]);
const [y, sety] = useState([]);
const handleDateChange = (e) => {
setDateValue(Datevalue = e.target.value);
  //2022-07-13
var dd = Datevalue.slice(8,10)
var mm = Datevalue.slice(5,7)
var yyyy = Datevalue.slice(0,4)
setDateValue(Datevalue = dd + '/' + mm + '/' + yyyy)
const pendingCount = 0;
const isOpenToday = (value) =>
  value.status == "open" && value.date == Datevalue;
 const isClosedToday = (value) =>
  value.status == "closed" && value.date == Datevalue;
const openCount = retrievedTasks.filter(isOpenToday);
const closedCount = retrievedTasks.filter(isClosedToday);
sety(y = [openCount.length ,closedCount.length ,pendingCount]);
setx( x= ["open", "closed", "pending"]);
console.log(x)
console.log(y)

};


const [retrievedSeviceTypes, setRetrievedSeviceTypes] = useState([]);
const getServiceType = async () => {
  try {
    const res = await http.get("/service-type-list", auth.config);
    setRetrievedSeviceTypes(res.data);
  } catch (error) {
    console.log(error);
  }
};
useEffect(() => {
  getTasks();
  getServiceType();
}, []);

function filterServiceType(service_name) {
  const getServiceId = retrievedSeviceTypes.filter((service) => {
    return service.service == service_name;
  });
  const filteredTasks = retrievedTasks.filter((task) => {

    return task.service_type == getServiceId[0]?.id;
  });

  return filteredTasks.length;
}
const isOpen = (value) => value.status == "open";
const isClosed = (value) => value.status == "closed";

const [analysis1, setanalysis1] = useState(false);
const handleChangeanalysis1 = (e) => {
  setanalysis1(true);
};
  // Analysis 2
  const [analysis2, setanalysis2] = useState(false);
  const [y1, sety1] = useState([]);
  
  const handleChangeanalysis2 = (e) => {
    const open = retrievedTasks.filter(isOpen);
    const closed = retrievedTasks.filter(isClosed);
    const pending =0;
    sety1(y1= [open.length,closed.length,pending.length])
    setx( x= ["open", "closed", "pending"]);

    console.log(y1)
    setanalysis1(false);
    setanalysis2(true)

  };


  // Analysis 3

const [analysis3, setanalysis3] = useState(false);
const [x2,setx2] = useState([]);
const [y2,sety2]= useState([]);
const handleChangeanalysis3 = (e) => {
  const services = retrievedSeviceTypes.map(({ service }) => service);
  const servicesId = retrievedSeviceTypes.map(({ id }) => id);
  setx2(x2= services)
  console.log(x2)
  const yy = []
  services.map((ser) => (
    yy.push(filterServiceType(ser))
  ))
  sety2(y2=yy)
  setanalysis1(false);
  setanalysis2(false);
  setanalysis3(true);
};

// retrive Category information 
const [retrievedCategory, setretrievedCategory] = useState([]);
const getCategory = async () => {
  try {
    const res = await http.get("category-list", auth.config);
    setretrievedCategory(retrievedCategory= res.data);
  } catch (error) {
    console.log(error);
  }
};
useEffect(() => {
  getTasks();
  getCategory();
}, []);

function filterCategory(Category_name) {
  const getCatId = retrievedCategory.filter((category) => {
    return category.category == Category_name;
  });
  const filteredTasks = retrievedTasks.filter((task) => {

    return task.category == getCatId[0]?.id;
  });

  return filteredTasks.length;
}
// Analysis 4

const [analysis4, setanalysis4] = useState(false);
const [x3,setx3] = useState([]);
const [y3,sety3]= useState([]);
const handleChangeanalysis4 = (e) => {
  const Categories = retrievedCategory.map(({ category }) => category);
  const servicesId = retrievedCategory.map(({ id }) => id);
  setx3(x3= Categories)
  console.log(x3)
  const yyy = []
  Categories.map((ser) => (
    yyy.push(filterCategory(ser))
  ))
  sety3(y3=yyy)
  setanalysis1(false);
  setanalysis2(false);
  setanalysis3(false);
  setanalysis4(true);
  console.log(y3)

};


return (
  <>

	<div className="flex flex-col justify-center items-center w-full px-3 py-3 h-1/2  rounded-md shadow-md">
  <legend className="md:text-3xl pb-8 text-[#F2F2F2] py-5">
  Reports
  </legend>
  <div  className="w-1/2  text-black mb-6 ">
    <form>
    <label className="w-1/2 pr-4 text-lg text-white "> Staff </label>
                      <select onChange={handleChange} >
                        <option
                          className="pr-4 text-lg text-white "
                          value=" "
                        />
                        {retrievedUser.map((user) => (
                          <option key={user.id} value={user.id}>
                            {`${user.first_name} ${user.last_name}`}
                          </option>
                        ))}
                      </select>
    <label className=" ml-4 w-1/2 pr-4 text-lg text-white " > Date</label>
    <input type="date" onChange={handleDateChange} />    
    </form>
  </div>
	<table className="w-1/2 border-collapse text-white border-separate border border-slate-400">
    <thead className="bg-gray">
      <tr>
        <td className="border border-slate-300  px-4 bg-gray-600">no.</td>
        <td className="border border-slate-300   px-4 bg-gray-600 ">Report Name </td>
        <td className="border border-slate-300  px-4  bg-gray-600">download</td>
      </tr>
    </thead>
    <tbody>
    <tr>
        <td className="border border-slate-300 px-4"> 1.</td>
        <td className="border border-slate-300 px-4">Summary for whole day</td>
        <td className="border border-slate-300 px-4" > 
        <button  onClick={handleExportReport1}>Excel</button>
        </td>
    </tr>
    <tr>
        <td className="border border-slate-300 px-4"> 2.</td>
        <td className="border border-slate-300 px-4">Filter By name</td>
        <td className="border border-slate-300 px-4" > 
        <button   onClick={handleExportReport2}>Excel</button>
        </td>
    </tr>
    <tr>
        <td className="border border-slate-300 px-4"> 3.</td>
        <td className="border border-slate-300 px-4">Resolved Complain</td>
        <td className="border border-slate-300 px-4" > 
        <button   onClick={handleExportReport3}>Excel</button>
        </td>
    </tr>
    <tr>
        <td className="border border-slate-300 px-4"> 4.</td>
        <td className="border border-slate-300 px-4">Pending Complain</td>
        <td className="border border-slate-300 px-4" > 
        <button   onClick={handleExportReport4}>Excel</button>
        </td>
    </tr>
    </tbody>    
	</table>
  </div>
  

<div className="flex flex-col justify-center items-center w-full px-3 py-3 h-1/2  rounded-md shadow-md">
  <legend className="md:text-3xl pb-8 text-[#F2F2F2] py-5">
  Analysis
  </legend>
  <table className="w-1/2 border-collapse text-white border-separate border border-slate-400">
    <thead className="bg-gray">
      <tr>
        <td className="border border-slate-300  px-4 bg-gray-600">no.</td>
        <td className="border border-slate-300   px-4 bg-gray-600 ">Report Name </td>
        <td className="border border-slate-300  px-4  bg-gray-600">download</td>
      </tr>
    </thead>
    <tbody>
    <tr>
        <td className="border border-slate-300 px-4"> 1.</td>
        <td className="border border-slate-300 px-4">Total Tasks as per the status</td>
        <td className="border border-slate-300 px-4" > 
        <button  onClick={handleChangeanalysis1}>Export</button>
        </td>
    </tr>
    <tr>
        <td className="border border-slate-300 px-4"> 2.</td>
        <td className="border border-slate-300 px-4"> Total Tasks Status</td>
        <td className="border border-slate-300 px-4" > 
        <button   onClick={handleChangeanalysis2}>Export</button>
        </td>
    </tr>
    <tr>
        <td className="border border-slate-300 px-4"> 3.</td>
        <td className="border border-slate-300 px-4">Tasks per services </td>
        <td className="border border-slate-300 px-4" > 
        <button   onClick={handleChangeanalysis3}>Export</button>
        </td>
    </tr>
    <tr>
        <td className="border border-slate-300 px-4"> 4.</td>
        <td className="border border-slate-300 px-4">Tasks per Category</td>
        <td className="border border-slate-300 px-4" > 
        <button   onClick={handleChangeanalysis4}>Export</button>
        </td>
    </tr>
    </tbody>    
	</table>
  <h2 className='text-white'></h2>
  <h2 className='text-white'></h2>
  </div>
  <div className='flex flex-col justify-center items-center'>
      {
      analysis1 ?
      <BarPlot x={x} y={y} title={` Total Tasks as per the status for ${Datevalue}`} />
      : analysis2 ?
      <BarPlot x={x} y={y1} title={"Total Tasks Status"} />
      : analysis3 ?
      <ParPlot x={x2} y={y2} title={"Total Number of Tasks as per the service type" }/>
      :
      analysis4 ?
      <BarPlot x={x3} y={y3} title={"Total Number of Tasks per Category" }/> 
      :
      <></>
      }  
      
  </div>
  </>
);
}

export default ReportList;
