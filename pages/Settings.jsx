import { useState, useEffect } from "react";
import RenderHead from "../components/RenderHead";
import dynamic from "next/dynamic";
import RenderHeader from "../components/RenderHeader";
import RenderSettings from "../components/setting-page";
import auth from "../lib/services/authService";

const SideBar = dynamic(() => import("../components/navigation/SideBar"), {
  ssr: false,
});

export default function Settings() {
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
      <section className="ml-16">
        <RenderHead title="Settings" />
        <RenderHeader pageTitle="Settings" />
        <SideBar />
        <RenderSettings />
      </section>
    )
  );
}
