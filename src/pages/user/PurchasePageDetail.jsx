import React from "react";
import ListHistoryUserDetail from "../../components/user/ListHistoryUserDetail";
import StatusHistoryUserDetail from "../../components/user/StatusHistoryUserDetail";
import { useParams } from "react-router-dom";
import useMyStore from "../../global-state/bigdata";
import { useState } from "react";
import { ListhistoryCartApi } from "../../api/userApi";
import { useEffect } from "react";
import PdfComponents from "../../components/user/PdfComponents";
import { ToastContainer, toast } from "react-toastify";

import { pdf } from "@react-pdf/renderer";
import { Link } from "react-router-dom";
const PurchasePageDetail = () => {
  const { id } = useParams();

  const token = useMyStore((state) => state.token);
  const [cart, setCart] = useState([]);
  const handleOpenPdf = async () => {

    const blob = await pdf(<PdfComponents cart={cart} />).toBlob();
    const blobUrl = URL.createObjectURL(blob);
    window.open(blobUrl, "_blank");
  };

  const getcart = async (token, id) => {
    try {
      const res = await ListhistoryCartApi(token, id);
      setCart(res.data);
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    getcart(token, id);
  }, []);

  return (
    <div>
      <div className="container">
        <ToastContainer />
        <div>
          <nav className="mb-4" aria-label="breadcrumb">
            <ol className="breadcrumb">
              <li className="breadcrumb-item">
                <Link
                  to="/user/purchase" // เปลี่ยนไปใช้ link ที่ถูกต้อง
                  className="text-decoration-none"
                  style={{ color: "#333333" }}
                >
                  {" "}
                  {/* สีลิงก์เทาเข้ม */}
                  การซื้อของฉัน
                </Link>
              </li>
              <li
                className="breadcrumb-item active"
                aria-current="page"
                style={{ color: "#6c757d" }}
              >
                {" "}
                {/* สีเทาของ Bootstrap สำหรับ active */}
                รายละเอียดรายการสั่งซื้อ#{id}
              </li>
            </ol>
          </nav>
        </div>
        <StatusHistoryUserDetail
          cart={cart}
          getcart={getcart}
          token={token}
          id={id}
        />
        <ListHistoryUserDetail cart={cart} />

        {cart?.order_o_m_slip?.length > 0 &&
          cart?.order_o_m_slip[0].status === 1 && (
            <div className="container mb-2">
              <div className="row">
                <div className="col-12 text-end">
                  <button
                    className="btn btn"
                    style={{ background: "#A53860", color: "#FFFF" }}
                    onClick={handleOpenPdf}
                  >
                    ใบเสร็จรับเงิน
                  </button>
                </div>
              </div>
            </div>
          )}
      </div>
    </div>
  );
};

export default PurchasePageDetail;
