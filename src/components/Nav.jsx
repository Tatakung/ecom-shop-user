import React from "react";
import { Link } from "react-router-dom";
import { ShoppingCart, User } from "lucide-react"; // ยังคง import icons เผื่อใช้งานในอนาคต

// สมมติว่าไฟล์ logo.jpg อยู่ที่ src/assets/logo.jpg
import logo from "../assets/logo.png";

const Nav = () => {
  // กำหนดชุดสีตามธีม ขาว-ดำ-เทาอ่อน
  const colors = {
    navbarBg: "#A53860",           // พื้นหลัง Navbar (ขาว)
    borderColor: "#e0e0e0",         // สีขอบ (เทาอ่อน)
    shadowColor: "rgba(255, 255, 255, 0.08)", // สีเงา
    brandText: "#FFFF",           // สีชื่อแบรนด์/โลโก้ (ดำเข้ม)
    linkText: "#FFFF",            // สีข้อความลิงก์ (เทาเข้ม)
    linkHoverText: "#FFFF",       // สีข้อความลิงก์เมื่อโฮเวอร์ (ดำ)
    iconColor: "#495057",           // สีไอคอน (เทาเข้ม)
  };

  return (
    <nav
      className="navbar navbar-expand-lg py-3 sticky-top" // ใช้ navbar-expand-lg เพื่อ collapse บนหน้าจอเล็ก, py-3 เพื่อ padding บนล่าง, sticky-top ให้ติดด้านบน
      style={{
        backgroundColor: colors.navbarBg,
        borderBottom: `1px solid ${colors.borderColor}`,
        boxShadow: `0 2px 5px ${colors.shadowColor}`, // เพิ่มความเข้มเงาเล็กน้อย
      }}
    >
      <div className="container">
        {/* ส่วนซ้าย: โลโก้/ชื่อร้าน และลิงก์ */}
        <div className="d-flex align-items-center">
          <Link
            to="/"
            className="navbar-brand d-flex align-items-center me-4" // ใช้ navbar-brand
            style={{ color: colors.brandText }}
          >
            <img
              src={logo}
              alt="Brand Logo"
              style={{ height: "40px", marginRight: "10px", borderRadius: "8px" }} // ปรับขนาดและเพิ่ม margin, เพิ่มมุมโค้งมนเล็กน้อย
            />
            <span className="fw-bold fs-5 d-none d-sm-block">ร้านชุดสกุลไทย</span> {/* ซ่อนบนจอเล็กมาก */}
          </Link>

          {/* ลิงก์เมนูหลัก */}
          <div className="d-none d-lg-flex"> {/* ซ่อนบนหน้าจอเล็กกว่า lg */}
            <Link
              to="/products-total"
              className="nav-link fw-semibold mx-2" // ใช้ nav-link, mx-2 เพื่อ margin ซ้ายขวา
              style={{ color: colors.linkText }}
              onMouseEnter={(e) => (e.target.style.color = colors.linkHoverText)}
              onMouseLeave={(e) => (e.target.style.color = colors.linkText)}
            >
              สินค้าทั้งหมด
            </Link>
            {/* สามารถเพิ่มลิงก์อื่นๆ ได้ที่นี่ */}
            {/*
            <Link
              to="/categories"
              className="nav-link fw-semibold mx-2"
              style={{ color: colors.linkText }}
              onMouseEnter={(e) => (e.target.style.color = colors.linkHoverText)}
              onMouseLeave={(e) => (e.target.style.color = colors.linkText)}
            >
              หมวดหมู่
            </Link>
            */}
          </div>
        </div>

        {/* ส่วนขวา: ไอคอน/ลิงก์เข้าสู่ระบบ/ตะกร้า */}
        <div className="d-flex align-items-center">
          <Link
            to="/login"
            className="nav-link d-flex align-items-center fw-semibold me-3"
            style={{ color: colors.linkText }}
          >
            <User size={20} className="me-1" style={{ color: '#FFFF' }} />
            เข้าสู่ระบบ
          </Link>
          <Link
            to="/cart"
            className="nav-link d-flex align-items-center"
            style={{ color: colors.linkText }}
          >
            
          </Link>
        </div>
      </div>
    </nav>
  );
};

export default Nav;