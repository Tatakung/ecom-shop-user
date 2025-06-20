import React from "react";
import { Outlet } from "react-router-dom";
import Nav from "../components/Nav";
import useMyStore from "../global-state/bigdata";
import NavUser from "../components/NavUser";
const Layoutnormal = () => {
  const user = useMyStore((state) => state.user);
  return (
    <div>
      {/* <Nav /> */}
      {
        user && user.role === 'user' ? <NavUser/> : <Nav/>
      }
      <main className="h-full px-4 mt-2 mx-auto">
        <Outlet />
      </main>
    </div>
  );
};

export default Layoutnormal;
