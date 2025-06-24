import React from "react";
import { Link, useLocation } from "react-router-dom";
import useMyStore from "../../global-state/bigdata";
import { useNavigate } from "react-router-dom";

const SidBar = () => {
  const logout = useMyStore((state) => state.actionLogout);
  const navigate = useNavigate();
  const location = useLocation();

  const clickLogout = () => {
    logout();
    navigate("/products-total");
  };

  const colors = {
    activeLinkBg: "#e9ecef",        
    activeLinkText: "#212529",      
    linkHoverBg: "#f8f9fa",         
    linkHoverText: "#212529",       
  };

  const Icons = {
    Shop: () => (
      <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" fill="currentColor" className="bi bi-shop me-2" viewBox="0 0 16 16">
        <path d="M2.97 1.35A1 1 0 0 0 2 2.316V4h.5A1.5 1.5 0 0 1 4 5.5V14a2 2 0 0 0 2 2h4a2 2 0 0 0 2-2V5.5A1.5 1.5 0 0 1 13.5 4H14V2.316a1 1 0 0 0-.97-1.016l-.106.014L7.5 4.907.03 1.35Zm1.25 10A.5.5 0 0 1 4 11.5v-4a.5.5 0 0 1 1 0v4a.5.5 0 0 1-.5.5zm-1 0A.5.5 0 0 1 3 11.5v-4a.5.5 0 0 1 1 0v4a.5.5 0 0 1-.5.5zm-1 0A.5.5 0 0 1 2 11.5v-4a.5.5 0 0 1 1 0v4a.5.5 0 0 1-.5.5zm7 0A.5.5 0 0 1 11 11.5v-4a.5.5 0 0 1 1 0v4a.5.5 0 0 1-.5.5zm-1 0A.5.5 0 0 1 10 11.5v-4a.5.5 0 0 1 1 0v4a.5.5 0 0 1-.5.5zm-1 0A.5.5 0 0 1 9 11.5v-4a.5.5 0 0 1 1 0v4a.5.5 0 0 1-.5.5Z"/>
      </svg>
    ),
    Home: () => (
      <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" fill="currentColor" className="bi bi-speedometer2 me-2" viewBox="0 0 16 16">
        <path d="M8.002 4.902a1.5 1.5 0 0 1 1.061-.439h1.365c.447 0 .752.413.567.828l-1.07 2.14a.75.75 0 0 0 .749 1.118h.619c.477 0 .888.337 1.085.799l.061.167a.75.75 0 0 1-.416.911l-1.293.431a.75.75 0 0 0-.495.772v.619c0 .415-.297.75-.75.75H4.152a.75.75 0 0 1-.75-.75v-.619a.75.75 0 0 0-.495-.772l-1.293-.431a.75.75 0 0 1-.416-.911l.061-.167c.197-.462.608-.799 1.085-.799h.619a.75.75 0 0 0 .749-1.118L6.877 5.291a.75.75 0 0 1 .567-.828H8.002Z"/>
        <path fillRule="evenodd" d="M11.972 2.766a.5.5 0 0 1 .53-.083l1.018.328a.5.5 0 0 1 .398.71l-1.745 2.181a.5.5 0 0 1-.458.113L11.082 5.8a.5.5 0 0 1-.58-.337l-.066-.179c-.06-.16-.145-.299-.25-.411l-.004-.004a.5.5 0 0 1-.042-.04L9.006 3.099a.5.5 0 0 1-.133-.518l.004-.007a.5.5 0 0 1 .099-.148L9.842 2.1a.5.5 0 0 1 .28-.052l.002.002a.5.5 0 0 1 .074-.012l.024-.002a.5.5 0 0 1 .074-.006l.04-.002a.5.5 0 0 1 .082-.002h.13a.5.5 0 0 1 .074.006l.04.002Z"/>
        <path d="M0 3.992c0-.53.43-1 .962-1h.774q.251 0 .49.034l.056.009a.5.5 0 0 1 .099.018l.041.008a.5.5 0 0 1 .08.016l.04.008a.5.5 0 0 1 .073.016L3.921 4.54a.5.5 0 0 1 .133.518l-.004.007a.5.5 0 0 1-.099.148l-1.134 1.15a.5.5 0 0 1-.377.151h-.103a.5.5 0 0 1-.377-.15l-.06-.062a.5.5 0 0 1-.161-.383v-.176a.5.5 0 0 0-.75-.433L.392 3.86a.5.5 0 0 1-.392-.914Z"/>
      </svg>
    ),
    Tags: () => (
      <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" fill="currentColor" className="bi bi-tags me-2" viewBox="0 0 16 16">
        <path d="M4.002 2h4a1 1 0 0 1 1 1v2.586a1 1 0 0 0 .293.707l7 7a1 1 0 0 1 0 1.414l-4 4a1 1 0 0 1-1.414 0l-7-7A1 1 0 0 0 2 9.002V5a1 1 0 0 1 1-1v-1a1 1 0 0 1 1-1zm1.5 1a.5.5 0 1 0 0-1 .5.5 0 0 0 0 1z"/>
      </svg>
    ),
    PlusSquare: () => (
      <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" fill="currentColor" className="bi bi-plus-square me-2" viewBox="0 0 16 16">
        <path d="M14 1a1 1 0 0 1 1 1v12a1 1 0 0 1-1 1H2a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1h12zM2 0a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2H2z"/>
        <path d="M8 4a.5.5 0 0 1 .5.5v3h3a.5.5 0 0 1 0 1h-3v3a.5.5 0 0 1-1 0v-3h-3a.5.5 0 0 1 0-1h3v-3A.5.5 0 0 1 8 4z"/>
      </svg>
    ),
    ListUl: () => (
      <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" fill="currentColor" className="bi bi-list-ul me-2" viewBox="0 0 16 16">
        <path fillRule="evenodd" d="M5 11.5a.5.5 0 0 1 .5-.5h9a.5.5 0 0 1 0 1h-9a.5.5 0 0 1-.5-.5zm0-4a.5.5 0 0 1 .5-.5h9a.5.5 0 0 1 0 1h-9a.5.5 0 0 1-.5-.5zm0-4a.5.5 0 0 1 .5-.5h9a.5.5 0 0 1 0 1h-9a.5.5 0 0 1-.5-.5zm-3 1a1 1 0 1 0 0-2 1 1 0 0 0 0 2zm0 4a1 1 0 1 0 0-2 1 1 0 0 0 0 2zm0 4a1 1 0 1 0 0-2 1 1 0 0 0 0 2z"/>
      </svg>
    ),
    Bag: () => (
      <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" fill="currentColor" className="bi bi-bag me-2" viewBox="0 0 16 16">
        <path d="M8 1a2.5 2.5 0 0 1 2.5 2.5V4h-5v-.5A2.5 2.5 0 0 1 8 1zm3.5 3v-.5a3.5 3.5 0 1 0-7 0V4H1v10a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2V4h-3.5zM2 5h12v9a1 1 0 0 1-1 1H3a1 1 0 0 1-1-1V5z"/>
      </svg>
    ),
    BoxArrowRight: () => (
      <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" fill="currentColor" className="bi bi-box-arrow-right me-2" viewBox="0 0 16 16">
        <path fillRule="evenodd" d="M10 12.5a.5.5 0 0 1-.5.5h-8a.5.5 0 0 1-.5-.5v-9a.5.5 0 0 1 .5-.5h8a.5.5 0 0 1 .5.5v2a.5.5 0 0 0 1 0v-2A1.5 1.5 0 0 0 9.5 2h-8A1.5 1.5 0 0 0 0 3.5v9A1.5 1.5 0 0 0 1.5 14h8a1.5 1.5 0 0 0 1.5-1.5v-2a.5.5 0 0 0-1 0v2z"/>
        <path fillRule="evenodd" d="M15.854 8.354a.5.5 0 0 0 0-.708l-3-3a.5.5 0 0 0-.708.708L14.293 7.5H5.5a.5.5 0 0 0 0 1h8.793l-2.147 2.146a.5.5 0 0 0 .708.708l3-3z"/>
      </svg>
    ),
  };

  const getLinkClassName = (path) => {
    return `nav-link d-flex align-items-center py-2 px-3 rounded ${
      location.pathname === path ? 'active' : 'text-dark'
    }`;
  };

  return (
    <div className="position-fixed h-100" style={{ zIndex: 1030 }}>
      <div
        className="d-flex flex-column flex-shrink-0 p-3 shadow-sm h-100"
        style={{ width: "250px", borderRight: "1px solid #dee2e6" }} 
      >
        <Link
          to="/"
          className="d-flex align-items-center mb-3 text-dark text-decoration-none"
        >
          <Icons.Shop />
          <span className="fs-5 fw-bold">ร้านค้าออนไลน์</span>
        </Link>
        <hr className="my-3 border-secondary" /> 
        <ul className="nav nav-pills flex-column mb-auto">
          <li className="nav-item mb-2">
            <Link
              to="/admin"
              className={getLinkClassName("/admin/dashboard")}
              style={location.pathname === "/admin/dashboard" ? {backgroundColor: colors.activeLinkBg, color: colors.activeLinkText} : {}}
              onMouseEnter={(e) => { if (location.pathname !== "/admin/dashboard") { e.currentTarget.style.backgroundColor = colors.linkHoverBg; e.currentTarget.style.color = colors.linkHoverText; }}}
              onMouseLeave={(e) => { if (location.pathname !== "/admin/dashboard") { e.currentTarget.style.backgroundColor = ''; e.currentTarget.style.color = ''; }}}
            >
              <Icons.Home />
              แดชบอร์ด
            </Link>
          </li>
          <li className="mb-2">
            <Link
              to="/admin/category"
              className={getLinkClassName("/admin/category")}
              style={location.pathname === "/admin/category" ? {backgroundColor: colors.activeLinkBg, color: colors.activeLinkText} : {}}
              onMouseEnter={(e) => { if (location.pathname !== "/admin/category") { e.currentTarget.style.backgroundColor = colors.linkHoverBg; e.currentTarget.style.color = colors.linkHoverText; }}}
              onMouseLeave={(e) => { if (location.pathname !== "/admin/category") { e.currentTarget.style.backgroundColor = ''; e.currentTarget.style.color = ''; }}}
            >
              <Icons.Tags />
              จัดการประเภทชุด
            </Link>
          </li>
          <li className="mb-2">
            <Link
              to="/admin/product"
              className={getLinkClassName("/admin/product")}
              style={location.pathname === "/admin/product" ? {backgroundColor: colors.activeLinkBg, color: colors.activeLinkText} : {}}
              onMouseEnter={(e) => { if (location.pathname !== "/admin/product") { e.currentTarget.style.backgroundColor = colors.linkHoverBg; e.currentTarget.style.color = colors.linkHoverText; }}}
              onMouseLeave={(e) => { if (location.pathname !== "/admin/product") { e.currentTarget.style.backgroundColor = ''; e.currentTarget.style.color = ''; }}}
            >
              <Icons.PlusSquare />
              เพิ่มชุดสินค้า
            </Link>
          </li>
          <li className="mb-2">
            <Link
              to="/admin/list-product"
              className={getLinkClassName("/admin/list-product")}
              style={location.pathname === "/admin/list-product" ? {backgroundColor: colors.activeLinkBg, color: colors.activeLinkText} : {}}
              onMouseEnter={(e) => { if (location.pathname !== "/admin/list-product") { e.currentTarget.style.backgroundColor = colors.linkHoverBg; e.currentTarget.style.color = colors.linkHoverText; }}}
              onMouseLeave={(e) => { if (location.pathname !== "/admin/list-product") { e.currentTarget.style.backgroundColor = ''; e.currentTarget.style.color = ''; }}}
            >
              <Icons.ListUl />
              รายการสินค้า
            </Link>
          </li>
          <li className="mb-2">
            <Link
              to="/admin/list-order"
              className={getLinkClassName("/admin/list-order")}
              style={location.pathname === "/admin/list-order" ? {backgroundColor: colors.activeLinkBg, color: colors.activeLinkText} : {}}
              onMouseEnter={(e) => { if (location.pathname !== "/admin/list-order") { e.currentTarget.style.backgroundColor = colors.linkHoverBg; e.currentTarget.style.color = colors.linkHoverText; }}}
              onMouseLeave={(e) => { if (location.pathname !== "/admin/list-order") { e.currentTarget.style.backgroundColor = ''; e.currentTarget.style.color = ''; }}}
            >
              <Icons.Bag />
              รายการคำสั่งซื้อ
            </Link>
          </li>
          <li>
            <button
              onClick={clickLogout}
              className={`nav-link w-100 text-start d-flex align-items-center py-2 px-3 rounded text-dark`}
              onMouseEnter={(e) => { e.currentTarget.style.backgroundColor = colors.linkHoverBg; e.currentTarget.style.color = colors.linkHoverText; }}
              onMouseLeave={(e) => { e.currentTarget.style.backgroundColor = ''; e.currentTarget.style.color = ''; }}
              style={{ border: "none", cursor: "pointer", backgroundColor: 'transparent' }}
            >
              <Icons.BoxArrowRight />
              ออกจากระบบ
            </button>
          </li>
        </ul>
        <hr className="my-3 border-secondary" />
      </div>
    </div>
  );
};

export default SidBar;