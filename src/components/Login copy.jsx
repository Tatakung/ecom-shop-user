import React, { useState } from "react";
import { loginApi } from "../api/auth";
import { ToastContainer, toast } from "react-toastify";
import useMyStore from "../global-state/bigdata";
const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const setUser = useMyStore((state) => state.actionUser);
  const User = useMyStore((state) => state.user);
  const setToken = useMyStore((state) => state.actionToken);
  const handleSubmit = async (e) => {
    e.preventDefault();
    const data = {
      email,
      password,
    };
    try {
      if (!email) {
        toast.error("กรุณากรอกอีเมล");
        return;
      }
      if (!password) {
        toast.error("กรุณากรอกรหัสผ่าน");
        return;
      }
      const res = await loginApi(data);
      toast.success(res.data.message);
      // console.log(res.data.payload);
      setUser(res.data.payload);

      //   token
      setToken(res.data.token);
      // localStorage.removeItem("token");
    } catch (error) {
      console.log(error.response.data.message);
      //   console.log(error.response.data.message);
      //   console.log(res.data.message);
      toast.error(error.response.data.message);
    }
  };
  return (
    <div>
      <div className="container">
        <p>ชื่อผู้ใช้: {User?.name}</p>
        <form onSubmit={(e) => handleSubmit(e)}>
          {/* @csa */}
          <div className="mb-3">
            <label htmlFor="exampleInputEmail1" className="form-label">
              Email address
            </label>
            <input
              type="email"
              name="email"
              onChange={(e) => setEmail(e.target.value)}
              className="form-control"
              id="exampleInputEmail1"
              aria-describedby="emailHelp"
            />
            <div id="emailHelp" className="form-text">
              We'll never share your email with anyone else.
            </div>
          </div>
          <div className="mb-3">
            <label htmlFor="exampleInputPassword1" className="form-label">
              Password
            </label>
            <input
              type="password"
              name="password"
              onChange={(e) => setPassword(e.target.value)}
              className="form-control"
              id="exampleInputPassword1"
            />
          </div>
          <div className="mb-3 form-check"></div>
          <button type="submit" className="btn btn-primary">
            Submit
          </button>
        </form>
      </div>
    </div>
  );
};

export default Login;
