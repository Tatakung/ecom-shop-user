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
    <div className="d-flex justify-content-center align-items-center vh-100 bg-light">
      <div className="text-center">
        <p className="fs-4 fw-bold text-secondary">
          กำลังโหลด กรุณารอสักครู่!
        </p>
      </div>
    </div>
  );
};

export default Bonus;
