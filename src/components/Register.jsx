import React, { useEffect, useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import { Link, useNavigate } from "react-router-dom";

import { registerApi } from "../api/auth";
import useMyStore from "../global-state/bigdata";

const Register = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [confirmpassword, setConfirmPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const setUser = useMyStore((state) => state.actionUser);
  const user = useMyStore((state) => state.user);
  const token = useMyStore((state) => state.token);
  const setToken = useMyStore((state) => state.actionToken);
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    const data = {
      email,
      password,
      name,
    };
    try {
      // ตรวจสอบข้อมูลก่อนส่ง
      if (!name) {
        toast.error("กรุณากรอกชื่อ");
        setLoading(false);
        return;
      }
      if (!email) {
        toast.error("กรุณากรอกอีเมล");
        setLoading(false);
        return;
      }
      if (!password) {
        toast.error("กรุณากรอรหัสผ่าน");
        setLoading(false);
        return;
      }
      if (!confirmpassword) {
        toast.error("กรุณายืนยันรหัสผ่าน");
        setLoading(false);
        return;
      }
      if (!password || !confirmpassword) {
        toast.error("กรุณากรอกรหัสผ่านและยืนยันรหัสผ่าน");
        setLoading(false);
        return;
      }

      if (password.length < 8 || confirmpassword.length < 8) {
        toast.error("รหัสผ่านและยืนยันรหัสผ่านต้องมีอย่างน้อย 8 ตัวอักษร");
        setLoading(false);
        return;
      }

      if (password !== confirmpassword) {
        toast.error("รหัสผ่านไม่ตรงกัน");
        setLoading(false);
        return;
      }

      if (password !== confirmpassword) {
        toast.error("รหัสผ่านไม่ตรงกัน");
        setLoading(false);
        return;
      }
      const res = await registerApi(data);
      toast.success(res.data.message);

      setUser(res.data.payload);
      setToken(res.data.token);
    } catch (error) {
      console.log(error.response.data.message);
      toast.error(error.response.data.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (user && token) {
      if (user.role === "user") {
        navigate("/user");
      } else if (user.role === "admin") {
        navigate("/admin");
      }
    } else {
    }
  }, [user, token]);
  useEffect(() => {
    setLoading(true);
    const timer = setTimeout(() => {
      // หน่วงเวลาไว้ 1 วินาที แล้วค่อยปิด loading
      setLoading(false);
    }, 50);
    // เคลียร์ timer เผื่อ component ถูก unmount ก่อนครบเวลา
    return () => clearTimeout(timer);
  }, []);
  return (
    <div
      className="min-vh-100 d-flex align-items-center justify-content-center"
      style={{ backgroundColor: "#FFFFFF" }}
    >
      {" "}
      {/* พื้นหลังรวมของหน้าเป็นสีขาว */}
      <ToastContainer
        position="top-right"
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
      />
      <div className="container">
        {loading ? (
          <div
            className="d-flex justify-content-center align-items-center"
            style={{ minHeight: "300px" }}
          >
            <div
              className="spinner-border"
              role="status"
              style={{ color: "#333333" }}
            >
              {" "}
              {/* สี Spinner เทาเข้ม */}
              <span className="visually-hidden">Loading...</span>
            </div>
            {/* <p className="ms-3 text-muted">กำลังโหลดหน้า...</p> */}
          </div>
        ) : (
          <div className="row justify-content-center">
            <div className="col-lg-6 col-md-8 col-sm-10 col-12">
              <div
                className="card shadow-lg border-0 rounded-4 animate__animated animate__fadeInUp"
                style={{ backgroundColor: "#FFFFFF" }}
              >
                {" "}
                {/* พื้นหลัง Card เป็นสีขาว */}
                <div className="card-body p-5">
                  <div className="text-center mb-4">
                    <h2
                      className="card-title fw-bold"
                      style={{ color: "#333333" }}
                    >
                      สมัครสมาชิก
                    </h2>{" "}
                    {/* สีหัวข้อเทาเข้ม */}
                    <p className="text-muted">สร้างบัญชีใหม่ของคุณ</p>
                  </div>

                  <form onSubmit={handleSubmit}>
                    {/* ช่องกรอกชื่อ */}
                    <div className="form-floating mb-3">
                      <input
                        type="text"
                        className="form-control"
                        id="floatingName"
                        placeholder="ชื่อของคุณ"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        style={{
                          borderRadius: "10px",
                          transition: "border-color 0.3s ease",
                        }}
                        onFocus={(e) =>
                          (e.target.style.borderColor = "#6c757d")
                        }
                        onBlur={(e) => (e.target.style.borderColor = "#ced4da")}
                      />
                      <label
                        htmlFor="floatingName"
                        style={{ color: "#6c757d" }}
                      >
                        ชื่อ
                      </label>{" "}
                      {/* สี label */}
                    </div>

                    {/* ช่องกรอกอีเมล */}
                    <div className="form-floating mb-3">
                      <input
                        type="email"
                        className="form-control"
                        id="floatingEmail"
                        placeholder="name@example.com"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        aria-describedby="emailHelp"
                        style={{
                          borderRadius: "10px",
                          transition: "border-color 0.3s ease",
                        }}
                        onFocus={(e) =>
                          (e.target.style.borderColor = "#6c757d")
                        }
                        onBlur={(e) => (e.target.style.borderColor = "#ced4da")}
                      />
                      <label
                        htmlFor="floatingEmail"
                        style={{ color: "#6c757d" }}
                      >
                        อีเมล
                      </label>{" "}
                      {/* สี label */}
                    </div>

                    {/* ช่องกรอกรหัสผ่าน */}
                    <div className="form-floating mb-3">
                      <input
                        type="password"
                        className="form-control"
                        id="floatingPassword"
                        placeholder="รหัสผ่าน"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        style={{
                          borderRadius: "10px",
                          transition: "border-color 0.3s ease",
                        }}
                        onFocus={(e) =>
                          (e.target.style.borderColor = "#6c757d")
                        }
                        onBlur={(e) => (e.target.style.borderColor = "#ced4da")}
                      />
                      <label
                        htmlFor="floatingPassword"
                        style={{ color: "#6c757d" }}
                      >
                        รหัสผ่าน
                      </label>{" "}
                      {/* สี label */}
                    </div>

                    {/* ช่องยืนยันรหัสผ่าน */}
                    <div className="form-floating mb-4">
                      <input
                        type="password"
                        className="form-control"
                        id="floatingConfirmPassword"
                        placeholder="ยืนยันรหัสผ่าน"
                        value={confirmpassword}
                        onChange={(e) => setConfirmPassword(e.target.value)}
                        style={{
                          borderRadius: "10px",
                          transition: "border-color 0.3s ease",
                        }}
                        onFocus={(e) =>
                          (e.target.style.borderColor = "#6c757d")
                        }
                        onBlur={(e) => (e.target.style.borderColor = "#ced4da")}
                      />
                      <label
                        htmlFor="floatingConfirmPassword"
                        style={{ color: "#6c757d" }}
                      >
                        ยืนยันรหัสผ่าน
                      </label>{" "}
                      {/* สี label */}
                    </div>

                    {/* ปุ่มสมัครสมาชิก */}
                    <div className="text-center mt-2">
                      <button
                        type="submit"
                        className="btn btn-lg w-100 fw-semibold"
                        disabled={loading}
                        style={{
                          borderRadius: "10px",
                          backgroundColor: "#A53860", // สีปุ่มหลัก เทาเข้ม
                          color: "#FFFFFF", // ตัวอักษรสีขาว
                          border: "none",
                          padding: "12px 0",
                          transition: "all 0.3s ease",
                        }}
                      >
                        {loading ? (
                          <>
                            <span
                              className="spinner-border spinner-border-sm me-2"
                              role="status"
                              aria-hidden="true"
                              style={{ color: "#FFFFFF" }} // สี Spinner เป็นสีขาว
                            ></span>
                            กำลังสมัครสมาชิก...
                          </>
                        ) : (
                          <>
                            <i className="fas fa-user-plus me-2"></i>
                            สมัครสมาชิก
                          </>
                        )}
                      </button>
                    </div>
                  </form>

                  {/* ตัวแบ่ง */}
                  <div className="text-center my-4">
                    <hr
                      className="w-75 mx-auto"
                      style={{ borderColor: "#e0e0e0" }}
                    />{" "}
                    {/* สีเส้นแบ่งเทาอ่อน */}
                    <span
                      className="text-muted bg-white px-3 position-relative"
                      style={{
                        top: "-1.2em",
                        backgroundColor: "#FFFFFF",
                        color: "#6c757d",
                      }}
                    >
                      {" "}
                      {/* สีข้อความ "หรือ" เป็นเทา */}
                      หรือ
                    </span>
                  </div>

                  {/* ลิงก์กลับไปเข้าสู่ระบบ */}
                  <div className="text-center mt-3">
                    <p className="text-muted mb-0">
                      มีบัญชีอยู่แล้วใช่ไหม?{" "}
                      <Link
                        to="/login"
                        className="text-decoration-none fw-semibold ms-1"
                        style={{ color: "#333333" }} // สีลิงก์เทาเข้ม
                      >
                        เข้าสู่ระบบที่นี่
                      </Link>
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Register;
