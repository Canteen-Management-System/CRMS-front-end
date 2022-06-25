import {
  ArrowCircleLeftIcon,
  ArrowCircleRightIcon,
} from "@heroicons/react/solid";
import { useState } from "react";
import UserInfo from "./UserInfo";
import NavigationButtons from "./NavigationButtons";

export default function SideBar() {
  const [toggle, setToggle] = useState(true);

  const handleToggle = () => {
    setToggle(!toggle);
  };

  return (
    <section>
      <div
        className={` fixed top-0 left-0 w-72 h-screen bg-gradient-to-r from-light-blue to-dark-blue  ${
          toggle ? "-translate-x-3/4" : "translate-x-0"
        } ease-linear duration-300 shadow-md z-50`}
      >
        {!toggle ? (
          <ArrowCircleLeftIcon
            className={`absolute right-0 w-8 h-8 mt-4 mr-4 text-white cursor-pointer hover:scale-125`}
            onClick={handleToggle}
          />
        ) : (
          <ArrowCircleRightIcon
            className={`absolute right-0 w-8 h-8 mt-4 mr-4 text-white cursor-pointer hover:scale-125`}
            onClick={handleToggle}
          />
        )}
        <UserInfo />
        <NavigationButtons />
      </div>
    </section>
  );
}
