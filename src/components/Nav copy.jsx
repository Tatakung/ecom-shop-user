import React from "react";
import { Link } from "react-router-dom";

const Nav = () => {
  const logout = () => {};
  return (
    <div>
      <nav
        className="navbar navbar-expand-lg bg-info"
        style={{ backgroundColor: "#0000" }}
      >
        <div className="container">
          <Link className="navbar-brand" href="#">
            Navbar
          </Link>
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarNav"
            aria-controls="navbarNav"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarNav">
            <ul className="navbar-nav">
              <li className="nav-item">
                <Link to="products-total" className="nav-link active" aria-current="page" href="#">
                  สินค้าทั้งหมด
                </Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" href="#">
                  ประวัติการซื้อ
                </Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" href="#">
                  ตะกร้า
                </Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" to={"/login"}>
                  login
                </Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" to={"/register"}>
                  สมัครสมาชิก
                </Link>
              </li>
              <li className="nav-item">
                <button className="nav-link" onClick={() => logout()}>
                  logout
                </button>
              </li>
            </ul>
          </div>
        </div>
      </nav>
    </div>
  );
};

export default Nav;
