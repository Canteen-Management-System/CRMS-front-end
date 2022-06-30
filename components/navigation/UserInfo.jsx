import React from "react";
import { UserCircleIcon } from "@heroicons/react/solid";
import { LogoutIcon } from "@heroicons/react/outline";
import auth from "../../lib/services/authService";

export default function UserInfo() {
  const handleLogout = () => {
    auth.logout();
    window.location.href = "/Login";
  };

  const { id, employer_id, first_name, role } = auth.getCurrentUser();
  // console.log(auth.getCurrentUser());
  return (
    <div className="w-full">
      <UserCircleIcon className="h-auto mx-auto mt-10 text-white w-36" />
      <h4 className="text-lg text-center text-[#BDBDBD] font-poppins font-medium">
        Hello, {first_name}
      </h4>
      <h4 className="text-lg text-center text-[#BDBDBD] font-poppins font-medium">
        ID: {employer_id}
      </h4>

      <LogoutIcon
        className="w-8 text-[#C5CAE9] mx-auto cursor-pointer pt-4"
        onClick={handleLogout}
      />
    </div>
  );
}
