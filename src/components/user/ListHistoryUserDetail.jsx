import React from "react";
// ไม่ได้ใช้งานในโค้ดที่ให้มา แต่คงไว้ตาม original import
import { useEffect, useState } from "react";
import { ListhistoryCartApi } from "../../api/userApi";
import useMyStore from "../../global-state/bigdata";
// --------------------------------------------------------
import { useNavigate } from "react-router-dom";

const ListHistoryUserDetail = ({ cart }) => {

  const user = useMyStore((state) => state.user);

  const navigate = useNavigate();

  // ฟังก์ชันนำทางไปยังหน้าแจ้งชำระเงิน
  const payments = () => {
    navigate("pay");
  };

  const formatPrice = (price) => {
    if (price === null || price === undefined) {
      return "0";
    }
    return price.toLocaleString("th-TH", {
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    });
  };

  const colors = {
    background: "#f2f2f2",
    cardBackground: "#FFFFFF",
    borderColor: "#e0e0e0",
    headerBackground: "#A53860",
    headerText: "#FFFFFF",
    primaryText: "#333333",
    secondaryText: "#555555",
    mutedText: "#999999",
    warningButtonBg: "#ffc107",
    warningButtonHover: "#e0a800",
    totalPrice: "#A53860", // สีน้ำเงินสำหรับยอดรวม
  };

  return (
    <div>
      <div className="container">
        <div
          className="card shadow-sm mb-4"
          style={{
            backgroundColor: colors.cardBackground,
            border: `1px solid ${colors.borderColor}`,
          }}
        >
          <div
            className="card-header fw-bold"
            style={{
              backgroundColor: colors.headerBackground,
              color: colors.headerText,
            }}
          >
            ข้อมูลคำสั่งซื้อ
          </div>

          <div className="card-body">
            {/* เลขออเดอร์และปุ่มแจ้งชำระเงิน */}
            <div
              className="row align-items-center mb-3 pb-2 border-bottom"
              style={{ borderColor: colors.borderColor }}
            >
              <div className="col-md-6 col-sm-12 text-md-start text-center mb-2 mb-md-0">
                <p
                  className="mb-0 fw-semibold"
                  style={{ color: colors.primaryText }}
                >
                  เลขออเดอร์ที่ #{" "}
                  <span
                    className="fw-normal"
                   
                  >
                    {cart.id || "N/A"}
                  </span>
                </p>
                <span
                  className="text-muted"
                  style={{ fontSize: "0.85em", color: colors.mutedText }}
                >
                  วันที่ทำรายการ:{" "}
                  {cart.createdAt
                    ? new Date(cart.createdAt).toLocaleDateString("th-TH", {
                        year: "numeric",
                        month: "long",
                        day: "numeric",
                        hour: "2-digit",
                        minute: "2-digit",
                      })
                    : "ไม่ระบุ"}
                </span>
              </div>
              <div className="col-md-6 col-sm-12 text-md-end text-center">
                {user.role === 'user' && cart.orderStatus === "รอชำระเงิน" && (
                  <button
                    className="btn fw-bold"
                    onClick={() => payments()}
                    style={{
                      backgroundColor: '#A53860',
                      
                      color: '#FFFF', // ข้อความปุ่มสีดำ
                      padding: "8px 20px",
                      borderRadius: "5px",
                      transition: "background-color 0.2s ease-in-out",
                    }}
                    
                  >
                    แจ้งชำระเงินที่นี่
                  </button>
                )}
              </div>
            </div>

            {/* หัวข้อรายการสินค้า */}
            <h5 className="mb-3 fw-bold" style={{ color: colors.primaryText }}>
              รายการสินค้า:
            </h5>

            {/* วนลูปแสดงรายการสินค้า */}
            {cart.products && cart.products.length > 0 ? (
              cart.products.map((item, index) => (
                <div
                  className="row mt-3 pb-3 border-bottom align-items-center"
                  key={index}
                  style={{ borderColor: colors.borderColor }}
                >
                  {/* คอลัมน์สำหรับรายละเอียดสินค้า */}
                  <div className="col-10">
                    <div className="row align-items-center">
                      {/* รูปภาพสินค้า */}
                      <div className="col-md-2 col-sm-3 col-4">
                        <img
                          src={
                            item.product?.images?.[0]?.url ||
                            "https://via.placeholder.com/100x100?text=No+Image"
                          }
                          alt={item.product?.title || "Product Image"}
                          className="img-fluid rounded"
                          style={{
                            maxWidth: "100%", // ให้ภาพยืดหยุ่นตาม col
                            height: "auto",
                            aspectRatio: "1 / 1", // ทำให้ภาพเป็นสี่เหลี่ยมจัตุรัส
                            objectFit: "cover",
                            border: `1px solid ${colors.borderColor}`,
                          }}
                        />
                      </div>
                      {/* ชื่อและจำนวนสินค้า */}
                      <div
                        className="col-md-8 col-sm-9 col-8"
                        style={{ color: colors.primaryText }}
                      >
                        <p className="mb-1 fw-semibold">
                          {item.product?.title || "ไม่ระบุชื่อสินค้า"}
                        </p>
                        <p
                          className="mb-0"
                          style={{
                            fontSize: "0.9em",
                            color: colors.secondaryText,
                          }}
                        >
                          จำนวน: {item.count || 0} ชิ้น
                        </p>
                      </div>
                    </div>
                  </div>
                  {/* ราคาสินค้าแต่ละชิ้น */}
                  <div
                    className="col-2 text-end fw-bold"
                    style={{ color: colors.primaryText }}
                  >
                    {formatPrice(item.price)} ฿
                  </div>
                </div>
              ))
            ) : (
              <p
                className="text-center text-muted mt-4"
                style={{ color: colors.mutedText }}
              >
                ไม่มีรายการสินค้าในคำสั่งซื้อนี้
              </p>
            )}

            <div className="mt-4">
              <div className="row mb-2">
                <div
                  className="col-10 text-end fw-semibold"
                  style={{ color: colors.primaryText }}
                >
                  รวมค่าสินค้า:
                </div>
                <div
                  className="col-2 text-end fw-bold"
                  style={{ color: colors.primaryText }}
                >
                  {formatPrice(cart.cartTotal - 30)} ฿
                </div>
              </div>
              {/* ค่าจัดส่ง */}
              <div className="row mb-2">
                <div
                  className="col-10 text-end fw-semibold"
                  style={{ color: colors.primaryText }}
                >
                  ค่าจัดส่ง:
                </div>
                <div
                  className="col-2 text-end fw-bold"
                  style={{ color: colors.primaryText }}
                >
                  30 ฿
                </div>
              </div>
              {/* ยอดรวมทั้งหมด (เส้นคั่นด้านบน) */}
              <div
                className="row pt-2 border-top"
                style={{ borderColor: colors.borderColor }}
              >
                <div
                  className="col-10 text-end fw-bold fs-5"
                  style={{ color: colors.primaryText }}
                >
                  ยอดรวมทั้งหมด:
                </div>
                <div
                  className="col-2 text-end fw-bold fs-5"
                  style={{ color: colors.totalPrice }}
                >
                  {formatPrice(cart.cartTotal)} ฿
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ListHistoryUserDetail;
