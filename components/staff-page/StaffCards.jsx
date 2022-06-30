import React, { useState, useEffect } from "react";
import Image from "next/image";
import { MdFavoriteBorder, MdChat } from "react-icons/md";
import Employee from "./Employee";

export default function DisplayEmployees({ getStaff }) {
  const [data, setData] = useState([]);

  useEffect(() => {
    const getEmployers = async () => {
      const res = await getStaff();
      setData([res?.users, res?.departments]);
    };
    getEmployers();
  }, []);
  // {data[1].filter((item) => item.id == user.department)[0]?.name}
  return (
    <div className="z-0 flex flex-wrap items-center w-1/4 text-white rounded-md shadow-md md:w-full h-1/5">
      {data.length != 0
        ? data[0].map((user, idx) => {
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
  );
}
