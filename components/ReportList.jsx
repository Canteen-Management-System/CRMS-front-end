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

      console.log(departid)
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
      console.log(retrievedTasks)
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


  // Analysis 2
const [analysis2, setanalysis2] = useState(false);
const [x2, setx2] = useState([]);
const [y2, sety2] = useState([]);

const handleChangeanalysis2 = (e) => {
  setanalysis1(false);
  setx2(x2=departments)
  setanalysis2(true);
  
};


var today = new Date();
var dd = String(today.getDate()).padStart(2, '0');
var mm = String(today.getMonth() + 1).padStart(2, '0'); //January is 0!
var yyyy = today.getFullYear();
today = dd + '/' + mm + '/' + yyyy;


 

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
const openCount = filteropenComplainTasks.length;
const closedCount = filterClosedComplainTasks.length;
const pendingCount = 0;
sety(y = [openCount,closedCount,pendingCount]);
setx( x= ["open", "closed", "pending"]);

};

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


const [analysis1, setanalysis1] = useState(false);
const handleChangeanalysis1 = (e) => {
  setanalysis1(true);
  
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
        <td className="border border-slate-300 px-4">Tasks updated status per day </td>
        <td className="border border-slate-300 px-4" > 
        <button  onClick={handleChangeanalysis1}>Excel</button>
        </td>
    </tr>
    <tr>
        <td className="border border-slate-300 px-4"> 2.</td>
        <td className="border border-slate-300 px-4">Total Tasks per department</td>
        <td className="border border-slate-300 px-4" > 
        <button   onClick={handleChangeanalysis2}>Excel</button>
        </td>
    </tr>
    <tr>
        <td className="border border-slate-300 px-4"> 3.</td>
        <td className="border border-slate-300 px-4">Daily Pending complain Number</td>
        <td className="border border-slate-300 px-4" > 
        <button   onClick={handleExportReport3}>Excel</button>
        </td>
    </tr>
    <tr>
        <td className="border border-slate-300 px-4"> 4.</td>
        <td className="border border-slate-300 px-4">Daily Resolved complain Number</td>
        <td className="border border-slate-300 px-4" > 
        <button   onClick={handleExportReport4}>Excel</button>
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
      <BarPlot x={x} y={y} Datevalue={Datevalue} />
      : analysis2 ?
      <ParPlot filteredTasks={retrievedTasks}/>
      : 
      <></>
      }  
      
  </div>
  </>
);
}

export default ReportList;
