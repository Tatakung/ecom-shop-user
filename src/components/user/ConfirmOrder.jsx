import React, { useState, useEffect } from "react";
import useMyStore from "../../global-state/bigdata";
import { listCartApi, submitCartApi } from "../../api/cartApi";
import { ToastContainer, toast } from "react-toastify";
import { useNavigate, Link } from "react-router-dom"; // เพิ่ม Link เพื่อกลับตะกร้า
import "react-toastify/dist/ReactToastify.css"; // Ensure Toastify CSS is imported

const ConfirmOrder = () => {
  const token = useMyStore((state) => state.token);
  const [cart, setCart] = useState(null); // ใช้ null เพื่อจัดการ loading/empty state
  const [address, setAddress] = useState("");
  const [phone, setPhone] = useState("");
  const [loading, setLoading] = useState(true); // เพิ่ม loading state
  const navigate = useNavigate();

  // Helper for price formatting
  const formatPrice = (price) => {
    return price
      ? price.toLocaleString("th-TH", {
          minimumFractionDigits: 0,
          maximumFractionDigits: 0,
        })
      : "0";
  };

  const getCart = async () => {
    setLoading(true);
    try {
      const res = await listCartApi(token);
      setCart(res.data);
      setAddress(res.data.orderedBy?.address || "");
      setPhone(res.data.orderedBy?.phone || "");
    } catch (error) {
      console.error("Error fetching cart for confirmation:", error);
      toast.error("ไม่สามารถโหลดข้อมูลตะกร้าสินค้าได้");
      setCart(null); // Clear cart on error
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getCart();
  }, [token]); // เพิ่ม token ใน dependency array

  const handleConfirmOrder = async () => {
    if (!address.trim()) {
      toast.error("กรุณาระบุที่อยู่จัดส่ง");
      return;
    }
    if (!phone.trim()) {
      toast.error("กรุณาระบุเบอร์ติดต่อ");
      return;
    }
    if (!cart || !cart.products || cart.products.length === 0) {
      toast.error("ไม่มีสินค้าในตะกร้า ไม่สามารถยืนยันคำสั่งซื้อได้");
      return;
    }

    try {
      const data = {
        cart_id: cart.id,
        address: address,
        phone: phone,
      };
      const res = await submitCartApi(token, data);
      toast.success("ยืนยันการสั่งซื้อสำเร็จ!");
      setTimeout(() => {
        navigate("/user/purchase/detail/" + res.data.lorem);
      }, 1000);
    } catch (error) {
      console.error("Error confirming order:", error);
      const errorMessage =
        error.response?.data?.message || "เกิดข้อผิดพลาดในการยืนยันการสั่งซื้อ";
      const productErrors = error.response?.data?.products || [];

      toast.error(
        <div>
          <strong>{errorMessage}</strong>
          {productErrors.length > 0 && (
            <ul style={{ marginTop: "0.5rem", paddingLeft: "1.25rem" }}>
              {productErrors.map((name, index) => (
                <li key={index}>{name}</li>
              ))}
            </ul>
          )}
        </div>
      );
    }
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
        <p className="ms-3 text-muted">กำลังโหลดข้อมูลการสั่งซื้อ...</p>
      </div>
    );
  }

  if (!cart || !cart.products || cart.products.length === 0) {
    return (
      <div
        className="min-vh-100 d-flex flex-column justify-content-center align-items-center text-center py-5"
        style={{ backgroundColor: "#FFFFFF" }}
      >
        <p className="lead" style={{ color: "#555555" }}>
          ยังไม่มีสินค้าในตะกร้า
        </p>
        <Link
          to="/cart"
          className="btn btn-dark mt-3"
          style={{
            backgroundColor: "#333333",
            color: "#FFFFFF",
            borderRadius: "8px",
          }}
        >
          กลับไปตะกร้า
        </Link>
      </div>
    );
  }

  const shippingCost = 30; // ค่าจัดส่งคงที่

  return (
    <div
      className="py-4"
      style={{ backgroundColor: "#f2f2f2", minHeight: "100vh" }}
    >
      <ToastContainer position="top-right" autoClose={5000} hideProgressBar />
      <div className="container">
        <h3 className="text-center mb-4 fw-bold" style={{ color: "#333333" }}>
          ยืนยันการสั่งซื้อ
        </h3>

        {/* User Info and Address/Phone Input Section */}
        <div
          className="row p-3 mb-4 rounded shadow-sm"
          style={{ backgroundColor: "#FFFFFF", border: "1px solid #e0e0e0" }}
        >
          <div className="col-md-4 col-12 mb-3 mb-md-0">
            <p className="fw-semibold" style={{ color: "#333333" }}>
              ชื่อ: {cart.orderedBy?.name || "ไม่ระบุ"}{" "}
            </p>
          </div>
          <div className="col-md-8 col-12">
            <div className="mb-3">
              <label
                htmlFor="addressInput"
                className="form-label fw-semibold"
                style={{ color: "#333333" }}
              >
                ที่อยู่จัดส่ง
              </label>
              <textarea
                className="form-control"
                id="addressInput"
                rows="3"
                value={address}
                onChange={(e) => setAddress(e.target.value)}
                style={{
                  borderColor: "#e0e0e0",
                  color: "#333333",
                  backgroundColor: "#f9f9f9",
                }}
              ></textarea>
            </div>
            <div className="mb-0">
              <label
                htmlFor="phoneInput"
                className="form-label fw-semibold"
                style={{ color: "#333333" }}
              >
                เบอร์ติดต่อ
              </label>
              <input
                type="text"
                className="form-control"
                id="phoneInput"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                style={{
                  borderColor: "#e0e0e0",
                  color: "#333333",
                  backgroundColor: "#f9f9f9",
                }}
              />
              {/* <p className="mt-1" style={{ fontSize: "0.85rem", color: "#777777" }}>รหัสตะกร้า: {cart.id}</p> */}
            </div>
          </div>
        </div>

        {/* Product List Header */}
        <div
          className="row py-2 px-3 mb-2 fw-bold rounded"
          style={{ backgroundColor: "#A53860", color: "#FFFFFF" }}
        >
          <div className="col-6">ชื่อรายการ</div>
          <div className="col-2 text-center">ราคาต่อหน่วย</div>
          <div className="col-2 text-center">จำนวน</div>
          <div className="col-2 text-end">รวม</div>
        </div>

        {/* Product List */}
        {cart.products.map((element, index) => (
          <div
            key={index}
            className="row py-3 mb-2 align-items-center rounded shadow-sm"
            style={{ backgroundColor: "#FFFFFF", border: "1px solid #e0e0e0" }}
          >
            <div className="col-6">
              <div className="row g-2 align-items-center">
                <div className="col-md-3 col-4">
                  <img
                    src={
                      element.product?.images?.[0]?.url ||
                      "https://via.placeholder.com/60x60?text=No+Image"
                    }
                    alt={element.product?.title || "Product image"}
                    className="img-fluid rounded"
                    style={{
                      width: "60px",
                      height: "60px",
                      objectFit: "cover",
                    }}
                  />
                </div>
                <div className="col-md-9 col-8">
                  <p className="mb-0 fw-semibold" style={{ color: "#333333" }}>
                    {element.product?.title || "สินค้าไม่มีชื่อ"}
                  </p>
                </div>
              </div>
            </div>
            <div className="col-2 text-center" style={{ color: "#555555" }}>
              {formatPrice(element.price)}
            </div>
            <div className="col-2 text-center" style={{ color: "#555555" }}>
              {element.count}
            </div>
            <div
              className="col-2 text-end fw-bold"
              style={{ color: "#333333" }}
            >
              {formatPrice(element.price * element.count)}
            </div>
          </div>
        ))}

        {/* Summary and Confirm Button Section */}
        <div
          className="row mt-4 p-3 rounded shadow-sm"
          style={{ backgroundColor: "#FFFFFF", border: "1px solid #e0e0e0" }}
        >
          <div className="col-md-6 col-12 mb-3 mb-md-0">
            <h5 className="fw-bold mb-3" style={{ color: "#333333" }}>
              วิธีการชำระเงิน
            </h5>
            <p className="text-muted">
              *** ชำระเงิน *** <br />
              (หลังจากโอนเงินแล้ว แจ้งกับระบบ)
            </p>
          </div>
          <div className="col-md-6 col-12 text-md-end text-start">
            <h5 className="fw-bold mb-3" style={{ color: "#333333" }}>
              สรุปยอดทั้งหมด
            </h5>
            <div
              className="d-flex justify-content-between align-items-center mb-2"
              style={{ color: "#333333" }}
            >
              <span>ยอดรวมสินค้า:</span>
              <span className="fw-bold">{formatPrice(cart.cartTotal)} บาท</span>
            </div>
            <div
              className="d-flex justify-content-between align-items-center mb-3"
              style={{ color: "#333333" }}
            >
              <span>ค่าจัดส่ง:</span>
              <span className="fw-bold">{formatPrice(shippingCost)} บาท</span>
            </div>
            <hr style={{ borderColor: "#e0e0e0" }} />
            <div
              className="d-flex justify-content-between align-items-center fs-5 fw-bold mb-4"
              style={{ color: "#333333" }}
            >
              <span>ยอดที่ต้องชำระทั้งหมด:</span>
              <span>{formatPrice(cart.cartTotal + shippingCost)} บาท</span>
            </div>
            <button
              className="btn btn-dark btn-lg w-100" // w-100 เพื่อให้ปุ่มเต็มความกว้าง
              onClick={handleConfirmOrder}
              style={{
                backgroundColor: "#A53860",
                color: "#FFFFFF",
                borderRadius: "8px",
                border: "none",
                padding: "12px 0", // ปรับ padding
                fontSize: "1.1rem",
                transition: "all 0.2s ease-in-out",
              }}
            >
              ยืนยันการสั่งซื้อสินค้า
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ConfirmOrder;
