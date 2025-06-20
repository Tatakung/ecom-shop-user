import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import useMyStore from "../../global-state/bigdata";
import { ListhistoryCartApi } from "../../api/userApi";
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import { checkPaymentsCartApi } from "../../api/cartApi";

// ไม่มีการนำเข้าไอคอนใดๆ ตามที่คุณต้องการแล้ว
import "react-toastify/dist/ReactToastify.css";

const Nottificationpayment = () => {
  const token = useMyStore((state) => state.token);
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);

  const hours = Array.from({ length: 24 }, (_, i) => i); // อาร์เรย์ชั่วโมง 0-23
  const minutes = Array.from({ length: 60 }, (_, i) => i); // อาร์เรย์นาที 0-59

  const [date, setDate] = useState("");
  const [hor, setHor] = useState("");
  const [minute, setMinute] = useState("");
  const { id } = useParams();
  const [cart, setCart] = useState([]); // สถานะนี้จะเก็บยอดรวมตะกร้า ตาม Logic เดิมของคุณ

  // ดึงชื่อผู้ใช้จาก global state เพื่อนำมาแสดง (ตัวอย่าง ถ้ามีใน store)
  const userName = useMyStore((state) => state.user?.name || "ไม่ระบุ");

  // ฟังก์ชันดึงข้อมูลตะกร้าสินค้า
  const getcart = async (token, id) => {
    setLoading(true); // เริ่มโหลด
    try {
      // console.log('fdlfd;fl') // บรรทัดนี้มาจากโค้ดเดิมของคุณ
      const res = await ListhistoryCartApi(token, id);
      setCart(res.data.cartTotal); // ตั้งค่า state 'cart' ด้วยยอดรวมตะกร้า
      toast.success(res.data.message); // แสดงข้อความสำเร็จ
    } catch (error) {
      console.log(error);
      toast.error("ไม่สามารถโหลดรายละเอียดออเดอร์ได้"); // เพิ่มข้อความ error toast
    } finally {
      setLoading(false); // หยุดโหลด
    }
  };

  // ฟังก์ชันช่วยจัดรูปแบบราคาสินค้า (ใช้แสดงยอดเงิน)
  const formatPrice = (price) => {
    return price
      ? price.toLocaleString("th-TH", {
          minimumFractionDigits: 0,
          maximumFractionDigits: 0,
        })
      : "0";
  };

  // ฟังก์ชันจัดการการส่งข้อมูลแจ้งชำระเงิน
  const handleSubmit = async () => {
    // เพิ่มการตรวจสอบข้อมูลเบื้องต้น
    if (!date || hor === "" || minute === "") {
      toast.error("กรุณาระบุ วันที่, ชั่วโมง และนาที ที่โอนเงินให้ครบถ้วน");
      return;
    }

    try {
      const data = {
        date,
        hor,
        minute,
      };
      const res = await checkPaymentsCartApi(token, data, id);
      toast.success("แจ้งชำระเงินสำเร็จ!"); // เพิ่มข้อความสำเร็จเริ่มต้น
      setTimeout(() => {
        navigate("/user/purchase/detail/" + id);
      }, 1500);

      // คุณอาจต้องการ navigate ไปหน้าอื่นที่นี่หลังจากสำเร็จ เช่น navigate('/user/history');
    } catch (error) {
      console.log(error);
      toast.error(
        error.response?.data?.message || "เกิดข้อผิดพลาดในการแจ้งชำระเงิน"
      ); // ปรับปรุงข้อความ error toast
    }
  };

  // Effect สำหรับโหลดข้อมูลเมื่อ component โหลดครั้งแรก
  useEffect(() => {
    const now = new Date();
    const yyyyMMdd = now.toISOString().split("T")[0]; // กำหนดวันที่เริ่มต้นเป็นวันนี้ (YYYY-MM-DD)
    setDate(yyyyMMdd);
    setHor(now.getHours()); // กำหนดชั่วโมงเริ่มต้น
    setMinute(now.getMinutes()); // กำหนดนาทีเริ่มต้น
    getcart(token, id); // เรียก API ดึงข้อมูลตะกร้า
  }, [token, id]); // เพิ่ม token และ id ใน dependency array

  // แสดง Loading Spinner ถ้าข้อมูลยังโหลดไม่เสร็จ
  if (loading) {
    return (
      <div
        className="min-vh-100 d-flex justify-content-center align-items-center"
        style={{ backgroundColor: "#FFFFFF" }}
      >
        <div
          className="spinner-border"
          role="status"
          style={{ color: "#333333" }}
        >
          <span className="visually-hidden">Loading...</span>
        </div>
        <p className="ms-3 text-muted">กำลังโหลดข้อมูล...</p>
      </div>
    );
  }

  return (
    <div
      className="py-4"
      style={{ backgroundColor: "#f2f2f2", minHeight: "100vh" }}
    >
      <ToastContainer position="top-right" autoClose={5000} hideProgressBar />
      <div className="container">
        <h3 className="text-center mb-4 fw-bold" style={{ color: "#333333" }}>
          แจ้งชำระเงิน
        </h3>

        {/* ส่วนข้อมูลบัญชีธนาคาร */}
        <div
          className="card shadow-sm mb-4"
          style={{ backgroundColor: "#FFFFFF", border: "1px solid #e0e0e0" }}
        >
          <div
            className="card-header fw-bold"
            style={{ backgroundColor: "#A53860", color: "#FFFFFF" }}
          >
            รายละเอียดบัญชีธนาคาร
          </div>
          <div className="card-body">
            <h5 className="mb-3 text-center" style={{ color: "#333333" }}>
              ท่านสามารถชำระเงินได้โดยการโอนเงินผ่านธนาคารใดก็ได้เข้ามายังบัญชีต่อไปนี้
            </h5>
            <div
              className="row p-2 fw-bold text-center"
              style={{ color: "#333333", borderBottom: "1px solid #e0e0e0" }}
            >
              <div className="col-3">ธนาคาร</div>
              <div className="col-3">สาขา</div>
              <div className="col-3">เลขบัญชี</div>
              <div className="col-3">ชื่อบัญชี</div>
            </div>
            <div className="row p-2 text-center" style={{ color: "#555555" }}>
              <div className="col-3">กสิกรไทย</div>
              <div className="col-3">เซ็นทรัลปัตตานี</div>
              <div className="col-3 fw-bold" style={{ color: "#333333" }}>
                456-2-103201-5
              </div>
              <div className="col-3">ร้านชุดสกุลไทย</div>{" "}
              {/* ชื่อบัญชีตัวอย่าง */}
            </div>
          </div>
        </div>

        {/* ส่วนข้อแนะนำ */}
        <div
          className="card shadow-sm mb-4"
          style={{ backgroundColor: "#FFFFFF", border: "1px solid #e0e0e0" }}
        >
          <div
            className="card-header fw-bold"
            style={{ backgroundColor: "#A53860", color: "#FFFFFF" }}
          >
            ข้อแนะนำ
          </div>
          <div className="card-body" style={{ color: "#333333" }}>
            <ul className="mb-0" style={{ paddingLeft: "1.25rem" }}>
              <li>
                ถ้าหากทำรายการโอนเงินหลังจากการโอนแล้วให้ลูกค้าแจ้งชำระเงิน
              </li>
              <li>
                กรุณากรอกรายละเอียดให้ถูกต้องสมบูรณ์ ทั้งวันที่ และ จำนวนเงิน
              </li>
              <li>
                หลังจากแจ้งชำระเงินเรียบร้อย
                ทางเจ้าหน้าที่จะทำการยืนยันการสั่งซื้อ
              </li>
              {/* <li>กรุณาระบุรหัสการสั่งซื้อให้ถูกต้อง</li> */}
            </ul>
          </div>
        </div>

        {/* ส่วนฟอร์มแจ้งชำระเงิน */}
        <div
          className="card shadow-sm"
          style={{ backgroundColor: "#FFFFFF", border: "1px solid #e0e0e0" }}
        >
          <div
            className="card-header fw-bold"
            style={{ backgroundColor: "#A53860", color: "#FFFFFF" }}
          >
            แจ้งการชำระเงิน
          </div>
          <div className="card-body">
            {/* <p className="mb-3 fw-semibold" style={{ color: "#333333" }}>
              ชื่อ-สกุล: {userName}
            </p> */}

            <div className="mb-3">
              <label
                htmlFor="paymentDate"
                className="form-label fw-semibold"
                style={{ color: "#333333" }}
              >
                วันที่โอนเงิน
              </label>
              <input
                type="date"
                id="paymentDate"
                className="form-control"
                value={date}
                onChange={(e) => setDate(e.target.value)}
                style={{
                  borderColor: "#e0e0e0",
                  color: "#333333",
                  backgroundColor: "#f9f9f9",
                }}
              />
            </div>
            <div className="mb-3">
              <label
                className="form-label fw-semibold"
                style={{ color: "#333333" }}
              >
                เวลา:นาทีที่โอนเงิน
              </label>
              <div className="d-flex gap-2">
                <select
                  className="form-select"
                  aria-label="เลือกชั่วโมง"
                  value={hor}
                  onChange={(e) => setHor(e.target.value)}
                  style={{
                    borderColor: "#e0e0e0",
                    color: "#333333",
                    backgroundColor: "#f9f9f9",
                  }}
                >
                  <option value="">ชั่วโมง</option>
                  {hours.map((h) => (
                    <option key={h} value={h}>
                      {h.toString().padStart(2, "0")}
                    </option>
                  ))}
                </select>

                <select
                  className="form-select"
                  aria-label="เลือกนาที"
                  value={minute}
                  onChange={(e) => setMinute(e.target.value)}
                  style={{
                    borderColor: "#e0e0e0",
                    color: "#333333",
                    backgroundColor: "#f9f9f9",
                  }}
                >
                  <option value="">นาที</option>
                  {minutes.map((m) => (
                    <option key={m} value={m}>
                      {m.toString().padStart(2, "0")}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            <div className="mb-4">
              <p className="fw-semibold mb-1" style={{ color: "#333333" }}>
                รายละเอียดคำสั่งซื้อ
              </p>
              <p className="mb-1" style={{ color: "#555555" }}>
                รหัสคำสั่งซื้อ:{" "}
                <span className="fw-bold" style={{ color: "#333333" }}>
                  {id}
                </span>
              </p>
              <p className="mb-0 fs-5 fw-bold" style={{ color: "#333333" }}>
                ยอดที่ต้องชำระ:{" "}
                <span className="text-primary">{formatPrice(cart)}</span> บาท
              </p>
            </div>

            <button
              className="btn btn-dark btn-sm w-100"
              onClick={handleSubmit}
              style={{
                backgroundColor: "#A53860",
                color: "#FFFFFF",
                borderRadius: "8px",
                border: "none",
                padding: "12px 0",
                fontSize: "1.1rem",
                transition: "all 0.2s ease-in-out",
              }}
            >
              ยืนยันการแจ้งชำระเงิน
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Nottificationpayment;
