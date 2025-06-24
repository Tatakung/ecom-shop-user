import React from "react";
import { Link, useLocation } from "react-router-dom"; // เพิ่ม useLocation สำหรับ active link
import { ShoppingCart, Package, LogOut } from "lucide-react";
import useMyStore from "../global-state/bigdata";
import { useNavigate } from "react-router-dom";

// สมมติว่ามีไฟล์ logo.jpg อยู่ที่ src/assets/logo.jpg สำหรับใช้เป็นโลโก้
// หากไม่มีไฟล์นี้ คุณสามารถลบส่วนนี้ออกและใช้ข้อความ "เปลือกไหมชุด" แทน
import logo from "../assets/logo.png"; 

const NavUser = () => {
  const logout = useMyStore((state) => state.actionLogout);
  const navigate = useNavigate();
  const location = useLocation(); // เพื่อใช้ตรวจสอบ path ปัจจุบัน

  const onClicklogout = () => {
    logout();
    navigate("/products-total");
  };

  // กำหนดชุดสีตามธีม ขาว-ดำ-เทาอ่อน
  const colors = {
    navbarBg: "#A53860",            
    borderColor: "#dee2e6",         
    shadowColor: "rgba(0,0,0,0.08)", 
    brandText: "#212529",           
    linkText: "#FFFF",            
    linkHoverText: "#000000",       
    activeLinkText: "#212529",     
    activeLinkBg: "#e9ecef",        
    logoutBtnBg: "#E53888",        
    logoutBtnText: "#FFFFFF",      
    logoutBtnHoverBg: "#D42A77",  
  };

  // Function เพื่อกำหนด className สำหรับลิงก์ให้เป็น Active
  const getNavLinkClass = (path) => {
    return `nav-link ${location.pathname === path ? 'active' : ''} text-decoration-none`;
  };

  return (
    <nav
      className="navbar navbar-expand-lg py-3 sticky-top" // เพิ่ม py-3 และ sticky-top
      style={{
        backgroundColor: colors.navbarBg,
        borderBottom: `1px solid ${colors.borderColor}`,
        boxShadow: `0 2px 5px ${colors.shadowColor}`,
      }}
    >
      <div className="container">
        <Link
          className="navbar-brand d-flex align-items-center"
          to="/"
          style={{ color: colors.brandText }}
        >
          {logo ? (
            <img
              src={logo}
              alt="Brand Logo"
              style={{ height: "40px", marginRight: "10px", borderRadius: "8px" }}
            />
          ) : (
            <span className="fw-bold fs-5">เปลือกไหมชุด</span>
          )}
        </Link>

        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarNavUser" // เปลี่ยน id ให้ไม่ซ้ำกับ Nav เดิม
          aria-controls="navbarNavUser"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon" style={{ filter: "invert(0%)" }}></span>
        </button>

        <div className="collapse navbar-collapse" id="navbarNavUser">
          <ul className="navbar-nav ms-auto mb-2 mb-lg-0">
            <li className="nav-item">
              <Link
                to="/products-total"
                className={getNavLinkClass("/products-total")}
                style={{
                    color: location.pathname === "/products-total" ? colors.activeLinkText : colors.linkText,
                }}
                onMouseEnter={(e) => (e.currentTarget.style.color = colors.linkHoverText)}
                onMouseLeave={(e) => (e.currentTarget.style.color = location.pathname === "/products-total" ? colors.activeLinkText : colors.linkText)}
              >
                สินค้าทั้งหมด
              </Link>
            </li>
            <li className="nav-item">
              <Link
                to="/user/purchase"
                className={getNavLinkClass("/user/purchase")}
                style={{
                    color: location.pathname === "/user/purchase" ? colors.activeLinkText : colors.linkText,
                }}
                onMouseEnter={(e) => (e.currentTarget.style.color = colors.linkHoverText)}
                onMouseLeave={(e) => (e.currentTarget.style.color = location.pathname === "/user/purchase" ? colors.activeLinkText : colors.linkText)}
              >
                <Package size={18} className="me-1" /> การซื้อของฉัน
              </Link>
            </li>
            <li className="nav-item">
              <Link
                to="/user/cart"
                className={getNavLinkClass("/user/cart")}
                style={{
                    color: location.pathname === "/user/cart" ? colors.activeLinkText : colors.linkText,
                }}
                onMouseEnter={(e) => (e.currentTarget.style.color = colors.linkHoverText)}
                onMouseLeave={(e) => (e.currentTarget.style.color = location.pathname === "/user/cart" ? colors.activeLinkText : colors.linkText)}
              >
                <ShoppingCart size={18} className="me-1" /> ตะกร้า
              </Link>
            </li>
            {/* ปุ่ม Logout */}
            <li className="nav-item ms-lg-3"> {/* เพิ่ม margin ซ้ายบน desktop */}
              <button
                onClick={onClicklogout}
                className="btn d-flex align-items-center py-2 px-3 fw-semibold" // ใช้ fw-semibold ให้ตัวหนาขึ้น
                style={{
                  backgroundColor: colors.logoutBtnBg,
                  color: colors.logoutBtnText,
                  borderRadius: "8px",
                  border: "none",
                  transition: "all 0.2s ease-in-out",
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.backgroundColor = colors.logoutBtnHoverBg;
                  e.currentTarget.style.transform = "translateY(-1px)";
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.backgroundColor = colors.logoutBtnBg;
                  e.currentTarget.style.transform = "translateY(0)";
                }}
              >
                <LogOut size={18} className="me-1" /> ออกจากระบบ
              </button>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default NavUser;