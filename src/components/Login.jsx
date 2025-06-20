import React, { useEffect, useState } from "react";
import { loginApi } from "../api/auth";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import useMyStore from "../global-state/bigdata";

const Login = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const setUser = useMyStore((state) => state.actionUser);
  const User = useMyStore((state) => state.user);
  const setToken = useMyStore((state) => state.actionToken);
  useEffect(() => {
    if (User !== null) {
      if (User.role === "user") {
        navigate("/user");
      } else if (User.role === "admin") {
        navigate("/admin");
      }
    }

    setLoading(true);
    const timer = setTimeout(() => {
      // หน่วงเวลาไว้ 1 วินาที แล้วค่อยปิด loading
      setLoading(false);
    }, 50);

    // เคลียร์ timer เผื่อ component ถูก unmount ก่อนครบเวลา
    return () => clearTimeout(timer);
  }, []);
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    const data = {
      email,
      password,
    };

    try {
      if (!email) {
        toast.error("กรุณากรอกอีเมล");
        setLoading(false);
        return;
      }
      if (!password) {
        toast.error("กรุณากรอกรหัสผ่าน");
        setLoading(false);
        return;
      }

      const res = await loginApi(data);
      if (res.data.payload.role === "user") {
        navigate("/user");
      } else if (res.data.payload.role === "admin") {
        navigate("/admin");
      }
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
        <div className="row justify-content-center">
          <div className="col-lg-6 col-md-8 col-sm-10 col-12">
            {User?.name && (
              <div
                className="alert alert-success text-center mb-4 mt-3 animate__animated animate__fadeInDown"
                role="alert"
              >
                <i className="fas fa-user-circle me-2"></i>
                ยินดีต้อนรับ, <strong>{User.name}</strong>
              </div>
            )}

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
                {/* <p className="ms-3 text-muted">...</p> */}
              </div>
            ) : (
              <div
                className="card shadow-lg border-0 rounded-4 animate__animated animate__fadeInUp"
                style={{ backgroundColor: "#FFFFFF" }}
              >
                <div className="card-body p-5">
                  <div className="text-center mb-4">
                    <h2
                      className="card-title fw-bold"
                      style={{ color: "#333333" }}
                    >
                      เข้าสู่ระบบ
                    </h2>{" "}
                    {/* สีหัวข้อเทาเข้ม */}
                    <p className="text-muted">กรุณากรอกข้อมูลเพื่อเข้าใช้งาน</p>
                  </div>

                  <form onSubmit={handleSubmit}>
                    {/* ช่องใส่อีเมล */}
                    <div className="form-floating mb-3">
                      <input
                        type="email"
                        className="form-control"
                        id="floatingInput"
                        placeholder="name@example.com"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        style={{
                          borderRadius: "10px",
                          transition: "border-color 0.3s ease",
                        }}
                      />
                      <label
                        htmlFor="floatingInput"
                        style={{ color: "#6c757d" }}
                      >
                        อีเมล
                      </label>{" "}
                      {/* สี label */}
                    </div>

                    {/* ช่องใส่รหัสผ่าน */}
                    <div className="form-floating mb-4">
                      <input
                        type="password"
                        className="form-control"
                        id="floatingPassword"
                        placeholder="Password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        style={{
                          borderRadius: "10px",
                          transition: "border-color 0.3s ease",
                        }}
                      />
                      <label
                        htmlFor="floatingPassword"
                        style={{ color: "#6c757d" }}
                      >
                        รหัสผ่าน
                      </label>{" "}
                      {/* สี label */}
                    </div>

                    {/* ปุ่มเข้าสู่ระบบ */}
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
                        onMouseOver={(e) => {
                          if (!loading) {
                            e.target.style.transform = "translateY(-2px)";
                            e.target.style.boxShadow = "#"; // เงาอ่อนๆ
                            e.target.style.backgroundColor = "#E53888";
                          }
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
                            กำลังเข้าสู่ระบบ...
                          </>
                        ) : (
                          <>
                            <i className="fas fa-sign-in-alt me-2"></i>
                            เข้าสู่ระบบ
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

                  {/* ลิงก์สมัครสมาชิก */}
                  <div className="text-center mt-3">
                    <p className="text-muted mb-0">
                      ยังไม่มีบัญชีใช่ไหม?{" "}
                      <Link
                        to="/register"
                        className="text-decoration-none fw-semibold ms-1"
                        style={{ color: "#333333" }} // สีลิงก์เทาเข้ม
                      >
                        สมัครสมาชิกเดี๋ยวนี้
                      </Link>
                    </p>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
