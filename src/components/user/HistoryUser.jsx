import React, { useState, useEffect } from "react";
import { historyCartApi, historyqueryCartApie } from "../../api/userApi";
import useMyStore from "../../global-state/bigdata";
import { Link } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify"; 
import { History, ShoppingBag } from "lucide-react"; 
import "react-toastify/dist/ReactToastify.css"; 

const HistoryUser = () => {
  const token = useMyStore((state) => state.token);
  const [history, setHistory] = useState(null); 
  const [loading, setLoading] = useState(true); 

  const formatPrice = (price) => {
    return price
      ? price.toLocaleString("th-TH", {
          minimumFractionDigits: 0,
          maximumFractionDigits: 0,
        })
      : "0";
  };

  
  const formatDate = (dateString) => {
    if (!dateString) return "ไม่ระบุวันที่";
    const options = {
      year: "numeric",
      month: "long",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    };
    return new Date(dateString).toLocaleDateString("th-TH", options);
  };

  const getHistoryCart = async () => {
    setLoading(true);
    try {
      const res = await historyCartApi(token);
      setHistory(res.data);
    } catch (error) {
      console.error("Error fetching cart history:", error);
      toast.error("ไม่สามารถโหลดประวัติการสั่งซื้อได้");
      setHistory(null);
    } finally {
      setLoading(false); 
    }
  };
  useEffect(() => {
    getHistoryCart();
  }, [token]);

  const filter = async (type) => {
    const q = await historyqueryCartApie(token, type);
    setHistory(q.data);
  };

  
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
        <p className="ms-3 text-muted">กำลังโหลดประวัติการสั่งซื้อ...</p>
      </div>
    );
  }
  return (
    <div
      className="py-4"
      style={{ backgroundColor: "#f2f2f2", minHeight: "100vh" }}
    >
      <ToastContainer position="top-right" autoClose={3000} hideProgressBar />
      <div className="container">
        <h3 className="text-center mb-4 fw-bold" style={{ color: "#333333" }}>
          <History size={24} className="me-2" /> ประวัติการสั่งซื้อ
        </h3>

        <div className="mb-2">
          <select
            className="form-select"
            style={{ width: "200px" }}
            onChange={(e) => filter(e.target.value)}
          >
            <option value="ทั้งหมด">ทั้งหมด</option>
            <option value="รอชำระเงิน">รอชำระเงิน</option>
            <option value="แจ้งชำระเงินแล้ว">แจ้งชำระเงินแล้ว</option>
            <option value="สั่งซื้อสินค้าสำเร็จ">
              สั่งซื้อสินค้าสำเร็จ(รอส่ง)
            </option>
            <option value="กำลังเตรียมพัสดุ">กำลังเตรียมพัสดุ</option>
            <option value="จัดส่งพัสดุแล้ว">จัดส่งพัสดุแล้ว</option>
            <option value="ได้รับพัสดุแล้ว">ได้รับพัสดุแล้ว</option>
          </select>
        </div>

        {history && history.length > 0 ? (
          history?.map((element) => (
            <Link
              to={"/user/purchase/detail/" + element.id}
              className="d-block mb-4 p-3 rounded shadow-sm" 
              style={{
                textDecoration: "none",
                backgroundColor: "#FFFFFF",
                border: "1px solid #e0e0e0",
              }}
              key={element.id} 
            >
              
              <div
                className="row align-items-center mb-2 pb-2"
                style={{ borderBottom: "1px solid #e0e0e0" }}
              >
                <div className="col-md-6 col-12 text-md-start text-start">
                  <p className="mb-1 fw-bold" style={{ color: "#333333" }}>
                    เลขออเดอร์ที่ # {element.id}
                  </p>
                  <span className="small text-muted">
                    วันที่ทำรายการ: {formatDate(element.createdAt)}
                  </span>
                </div>
                <div className="col-md-6 col-12 text-md-end text-start mt-2 mt-md-0">
                  <p className="mb-0 fw-bold" style={{ color: "#333333" }}>
                    สถานะ:{" "}
                    <span className="text-primary">{element.orderStatus}</span>
                  </p>
                </div>
              </div>
              {/* รายการสินค้าในแต่ละออเดอร์ */}
              {element.products?.length > 0 ? (
                element.products.map((items, itemIndex) => (
                  <div key={itemIndex} className="row mt-3 align-items-center">
                    <div className="col-md-10 col-9">
                      <div className="row g-2 align-items-center">
                        <div className="col-md-2 col-4">
                          <img
                            src={
                              items.product?.images?.[0]?.url ||
                              "https://via.placeholder.com/80x80?text=No+Image"
                            }
                            alt={items.product?.title || "Product image"}
                            className="img-fluid rounded"
                            style={{
                              width: "80px",
                              height: "80px",
                              objectFit: "cover",
                            }}
                          />
                        </div>
                        <div className="col-md-10 col-8">
                          <p
                            className="mb-0 fw-semibold"
                            style={{ color: "#333333" }}
                          >
                            {items.product?.title || "สินค้าไม่มีชื่อ"}
                          </p>
                          <span className="small text-muted">
                            จำนวน {items.count} ชิ้น
                          </span>
                        </div>
                      </div>
                    </div>
                    <div
                      className="col-md-2 col-3 text-end fw-bold"
                      style={{ color: "#333333" }}
                    >
                      {formatPrice(items.price * items.count)} บาท
                    </div>
                    {itemIndex < element.products.length - 1 && (
                      <hr className="my-3" style={{ borderColor: "#f2f2f2" }} />
                    )}{" "}
                    {/* เส้นคั่นระหว่างสินค้า */}
                  </div>
                ))
              ) : (
                <div className="text-center py-2 text-muted">
                  ไม่พบสินค้าในรายการนี้
                </div>
              )}
              <hr className="my-3" style={{ borderColor: "#e0e0e0" }} />{" "}
              {/* เส้นคั่นก่อนรวมยอด */}
              {/* ยอดรวมของแต่ละออเดอร์ */}
              <div className="row">
                <div className="col-12 text-end">
                  <p className="mb-0 fs-5 fw-bold" style={{ color: "#333333" }}>
                    รวมการสั่งซื้อ {formatPrice(element.cartTotal)} บาท
                  </p>
                </div>
              </div>
            </Link>
          ))
        ) : (
          <div
            className="min-vh-100 d-flex flex-column justify-content-center align-items-center text-center py-5"
            style={{ backgroundColor: "#FFFFFF" }}
          >
            <ShoppingBag
              size={80}
              className="mb-4"
              style={{ color: "#999999" }}
            />
            <h4 className="fw-bold" style={{ color: "#333333" }}>
              ยังไม่มีประวัติการสั่งซื้อ
            </h4>
            <p className="lead text-muted">คุณยังไม่มีคำสั่งซื้อที่ผ่านมา</p>
            <Link
              to="/products-total"
              className="btn btn-dark mt-3"
              style={{
                backgroundColor: "#333333",
                color: "#FFFFFF",
                borderRadius: "8px",
              }}
            >
              เลือกซื้อสินค้าเลย
            </Link>
          </div>
        )}
      </div>
    </div>
  );
};

export default HistoryUser;
