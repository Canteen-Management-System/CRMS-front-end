import RenderTasks from "../components/logs-page";
import { useState, useEffect } from "react";
import RenderHeader from "../components/RenderHeader";
import RenderHead from "../components/RenderHead";
import dynamic from "next/dynamic";
import auth from "../lib/services/authService";

const SideBar = dynamic(() => import("../components/navigation/SideBar"), {
  ssr: false,
});

export default function Log() {
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
      <div className="relative ml-16">
        <RenderHead title="Logs" />
        <RenderHeader pageTitle="Logs" />
        <RenderTasks />
        <SideBar />
      </div>
    )
  );
}
