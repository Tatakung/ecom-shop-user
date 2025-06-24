import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const Bonus = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const timer = setTimeout(() => {
      navigate(-1);
    }, 3000);

    return () => clearTimeout(timer);
  }, [navigate]);
  return (
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
      <p className="ms-3 text-muted">กำลังโหลด...</p>
    </div>
  );
};

export default Bonus;
