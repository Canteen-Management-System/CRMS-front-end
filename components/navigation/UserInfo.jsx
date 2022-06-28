import React from "react";
import { UserCircleIcon } from "@heroicons/react/solid";
import { LogoutIcon } from "@heroicons/react/outline";
import auth from "../../lib/services/authService";

export default function UserInfo() {
  const handleLogout = () => {
    auth.logout();
    window.location.href = "/Login";
  };

  return (
    <div className="w-full">
      <UserCircleIcon className="h-auto mx-auto mt-10 text-white w-36" />
      <h4 className="text-lg text-center text-[#BDBDBD] font-poppins font-medium">
        Username
      </h4>
      <LogoutIcon
        className="w-8 text-[#C5CAE9] mx-auto cursor-pointer pt-4"
        onClick={handleLogout}
      />
    </div>
  );
}
