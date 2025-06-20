import React from "react";
import { useEffect } from "react";
import {
  listProduct,
  listqueryProduct,
  removeProduct,
} from "../../api/productApi";
import { useState } from "react";
import { Link } from "react-router-dom";
import useMyStore from "../../global-state/bigdata";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Search } from "lucide-react";
import { listApi } from "../../api/categoryApi";
const Listproduct = () => {
  const [products, getProducts] = useState([]);
  const [type, setType] = useState([]);
  const token = useMyStore((state) => state.token);
  const [setype, setSeType] = useState("0");
  const [seel, setSeel] = useState("0");
  const [stock, setStock] = useState("0");

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
    buttonPrimary: "#333333",
    buttonSecondary: "#6c757d",
    grayButton: "#6c757d",
    grayButtonHover: "#5a6268",
    buttonDanger: "#dc3545",
  };
  const getProduct = async () => {
    try {
      const res = await listProduct();
      getProducts(res.data);
    } catch (error) {
      console.log(error);
      toast.error("เกิดข้อผิดพลาดในการดึงข้อมูลสินค้า");
    }
  };
  const getType = async () => {
    try {
      const resCategory = await listApi();
      setType(resCategory.data);
    } catch (error) {}
  };
  useEffect(() => {
    getProduct();
    getType();
  }, []);

  const onclickf = async () => {
    
    const query = await listqueryProduct(setype, seel, stock);
    getProducts(query.data);
  };

  const handleRemove = async (id) => {
    try {
      const remove = await removeProduct(token, id);
      getProduct(); // รีเฟรชข้อมูลสินค้าหลังจากลบ
      toast.success(remove.data.message);
    } catch (error) {
      console.log(error);
      toast.error(
        error.response?.data?.message || "เกิดข้อผิดพลาดในการลบสินค้า"
      ); // แสดงข้อความ error จาก API หรือข้อความทั่วไป
    }
  };

  return (
    <div
      className="container py-4"
      style={{ backgroundColor: colors.background, minHeight: "100vh" }}
    >
      <ToastContainer />

      {/* Page Title Card */}
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
            รายการชุด
          </h4>
        </div>
      </div>

      <div className="row">
        <div className="col-3">
          <div class="input-group mb-3">
            <span
              class="input-group-text"
              id="basic-addon1"
              style={{ background: "#A53860", color: "#FFFF" }}
            >
              ประเภทชุด
            </span>
            <select
              className="form-select"
              onChange={(e) => setSeType(e.target.value)}
            >
              <option value="0">ทั้งหมด</option>
              {type?.map((element) => (
                <option value={element.id}>{element.name}</option>
              ))}
            </select>
          </div>
        </div>
        <div className="col-3">
          <div class="input-group mb-3">
            <span
              class="input-group-text"
              id="basic-addon1"
              style={{ background: "#A53860", color: "#FFFF" }}
            >
              การขาย
            </span>
            <select
              className="form-select"
              onChange={(e) => setSeel(e.target.value)}
            >
              <option value="0">ไม่ระบุ</option>
              <option value="1">เรียงจากขายดีที่สุด</option>
              <option value="2">เรียงจากขายน้อยที่สุด</option>
            </select>
          </div>
        </div>
        <div className="col-4">
          <div class="input-group mb-3">
            <span
              class="input-group-text"
              id="basic-addon1"
              style={{ background: "#A53860", color: "#FFFF" }}
            >
              จำนวนสต๊อกสินค้า
            </span>
            <select
              className="form-select"
              onChange={(e) => setStock(e.target.value)}
            >
              <option value="0">ไม่ระบุ</option>
              <option value="1">เรียงจากมากที่สุด</option>
              <option value="2">เรียงจากน้อยที่สุด</option>
            </select>
          </div>
        </div>
        <div className="col-2">
          <button className="btn" onClick={onclickf}>
            <Search />
          </button>
        </div>
      </div>

      {/* Product List Table Card */}
      <div
        className="card shadow-sm"
        style={{
          backgroundColor: colors.cardBackground,
          border: `1px solid ${colors.borderColor}`,
        }}
      >
        <div className="card-body">
          <div className="table-responsive">
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
                    รูป
                  </th>
                  <th
                    scope="col"
                    style={{
                      backgroundColor: colors.tableHeaderBg,
                      color: colors.tableHeaderText,
                      borderBottom: `2px solid ${colors.borderColor}`,
                    }}
                  >
                    รายการชุด
                  </th>
                  <th
                    scope="col"
                    style={{
                      backgroundColor: colors.tableHeaderBg,
                      color: colors.tableHeaderText,
                      borderBottom: `2px solid ${colors.borderColor}`,
                    }}
                  >
                    ขายได้
                  </th>
                  <th
                    scope="col"
                    style={{
                      backgroundColor: colors.tableHeaderBg,
                      color: colors.tableHeaderText,
                      borderBottom: `2px solid ${colors.borderColor}`,
                    }}
                  >
                    จำนวนสต๊อก
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
                {products.length > 0 ? (
                  products.map((element, index) => (
                    <tr
                      key={index}
                      style={{
                        borderBottom: `1px solid ${colors.borderColor}`,
                      }}
                    >
                      <th scope="row">
                        <img
                          src={
                            element.images?.[0]?.url ||
                            "https://via.placeholder.com/50x50?text=No+Image"
                          }
                          alt={element.category?.name || "product image"}
                          width="50"
                          height="50"
                          style={{
                            objectFit: "cover",
                            borderRadius: "4px",
                            border: `1px solid ${colors.borderColor}`,
                          }}
                        />
                      </th>
                      <td style={{ color: colors.primaryText }}>
                        <span>{element.title || "N/A"}</span> <br />
                        <span>#{element?.category?.name} </span>
                      </td>
                      <td style={{ color: colors.primaryText }}>
                        {" "}
                        {element.sold }{" "}
                      </td>
                      <td style={{ color: colors.primaryText }}>
                        {" "}
                        {element.quantity}{" "}
                      </td>

                      <td>
                        <Link
                          to={"/admin/list-product/" + element.id}
                          className="btn btn-sm me-2"
                          style={{
                            backgroundColor: "#A53860", // ✅ ปุ่มแก้ไขเป็นสีเทา
                            color: colors.headerText,
                            fontWeight: "bold",
                            transition:
                              "background-color 0.2s, border-color 0.2s",
                          }}
                        >
                          <i className="bi bi-pencil-square"></i> แก้ไข
                        </Link>
                        <button
                          className="btn btn-sm"
                          data-bs-toggle="modal"
                          data-bs-target={`#removeProductModal${element.id}`}
                          style={{
                            backgroundColor: colors.grayButton,
                            color: colors.headerText,
                            borderColor: colors.grayButton,
                            fontWeight: "bold",
                            transition:
                              "background-color 0.2s, border-color 0.2s",
                          }}
                          onMouseOver={(e) => (
                            (e.target.style.backgroundColor =
                              colors.grayButtonHover),
                            (e.target.style.borderColor =
                              colors.grayButtonHover)
                          )}
                          onMouseOut={(e) => (
                            (e.target.style.backgroundColor =
                              colors.grayButton),
                            (e.target.style.borderColor = colors.grayButton)
                          )}
                        >
                          <i className="bi bi-trash"></i>
                          {element.isuse ? "ยกเลิกการขาย" : "เปิดการขาย"}
                        </button>
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
                      ไม่มีข้อมูลสินค้า
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      {/* Remove Product Modals Loop */}
      {products.map((element, index) => (
        <div
          key={element.id || index} // ใช้ element.id เป็น key เพื่อประสิทธิภาพที่ดีขึ้น
          className="modal fade"
          id={`removeProductModal${element.id}`} // ✅ ใช้ ID ที่สื่อความหมาย
          tabIndex="-1"
          aria-labelledby={`removeProductModalLabel${element.id}`}
          aria-hidden="true"
        >
          <div className="modal-dialog modal-dialog-centered">
            <div
              className="modal-content rounded-3 shadow"
              style={{ border: `1px solid ${colors.borderColor}` }}
            >
              <div
                className="modal-header"
                style={{
                  backgroundColor: "#A53860",
                  color: colors.headerText,
                  borderBottom: `1px solid ${colors.borderColor}`,
                }}
              >
                <h5
                  className="modal-title fs-5 fw-bold"
                  id={`removeProductModalLabel${element.id}`}
                >
                  {element.isuse
                    ? "ยืนยันการยกเลิกการขายสินค้า"
                    : "ยืนยืนการเปิดขายสินค้า"}
                </h5>
                <button
                  type="button"
                  className="btn-close"
                  data-bs-dismiss="modal"
                  aria-label="Close"
                  style={{ filter: "invert(1)" }}
                ></button>
              </div>
              <div
                className="modal-body p-4 text-center"
                style={{ color: colors.primaryText }}
              >
                {/* <p className="mb-2">
                  คุณต้องการลบสินค้าประเภท
                  <strong style={{ color: colors.buttonDanger }}>
                    {" "}
                    {element.category?.name || "N/A"}{" "}
                  </strong>
                  หรือไม่?
                </p> */}
                {element.images?.[0]?.url && (
                  <img
                    src={element.images[0].url}
                    alt={element.category?.name || "product to delete"}
                    width="100"
                    height="100"
                    className="my-3"
                    style={{
                      objectFit: "cover",
                      borderRadius: "8px",
                      border: `1px solid ${colors.borderColor}`,
                    }}
                  />
                )}
                {/* <small
                  className="text-muted"
                  style={{ color: colors.secondaryText }}
                >
                  การดำเนินการนี้ไม่สามารถย้อนกลับได้
                </small> */}
              </div>
              <div
                className="modal-footer justify-content-center border-top"
                style={{ borderTopColor: colors.borderColor }}
              >
                <button
                  type="button"
                  className="btn btn-secondary me-2"
                  data-bs-dismiss="modal"
                  style={{
                    backgroundColor: colors.buttonSecondary,
                    color: colors.headerText,
                    borderColor: colors.buttonSecondary,
                    transition: "background-color 0.2s, border-color 0.2s",
                  }}
                  onMouseOver={(e) => (
                    (e.target.style.backgroundColor = "#5a6268"),
                    (e.target.style.borderColor = "#545b62")
                  )}
                  onMouseOut={(e) => (
                    (e.target.style.backgroundColor = colors.buttonSecondary),
                    (e.target.style.borderColor = colors.buttonSecondary)
                  )}
                >
                  ยกเลิก
                </button>
                <button
                  type="button"
                  className="btn"
                  data-bs-dismiss="modal"
                  onClick={() => handleRemove(element.id)}
                  style={{
                    backgroundColor: "#A53860",
                    color: colors.headerText,
                    fontWeight: "bold",
                    transition: "background-color 0.2s, border-color 0.2s",
                  }}
                >
                  ตกลง
                </button>
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default Listproduct;
