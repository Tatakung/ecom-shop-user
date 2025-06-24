import React from "react";
import { updateStatusApi } from "../../api/userApi";
import { ToastContainer, toast } from "react-toastify";
import useMyStore from "../../global-state/bigdata";

const StatusHistoryUserDetail = ({ cart, getcart, token, id }) => {
  const user = useMyStore((state) => state.user);

  const handleConfirm = async () => {
    try {
      const data = {
        order_id: id,
        numberCode: "", 
      };
      const res = await updateStatusApi(token, data);
      toast.success(res.data.message);
      getcart(token, id);
    } catch (error) {
      console.error("Error confirming status:", error); 
      toast.error("เกิดข้อผิดพลาดในการยืนยันสถานะ");
    }
  };

  const colors = {
    primaryBg: "#f8f9fa", 
    white: "#FFFFFF",
    lightGrayBorder: "#dee2e6",
    darkGray: "#A53860",
    mediumGray: "#6c757d", 
    textDark: "#212529", 
  };

  const timelineStyles = {
    position: "relative",
    paddingLeft: "20px", 
    maxWidth: "400px", 
  };

  const timelineBeforeStyles = {
    content: "''",
    position: "absolute",
    left: "0",
    top: "0",
    height: "100%",
    width: "2px",
    backgroundColor: colors.lightGrayBorder,
  };

  const timelineItemBeforeStyles = {
    content: "''",
    position: "absolute",
    left: "-8px", 
    top: "2px",
    width: "14px",
    height: "14px",
    backgroundColor: colors.darkGray,
    borderRadius: "50%",
    border: `2px solid ${colors.white}`,
    zIndex: "1",
  };

  return (
    <div className="bg-light py-4"> 
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
        <h3 className="text-center mb-4 fw-bold text-dark">
          รายละเอียดคำสั่งซื้อ
        </h3>

        <div className="card shadow-sm mb-4 border-0"> 
          <div
            className="card-header fw-bold text-white py-3" 
            style={{ backgroundColor: colors.darkGray }}
          >
            ข้อมูลการจัดส่งและสถานะ
          </div>
          <div className="card-body">
            <div className="row g-3 p-2"> 
              <div className="col-lg-5 col-md-12 mb-3 mb-lg-0">
                <h5 className="fw-bold text-dark mb-3">ที่อยู่ในการจัดส่ง</h5>
                <p className="mb-1 text-muted"> 
                  <span className="fw-semibold text-dark">ชื่อ:</span>{" "}
                  {cart.orderedBy?.name || "ไม่ระบุ"}
                </p>
                <p className="mb-1 text-muted">
                  <span className="fw-semibold text-dark">โทร:</span>{" "}
                  {cart.orderedBy?.phone || "ไม่ระบุ"}
                </p>
                <p className="mb-0 text-muted">
                  <span className="fw-semibold text-dark">ที่อยู่:</span>{" "}
                  {cart.orderedBy?.address || "ไม่ระบุ"}
                </p>
                {cart?.order_o_m_slip && cart?.order_o_m_slip.length > 0 && (
                  <p className="mt-3 mb-0 text-muted">
                    <span className="fw-semibold text-dark">
                      ประวัติแจ้งชำระเงิน:
                    </span>
                    <br /> 
                    <span>
                      วันที่ทำรายการ:{" "}
                      {cart.order_o_m_slip[0].date
                        ? new Date(cart.order_o_m_slip[0].date).toLocaleDateString("th-TH", {
                            day: "numeric",
                            month: "long",
                            year: "numeric",
                          })
                        : "ไม่ระบุ"}
                    </span>
                    <br />
                    <span>
                      เวลา:{" "}
                      {cart.order_o_m_slip[0].hour && cart.order_o_m_slip[0].minute
                        ? `${String(cart.order_o_m_slip[0].hour).padStart(2, '0')}:${String(cart.order_o_m_slip[0].minute).padStart(2, '0')}`
                        : "ไม่ระบุ"}
                    </span>
                    <br />
                    <span>
                      สถานะ:{" "}
                      {cart.order_o_m_slip[0].status === 0
                        ? "ยังไม่ได้รับการตรวจสอบ"
                        : "ตรวจสอบแล้ว"}
                    </span>
                  </p>
                )}
              </div>

              <div className="col-lg-7 col-md-12">
                <p className="text-lg-end text-md-start fw-semibold mb-3 text-dark">
                  เลขพัสดุ:{" "}
                  <span className="fw-normal text-muted">
                    {cart?.code || "ยังไม่ได้จัดส่ง"}
                  </span>
                </p>
                <div className="w-100 d-flex flex-column align-items-md-start">
                  <h5 className="fw-bold mb-3 text-dark">
                    สถานะการจัดส่ง
                  </h5>
                  {cart?.order_o_m_status &&
                  cart.order_o_m_status.length > 0 ? (
                    <div style={timelineStyles} className="ms-3 ms-md-0"> 
                      <div style={timelineBeforeStyles}></div>
                      {cart.order_o_m_status.map((e, index) => (
                        <div className="mb-4 position-relative" key={index}> 
                          <div style={timelineItemBeforeStyles}></div>{" "}
                          <p className="text-muted mb-1" style={{ fontSize: "0.85em" }}>
                            {e.createdAt
                              ? new Date(e.createdAt).toLocaleString("th-TH", {
                                  dateStyle: "medium",
                                  timeStyle: "short",
                                })
                              : "ไม่ระบุวัน/เวลา"}
                          </p>
                          <p className="fw-semibold text-dark mb-0" style={{ lineHeight: "1.4", fontSize: "0.95em" }}>
                            {e.status || "ไม่ระบุสถานะ"}
                          </p>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <p className="text-md-start text-muted w-100">
                      ไม่มีข้อมูลสถานะการจัดส่ง
                    </p>
                  )}
                </div>

                {user.role === "user" &&
                cart.orderStatus === "จัดส่งพัสดุแล้ว" && (
                  <button
                    className="btn btn-sm text-white mt-3" 
                    style={{ backgroundColor: colors.darkGray }}
                    data-bs-toggle="modal"
                    data-bs-target="#modalChoice"
                  >
                    ฉันได้รับสินค้าแล้ว
                  </button>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Modal */}
      <div
        className="modal fade"
        id="modalChoice"
        tabIndex="-1"
        aria-labelledby="modalChoiceLabel"
        aria-hidden="true"
      >
        <div className="modal-dialog modal-dialog-centered">
          <div className="modal-content rounded-3 shadow">
            <div className="modal-body p-4 text-center">
              <h5 className="mb-2 text-dark">คุณได้รับสินค้าแล้วใช่ไหม?</h5> 
              <p className="mb-0 text-muted">โปรดยืนยันเพื่ออัปเดตสถานะคำสั่งซื้อ</p>
            </div>
            <div className="modal-footer flex-nowrap p-0 border-top"> 
              <button
                type="button"
                className="btn btn-lg btn-link fs-6 text-decoration-none col-6 py-3 m-0 rounded-0 border-end text-success fw-bold" // เพิ่ม text-success และ fw-bold
                onClick={handleConfirm}
                data-bs-dismiss="modal"
              >
                ยืนยัน
              </button>
              <button
                type="button"
                className="btn btn-lg btn-link fs-6 text-decoration-none col-6 py-3 m-0 rounded-0 text-danger" // เพิ่ม text-danger
                data-bs-dismiss="modal"
              >
                ยกเลิก
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default StatusHistoryUserDetail;