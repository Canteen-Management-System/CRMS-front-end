import React, { useState, useEffect } from "react";
import Image from "next/image";
import { MdFavoriteBorder, MdChat } from "react-icons/md";
import Employee from "./Employee";
import XLSX from "xlsx";


export default function DisplayEmployees({ getStaff , returnedData }) {
  
  const [data, setData] = useState([]);

  useEffect(() => {
    const getEmployers = async () => {
      const res = await getStaff();
      setData([res?.users, res?.departments]);
    };
    getEmployers();
  }, []);
  // {data[1].filter((item) => item.id == user.department)[0]?.name}
  const [q,setQ]=useState("");
  const [searchcolumns,setSearchcolumns] = useState(["id"])
  let t = 0
  function search(rows){
    return rows.filter((row) =>
    searchcolumns.some((column) => row[column].toString().toLowerCase().indexOf(q.toLowerCase())>-1
      )
    );
  }
  const test = returnedData.users[0]
  
  const columns =  Object.keys(test || {});


  const handleExport = () =>{
    XLSX = require('xlsx');
    var wb = XLSX.utils.book_new(),
    ws = XLSX.utils.json_to_sheet(search(returnedData.users))

    XLSX.utils.book_append_sheet(wb,ws,"staff");
    XLSX.writeFile(wb,"stafflist.xlsx");
};
  return (
    <>
    <div className="flex flex-column justify-left items-left w-3/4 md:w-3/4 h-3/4 pb-8  px-12 py-8 mx-8 my-8 bg-gray-500 rounded-md shadow-md">
        

    <input placeholder="  Search" type={"text"} value={q} onChange={(e)=> setQ(e.target.value)} />
    {columns &&
      columns.map((column)=>( 
      <label  key={t+=1} className="mx-6 font-poppins text-white" >

        <input 
        className="mx-2"
        type="checkbox"
        checked = {searchcolumns.includes(column)}
        onChange={(e)=>{
          const checked = searchcolumns.includes(column);
        setSearchcolumns((prev) =>
        checked
        
        ? prev.filter((sc)=> sc !== column)
      : [...prev, column]
      );
      }}
    />
    {column}
      </label>
    ))}
    <button className="px-8 py-2   ml-12 mb-5 text-black bg-white  rounded" onClick={handleExport}>Export</button>


  </div>
    <div className="z-0 flex flex-wrap items-center w-1/4 text-white rounded-md shadow-md md:w-full h-1/5">
      {data.length != 0
        ? search(returnedData.users).map((user, idx) => {
            return (
              <div
                key={idx}
                style={{ zIndex: 1 }}
                className=" bg-[#748DA6] rounded-md  m-8  items-center justify-center pb-5"
              >
                <p className="ml-2 ">
                  <Image
                    src="https://pngimage.net/wp-content/uploads/2020/03/employee-logo-png-2.jpg"
                    alt="Landscape picture"
                    width={250}
                    height={200}
                  />
                </p>
                <p className="ml-16 text-white">
                  <MdChat size={25} className="ml-16 text-white " /> Employee ID
                  : <b>{user.id}</b>
                </p>
                <p className="text-white">
                  Employee Name :{" "}
                  <b>
                    {user.first_name} {user.last_name}
                  </b>
                </p>
                <p className="text-white">
                  Department :{" "}
                  <b>
                    {
                      data[1].filter((item) => item.id == user.department)[0]
                        ?.name
                    }
                  </b>
                </p>

                <p className="text-white">
                  Mobile: <b>{user.phone}</b>
                </p>
              </div>
            );
          })
        : ""}
    </div>
    </>

  );
}
