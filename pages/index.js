import RenderHead from "../components/RenderHead";
import SideBar from "../components/navigation/SideBar";
import ClientModalForm from "../components/ClientModalForm";
import auth from "../lib/services/authService";
import { useState, useEffect } from "react";
import Counters from "../components/dashboard/Counters"
import {App} from "../components/dashboard/Charts"


export default function Home(props) {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    if (!auth.getCurrentUser()) {
      window.location.href = "/Login";
    } else {
      setIsLoggedIn(true);
    }
  }, []);

  return (
    <>
      {isLoggedIn && (
        <section className="relative p-4 ml-16">
          <RenderHead title="Home" />
          <SideBar />
          {/* <ClientModalForm /> */}
          <Counters/>
          <App/>
        </section>
      )}
    </>
  );
}
