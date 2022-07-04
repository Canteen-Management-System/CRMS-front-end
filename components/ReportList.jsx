import Moment from 'react-moment';
import { useState, useEffect } from "react";
import axios from "axios";
import auth from "../lib/services/authService"
import http from "../lib/services/httpService";
import XLSX from "xlsx";
import { Button } from 'bootstrap';
// import LineChart from 'reactochart/LineChart';
// import * as Reactochart from 'reactochart';
// import XYPlot from 'reactochart/XYPlot';
// import XAxis from 'reactochart/XAxis';
// import YAxis from 'reactochart/YAxis';
// import 'reactochart/styles.css';





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


var today = new Date();
var dd = String(today.getDate()).padStart(2, '0');
var mm = String(today.getMonth() + 1).padStart(2, '0'); //January is 0!
var yyyy = today.getFullYear();
today = dd + '/' + mm + '/' + yyyy;

const data = [{no:1,report:"Summary for whole day"},
                   {no:2,report:"Filter By name"},
                   {no:3,report:"Resolved Complain"},
                   {no:4,report:"Pending Complain"},]


const Analysis = [{no:1,report:"Average Time of complain"},
              {no:2,report:"Daily Complain Number "},
              {no:3,report:"Daily Pending complain Number"},
              {no:4,report:"Daily Resolved complain Number"},
              {no:4,report:"Breakdown of departemts"},]
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

  const [Datevalue, setDateValue] = useState(date1);
  const  formatedDay =  Datevalue
const handleDateChange = (e) => {
  setDateValue(Datevalue = e.target.value);
  //2022-07-13
  var dd = Datevalue.slice(8,10)
  var mm = Datevalue.slice(5,7)
  var yyyy = Datevalue.slice(0,4)
  formatedDay  = dd + '/' + mm + '/' + yyyy;
console.log(formatedDay)
};

  // Filter Function 
  const filtered = retrievedTasks.filter(task => {
    console.log(task.date);
    return task.date === formatedDay ;
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
    <input type="date" onChange={handleDateChange}/>    
    </form>
  </div>
	<table className="w-1/2 border-collapse text-white border-separate border border-slate-400">
    <thead>
      <tr>
        <td className="border border-slate-300  px-4">no.</td>
        <td className="border border-slate-300   px-4 ">Report Name </td>
        <td className="border border-slate-300  px-4 ">download</td>
      </tr>
    </thead>
    <tbody>
    <tr>
        <td className="border border-slate-300 px-4"> 1.</td>
        <td className="border border-slate-300 px-4">Summary for whole day</td>
        <td className="border border-slate-300 px-4" > 
        <button  onClick={handleExportReport1}>Export</button>
        </td>
    </tr>
    <tr>
        <td className="border border-slate-300 px-4"> 2.</td>
        <td className="border border-slate-300 px-4">Filter By name</td>
        <td className="border border-slate-300 px-4" > 
        <button   onClick={handleExportReport2}>Export</button>
        </td>
    </tr>
    </tbody>    
	</table>
  </div>
{/* 
<div className="flex flex-col justify-center items-center w-full px-3 py-3 h-1/2  rounded-md shadow-md">
  <legend className="md:text-3xl pb-8 text-[#F2F2F2] py-5">
  Analysis
  </legend>
    
	<table className="w-1/2 border-collapse text-white border-separate border border-slate-400">
		<tr>
		<th className="border border-slate-300  ">no.</th>
		<th className="border border-slate-300">Report Name </th>
		<th className="border border-slate-300">Date </th>
        <th className="border border-slate-300">download</th>
		</tr>
        {Analysis.map((val, key) => {
          return (
            <tr key={key}>
              <td className="border border-slate-300 px-4">{val.no}</td>
              <td className="border border-slate-300 px-4">{val.report}</td>
              <td className="border border-slate-300 px-4" ><Moment format='MMMM Do YYYY, h:mm:ss a'>{date}</Moment></td>
              <td className="border border-slate-300 px-4" > HTML //   Excel  //  pdf </td>


            </tr>
          )
        })}
	
	</table>
  </div> */}
  {/* <XYPlot>
    <XAxis title="Phase" />
    <YAxis title="Intensity" />
    <LineChart
      data={Array(100)
        .fill()
        .map((e, i) => i + 1)}
      x={d => d}
      y={d => Math.sin(d * 0.1)}
    />
  </XYPlot> */}
  </>
);
}

export default ReportList;
