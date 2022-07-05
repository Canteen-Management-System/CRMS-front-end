import { useState, useEffect } from "react";
import RenderHead from "../components/RenderHead";
import RenderHeader from "../components/RenderHeader";
import RenderStaff from "../components/staff-page";
import dynamic from "next/dynamic";
import auth from "../lib/services/authService";

const SideBar = dynamic(() => import("../components/navigation/SideBar"), {
  ssr: false,
});

export default function Contacts() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    if (!auth.getCurrentUser()) {
      window.location.href = "/Login";
    } else {
      setIsLoggedIn(true);
    }
  }, []);

  return (
    isLoggedIn && (
      <div className="ml-16">
        <RenderHead title="Staff" />
        <SideBar />
        <RenderHeader pageTitle="Staff" />
        <RenderStaff />
      </div>
    )
  );
}
