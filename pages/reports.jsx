import { useState, useEffect } from "react";
import RenderHead from "../components/RenderHead";
import dynamic from "next/dynamic";
import auth from "../lib/services/authService";

const ReportList = dynamic(() => import("../components/ReportList"), {
  ssr: false,
});

const RenderHeader = dynamic(() => import("../components/RenderHeader"), {
  ssr: false,
});

const SideBar = dynamic(() => import("../components/navigation/SideBar"), {
  ssr: false,
});

export default function Reports() {
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
      <div className="my-8 ml-16">
        <RenderHead title="Reports" />
        <SideBar />
        <RenderHeader pageTitle="Reports" />
        <ReportList />
      </div>
    )
  );
}
