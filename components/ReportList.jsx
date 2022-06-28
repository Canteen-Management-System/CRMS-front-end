import React  from "react";
import { render } from "react-dom";
import Moment from 'react-moment';

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



               





 
function ReportList() {
return (
  <>

	<div className="flex flex-col justify-center items-center w-full px-3 py-3 h-1/2  rounded-md shadow-md">
  <legend className="md:text-3xl pb-8 text-[#F2F2F2] py-5">
  Reports
  </legend>
    
	<table className="w-1/2 border-collapse text-white border-separate border border-slate-400">
		<tr>
		<th className="border border-slate-300  ">no.</th>
		<th className="border border-slate-300">Report Name </th>
		<th className="border border-slate-300">Date </th>
        <th className="border border-slate-300">download</th>
		</tr>
        {data.map((val, key) => {
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
  </div>

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
  </div>
  </>
);
}

export default ReportList;
