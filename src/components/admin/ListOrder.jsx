import React, { useEffect, useState } from "react";
import { listOrderApi, listOrderqueryApi } from "../../api/userApi";
import useMyStore from "../../global-state/bigdata";
import { Link } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const ListOrder = () => {
  const [order, setOrder] = useState([]);
  const token = useMyStore((state) => state.token);
  const [loading, setLoading] = useState(true);
  const colors = {
    background: "#f2f2f2",
    cardBackground: "#FFFFFF",
    borderColor: "#e0e0e0",
    headerBackground: "#333333",
    headerText: "#FFFFFF",
    primaryText: "#333333",
    secondaryText: "#555555",
    tableHeaderBg: "#f8f8f8",
    tableHeaderText: "#333333",
    buttonInfo: "#6c757d",
    buttonInfoHover: "#5a6268",
  };

  const getOrder = async () => {
    try {
      setLoading(true);
      const res = await listOrderApi(token);
      setOrder(res.data);
      setLoading(false);
    } catch (error) {
      console.error("Error fetching orders:", error);
      toast.error("เกิดข้อผิดพลาดในการดึงรายการคำสั่งซื้อ");
    }
  };

  useEffect(() => {
    getOrder();
  }, []);

  const filter = async (type) => {
    const q = await listOrderqueryApi(token, type);
    setOrder(q.data);
  };

  return (
    <div
      className="container py-4"
      style={{ backgroundColor: colors.background, minHeight: "100vh" }}
    >
      <ToastContainer
        position="top-center"
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
      />

      <div
        className="card shadow-sm mb-4"
        style={{
          backgroundColor: colors.cardBackground,
          border: `1px solid ${colors.borderColor}`,
        }}
      >
        <div
          className="card-body text-center"
          style={{ background: "#A53860" }}
        >
          <h4 className="mb-0 fw-bold" style={{ color: "#FFFF" }}>
            รายการคำสั่งซื้อ
          </h4>
        </div>
      </div>
      <div className="mb-2">
        <select
          className="form-select"
          style={{ background: "#A53860", color: "#FFFF", width: "200px" }}
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

      <div
        className="card shadow-sm"
        style={{
          backgroundColor: colors.cardBackground,
          border: `1px solid ${colors.borderColor}`,
        }}
      >
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
              <span className="visually-hidden">Loading...</span>
            </div>
            <p className="ms-3 text-muted">กำลังโหลดรายละเอียดสินค้า...</p>
          </div>
        ) : (
          <div className="card-body">
            <div className="table">
              <table className="table table-hover mb-0">
                <thead>
                  <tr>
                    <th
                      scope="col"
                      style={{
                        backgroundColor: colors.tableHeaderBg,
                        color: colors.tableHeaderText,
                        borderBottom: `2px solid ${colors.borderColor}`,
                      }}
                    >
                      เลขที่ออเดอร์
                    </th>
                    <th
                      scope="col"
                      style={{
                        backgroundColor: colors.tableHeaderBg,
                        color: colors.tableHeaderText,
                        borderBottom: `2px solid ${colors.borderColor}`,
                      }}
                    >
                      วันที่สั่งซื้อ
                    </th>
                    <th
                      scope="col"
                      style={{
                        backgroundColor: colors.tableHeaderBg,
                        color: colors.tableHeaderText,
                        borderBottom: `2px solid ${colors.borderColor}`,
                      }}
                    >
                      สถานะ
                    </th>
                    <th
                      scope="col"
                      style={{
                        backgroundColor: colors.tableHeaderBg,
                        color: colors.tableHeaderText,
                        borderBottom: `2px solid ${colors.borderColor}`,
                      }}
                    >
                      จัดการ
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {order && order.length > 0 ? (
                    order.map((element) => (
                      <tr
                        key={element.id}
                        style={{
                          borderBottom: `1px solid ${colors.borderColor}`,
                        }}
                      >
                        <th scope="row" style={{ color: colors.primaryText }}>
                          {element.id}
                        </th>
                        <td style={{ color: colors.primaryText }}>
                          {new Date(element.createdAt).toLocaleDateString(
                            "th-TH",
                            {
                              year: "numeric",
                              month: "short",
                              day: "numeric",
                              hour: "2-digit",
                              minute: "2-digit",
                            }
                          )}
                        </td>
                        <td style={{ color: colors.primaryText }}>
                          {element.orderStatus}
                        </td>
                        <td>
                          <Link
                            to={`/admin/list-order/${element.id}`}
                            className="btn btn-sm"
                            style={{
                              backgroundColor: "#A53860",
                              color: colors.headerText,
                              borderColor: colors.buttonInfo,
                              fontWeight: "bold",
                              transition:
                                "background-color 0.2s, border-color 0.2s",
                            }}
                          >
                            <i className="bi bi-eye"></i> ดูรายละเอียด
                          </Link>
                        </td>
                      </tr>
                    ))
                  ) : (
                    <tr>
                      <td
                        colSpan="4"
                        className="text-center text-muted py-4"
                        style={{ color: colors.secondaryText }}
                      >
                        ไม่มีรายการคำสั่งซื้อ
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default ListOrder;
