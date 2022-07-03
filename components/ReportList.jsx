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
const date = new Date();

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
      console.log(res.data);
      } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getTasks();
  }, []);

  const filtered = retrievedTasks.filter(employee => {
    return employee.status === 'open';
  });
  const handleExport = () =>{
    XLSX = require('xlsx');
    var wb = XLSX.utils.book_new(),
    ws = XLSX.utils.json_to_sheet(filtered)

    XLSX.utils.book_append_sheet(wb,ws,"Report");
    XLSX.writeFile(wb,"Reports.xlsx");
};



return (
  <>

	<div className="flex flex-col justify-center items-center w-full px-3 py-3 h-1/2  rounded-md shadow-md">
  <legend className="md:text-3xl pb-8 text-[#F2F2F2] py-5">
  Reports
  </legend>
    
	<table className="w-1/2 border-collapse text-white border-separate border border-slate-400">
    <thead>
      <tr>
        <td className="border border-slate-300  ">no.</td>
        <td className="border border-slate-300  ">Report Name </td>
        <td className="border border-slate-300  ">Date</td>
        <td className="border border-slate-300  ">download</td>
      </tr>
    </thead>
    <tbody>
    <tr>
        <td className="border border-slate-300 px-4"> 1.</td>
        <td className="border border-slate-300 px-4">Summary for whole day</td>
        <td className="border border-slate-300 px-4" ><Moment format='MMMM Do YYYY'>{date}</Moment></td>
        <td className="border border-slate-300 px-4" > 
        <button  onClick={handleExport}>Export</button>
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
