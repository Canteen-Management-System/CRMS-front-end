import React, { useState, useEffect } from "react";
import Image from "next/image";
import { MdFavoriteBorder, MdChat } from "react-icons/md";
import XLSX from "xlsx";

export default function DisplayEmployees({ getStaff, returnedData }) {
  const [data, setData] = useState([]);

  useEffect(() => {
    const getEmployers = async () => {
      const res = await getStaff();
      setData([res?.users, res?.departments]);
    };
    getEmployers();
  }, []);

  const [q, setQ] = useState("");
  const [searchcolumns, setSearchcolumns] = useState(["id"]);
  let t = 0;
  function search(rows) {
    return rows.filter((row) =>
      searchcolumns.some(
        (column) =>
          row[column].toString().toLowerCase().indexOf(q.toLowerCase()) > -1
      )
    );
  }
  const test = returnedData.users[0];

  const columns = Object.keys(test || {});

  const handleExport = () => {
    XLSX = require("xlsx");
    var wb = XLSX.utils.book_new(),
      ws = XLSX.utils.json_to_sheet(search(returnedData.users));

    XLSX.utils.book_append_sheet(wb, ws, "staff");
    XLSX.writeFile(wb, "stafflist.xlsx");
  };
  return (
    <>
      <section className="w-1/2 p-8 mx-auto bg-[#303F9F] rounded-md h-50 mb-12">
        <input
          className="w-full h-10 px-3 mb-8 text-xl rounded shadow-lg focus:outline-none focus:shadow-outline"
          type="search"
          placeholder="Search..."
          value={q}
          onChange={(e) => setQ(e.target.value)}
        />
        <div className="flex flex-row flex-wrap pb-4 ">
          {columns &&
            columns.map((column) => (
              <label
                key={(t += 1)}
                className="px-4 mx-2 text-white font-poppins"
              >
                <input
                  className="mx-2"
                  type="checkbox"
                  checked={searchcolumns.includes(column)}
                  onChange={(e) => {
                    const checked = searchcolumns.includes(column);
                    console.log(searchcolumns);
                    setSearchcolumns((prev) =>
                      checked
                        ? prev.filter((sc) => sc !== column)
                        : [...prev, column]
                    );
                  }}
                />
                {column}
              </label>
            ))}
        </div>

        <button
          className="px-8 py-4 mx-auto mb-5 ml-12 text-black bg-white rounded"
          onClick={handleExport}
        >
          Export
        </button>
      </section>
      <div className="z-0 flex flex-wrap items-center justify-center w-full gap-16 p-8 mt-8 text-white rounded-md font-poppins">
        {data.length != 0
          ? search(returnedData.users).map((user, idx) => {
              return idx > 0 ? (
                <div
                  key={idx}
                  className=" relative bg-[#536DFE] rounded-md md:w-1/4 flex flex-col items-center pt-16 pb-4 px-4 border-1"
                >
                  <span className="absolute left-[calc(50%-50px)] -top-1/4 rounded-full">
                    <Image
                      src="/assets/demo.jpg"
                      alt="Landscape picture"
                      className="border-2 border-black rounded-full shadow-md"
                      width={100}
                      height={100}
                    />
                  </span>
                  <p className="text-white">
                    Employee ID : <b>{user.id}</b>
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
              ) : null;
            })
          : ""}
      </div>
    </>
  );
}
