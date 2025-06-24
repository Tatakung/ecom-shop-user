import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { ListhistoryCartApi, updateStatusApi } from "../../api/userApi";
import ListHistoryUserDetail from "../../components/user/ListHistoryUserDetail";
import StatusHistoryUserDetail from "../../components/user/StatusHistoryUserDetail";
import useMyStore from "../../global-state/bigdata";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const ListOrderdetailPage = () => {
  const { id } = useParams();
  const token = useMyStore((state) => state.token);
  const [cart, setCart] = useState(null);
  const [number, setNumber] = useState("");
  const [loadingButton, setLoadingButton] = useState(false);
  const colors = {
    background: "#f2f2f2",
    cardBackground: "#FFFFFF",
    borderColor: "#e0e0e0",
    primaryText: "#333333",
    secondaryText: "#555555",
    buttonPrimary: "#333333",
    buttonPrimaryHover: "#555555",
    buttonOutline: "#6c757d",
    buttonOutlineHover: "#5a6268",
    inputBorder: "#ced4da",
    inputFocusBorder: "#86b7fe",
  };

  const getcart = async (token, id) => {
    try {
      const res = await ListhistoryCartApi(token, id);
      setCart(res.data);
    } catch (error) {
      console.error("Error fetching cart details:", error);
      toast.error("เกิดข้อผิดพลาดในการดึงข้อมูลคำสั่งซื้อ");
    }
  };

  useEffect(() => {
    getcart(token, id);
  }, [token, id]);

  const handleOnsubmit = async (actionType) => {
    try {
      const data = {
        order_id: id,
        numberCode: number,
      };

      if (actionType === "confirmShipping" && !number) {
        toast.warn("กรุณาใส่รหัสติดตามพัสดุ!");
        return;
      }
      setLoadingButton(true);
      const res = await updateStatusApi(token, data);
      getcart(token, id);
      let message = "";
      if (actionType === "confirmPayment") {
        message = "ยืนยันชำระเงินเรียบร้อย!";
      } else if (actionType === "prepareOrder") {
        message = "ยืนยันการเตรียมพัสดุเรียบร้อย!";
      } else if (actionType === "confirmShipping") {
        message = "ยืนยันการจัดส่งสินค้าเรียบร้อย!";
      }
      toast.success(message);
    } catch (error) {
      console.error("Error updating status:", error);
      toast.error("เกิดข้อผิดพลาดในการอัปเดตข้อมูล");
    } finally {
      setLoadingButton(false);
    }
  };

  if (!cart) {
    return (
      <div
        className="container py-5 text-center"
        style={{
          backgroundColor: colors.background,
          minHeight: "100vh",
          color: colors.secondaryText,
        }}
      >
        <div className="spinner-border text-primary" role="status">
          <span className="visually-hidden">Loading...</span>
        </div>
        <p className="mt-3">กำลังโหลดข้อมูลคำสั่งซื้อ...</p>
      </div>
    );
  }

  return (
    <div
      className="container py-4"
      style={{ backgroundColor: colors.background, minHeight: "100vh" }}
    >
      <ToastContainer />

      <div
        className="card shadow-sm mb-4"
        style={{ backgroundColor: "#A53860" }}
      >
        <div className="card-body text-center">
          <h4 className="mb-0 fw-bold" style={{ color: colors.primaryText }}>
            รายละเอียดคำสั่งซื้อ #
            <span style={{ color: colors.buttonOutline }}>{id}</span>
          </h4>
        </div>
      </div>

      <div
        className="card shadow-sm mb-4"
        style={{
          backgroundColor: colors.cardBackground,
          border: `1px solid ${colors.borderColor}`,
        }}
      >
        <div className="card-body">
          <p className="lead mb-3" style={{ color: colors.primaryText }}>
            สถานะปัจจุบัน:{" "}
            <span className="fw-bold" style={{ color: colors.buttonPrimary }}>
              {cart.orderStatus}
            </span>
          </p>

          <div className="row g-2 mb-3">
            {cart.orderStatus === "แจ้งชำระเงินแล้ว" && (
              <div className="col-md-4 col-sm-6">
                <button
                  type="button"
                  className="btn btn-sm w-100 bg-secondary text-white"
                  style={{
                    fontWeight: "bold",
                    transition: "background-color 0.2s, border-color 0.2s",
                  }}
                  onClick={() => handleOnsubmit("confirmPayment")}
                >
                  {loadingButton ? (
                    <>
                      <span
                        className="spinner-border spinner-border-sm me-2"
                        role="status"
                        aria-hidden="true"
                        style={{ color: "#FFFFFF" }} // สี Spinner เป็นสีขาว
                      ></span>
                      กำลังทำรายการ...
                    </>
                  ) : (
                    <>ได้รับการตรวจสอบแล้วว่าชำระเงินแล้ว</>
                  )}
                </button>
              </div>
            )}

            {cart.orderStatus === "สั่งซื้อสินค้าสำเร็จ" && (
              <div className="col-md-4 col-sm-6">
                <button
                  type="button"
                  className="btn btn-sm w-100 bg-secondary text-white"
                  style={{
                    fontWeight: "bold",
                    transition: "background-color 0.2s, border-color 0.2s",
                  }}
                  onClick={() => handleOnsubmit("prepareOrder")}
                >
                  {loadingButton ? (
                    <>
                      <span
                        className="spinner-border spinner-border-sm me-2"
                        role="status"
                        aria-hidden="true"
                        style={{ color: "#FFFFFF" }} // สี Spinner เป็นสีขาว
                      ></span>
                      กำลังทำรายการ...
                    </>
                  ) : (
                    <>ยืนยันการเตรียมพัสดุ</>
                  )}
                </button>
              </div>
            )}

            {cart.orderStatus === "กำลังเตรียมพัสดุ" && (
              <div className="col-md-4 col-sm-12">
                <div className="input-group">
                  <input
                    type="text"
                    className="form-control"
                    placeholder="กรอกเลขพัสดุ"
                    value={number}
                    onChange={(e) => setNumber(e.target.value)}
                    style={{
                      borderColor: colors.inputBorder,
                      "&:focus": {
                        borderColor: colors.inputFocusBorder,
                        boxShadow: "0 0 0 0.25rem rgba(13,110,253,.25)",
                      },
                    }}
                  />
                  <button
                    type="button"
                    className="btn btn-secondary"
                    disabled={loadingButton}
                    style={{
                      fontWeight: "bold",
                      transition: "background-color 0.2s, border-color 0.2s",
                    }}
                    onClick={() => handleOnsubmit("confirmShipping")}
                  >
                    {loadingButton ? (
                      <>
                        <span
                          className="spinner-border spinner-border-sm me-2"
                          role="status"
                          aria-hidden="true"
                          style={{ color: "#FFFFFF" }} // สี Spinner เป็นสีขาว
                        ></span>
                        กำลังทำรายการ...
                      </>
                    ) : (
                      <>ยืนยันการจัดส่งสินค้า</>
                    )}
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      <StatusHistoryUserDetail cart={cart} />
      <ListHistoryUserDetail cart={cart} />
    </div>
  );
};

export default ListOrderdetailPage;
