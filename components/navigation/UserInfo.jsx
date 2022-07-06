import React from "react";
import { UserCircleIcon } from "@heroicons/react/solid";
import { LogoutIcon } from "@heroicons/react/outline";
import auth from "../../lib/services/authService";
import Image from "next/image";

export default function UserInfo() {
  const handleLogout = () => {
    auth.logout();
    window.location.href = "/Login";
  };

  const { user_id, first_name, role } = auth.getCurrentUser();
  return (
    <div className="w-full">
      <div className="mx-auto mt-8 mb-8 text-white rounded-full w-36 h-36">
        <Image
          src="/assets/user.jpg"
          width={150}
          height={150}
          alt="User Photo"
          layout="responsive"
          className="rounded-full"
        />
      </div>
      {/* <UserCircleIcon className="h-auto mx-auto mt-10 text-white w-36" /> */}
      <h4 className="text-lg text-center text-[#BDBDBD] font-poppins font-medium">
        Hello, {first_name}
      </h4>
      <h4 className="text-lg text-center text-[#BDBDBD] font-poppins font-medium">
        ID: {user_id}
      </h4>

      <LogoutIcon
        className="w-8 text-[#C5CAE9] mx-auto cursor-pointer pt-4"
        onClick={handleLogout}
      />
    </div>
  );
}
