import React from "react";
import { Outlet } from "react-router-dom";
import Nav from "../components/Nav";
import Navbar from "../components/admin/Navbar";
import SidBar from "../components/admin/SidBar";
const LayoutAdmin = () => {
  return (
    <div>
     
      <div className="container-fluid">
        <div className="row">
          {/* Sidebar */}
          <div className="col-2 min-vh-100" style={{background : "#A53860" }}>
            <SidBar />
          </div>

          {/* Main Content */}
          <div className="col-10 p-4">
            <Outlet />
            
          </div>
        </div>
      </div>
    </div>
  );
};

export default LayoutAdmin;
