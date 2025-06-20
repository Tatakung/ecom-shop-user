import React from "react";
import { Outlet } from "react-router-dom";
import Nav from "../components/Nav";
import NavUser from "../components/NavUser";
const LayoutUser = () => {
  return (
    <div>
      <NavUser />
      <main className="h-full px-4 mt-2 mx-auto">
        <Outlet />
      </main>
    </div>
  );
};

export default LayoutUser;
