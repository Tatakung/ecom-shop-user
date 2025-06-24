import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom"; // เพิ่ม Link เพื่อใช้ใน Breadcrumb
import { useNavigate } from "react-router-dom";
import { listProductdetail } from "../api/productApi";
import useMyStore from "../global-state/bigdata";
import { createCartApi } from "../api/cartApi";
import { ToastContainer, toast } from "react-toastify";
import {
  CircleMinus, // เพิ่ม Icon
  CirclePlus, // เพิ่ม Icon
  ShoppingCart, // เพิ่ม Icon
  DollarSign, // เพิ่ม Icon
} from "lucide-react";
import "react-toastify/dist/ReactToastify.css";

const ProductsDetail = () => {
  const { id } = useParams();
  const token = useMyStore((state) => state.token);
  const user = useMyStore((state) => state.user);
  const [product, setProduct] = useState({}); 
  const [count, setCount] = useState(1);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();
  const [addingToCart, setAddingToCart] = useState(false); 

  useEffect(() => {
    const fetchProduct = async () => {
      setLoading(true); 
      await getProducts(token, id);
      setLoading(false); 
    };
    fetchProduct();
  }, [token, id]); 

  const getProducts = async (token, id) => {
    // โค้ดเดิมที่คุณต้องการคงไว้
    try {
      const res = await listProductdetail(token, id);
      setProduct(res.data);
      if (res.data.quantity === 0) {
        setCount(0);
      } else if (count > res.data.quantity) {
        setCount(res.data.quantity);
      }
    } catch (error) {
      console.error("Error fetching product details:", error); 
      toast.error("ไม่สามารถโหลดรายละเอียดสินค้าได้"); 
    }
  };

  const add = () => {
    setCount((prevCount) => {
      const newCount = prevCount + 1;
      return product.quantity && newCount > product.quantity
        ? product.quantity
        : newCount;
    });
  };

  const remove = () => {
    setCount((prevCount) => (prevCount > 1 ? prevCount - 1 : 1));
  };

  const addToCart = async () => {
    if (!user) {
      navigate("/login");
    }
    if (product.quantity <= 0) {
      toast.error("สินค้าหมด ไม่สามารถหยิบใส่ตะกร้าได้");
      return;
    }
    if (count === 0) {
      toast.error("กรุณาระบุจำนวนสินค้าที่ต้องการ");
      return;
    }

    setAddingToCart(true); 
    try {
      const data = {
        product_id: id,
        count: count,
      };
      const res = await createCartApi(token, data);
      toast.success(res.data.message || "หยิบสินค้าใส่ตะกร้าเรียบร้อยแล้ว!"); // เพิ่มข้อความ default
    } catch (error) {
      console.error("Error adding to cart:", error); // เพิ่ม console.error
      toast.error(
        error.response?.data?.message || "ไม่สามารถเพิ่มสินค้าลงในตะกร้าได้"
      ); // แสดงข้อความ error จาก API หรือข้อความ default
    } finally {
      setAddingToCart(false); // หยุดหยิบใส่ตะกร้า
    }
  };

  // Function สำหรับจัดรูปแบบราคา (เพิ่มมาเพื่อการแสดงผลที่ดีขึ้น)
  const formatPrice = (price) => {
    return price
      ? price.toLocaleString("th-TH", {
          minimumFractionDigits: 0,
          maximumFractionDigits: 0,
        })
      : "N/A";
  };

  return (
    <div className="min-vh-100 py-4" style={{ backgroundColor: "#FFFFFF" }}>
      {" "}
      {/* พื้นหลังรวมของหน้าเป็นสีขาว */}
      <ToastContainer position="top-right" autoClose={3000} hideProgressBar />
      <div className="container">
        {/* Breadcrumb */}
        <nav className="mb-4" aria-label="breadcrumb">
          <ol className="breadcrumb">
            
            <li className="breadcrumb-item">
              <Link
                to="/products-total" // เปลี่ยนไปใช้ link ที่ถูกต้อง
                className="text-decoration-none"
                style={{ color: "#333333" }}
              >
                {" "}
                {/* สีลิงก์เทาเข้ม */}
                สินค้า
              </Link>
            </li>
            <li
              className="breadcrumb-item active"
              aria-current="page"
              style={{ color: "#6c757d" }}
            >
              {" "}
              {/* สีเทาของ Bootstrap สำหรับ active */}
              รายละเอียดสินค้า
            </li>
          </ol>
        </nav>

        {/* Loading State */}
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
          <div className="row g-4 mb-4">
            {/* Product Image Carousel */}
            <div className="col-lg-6">
              {product.images && product.images.length > 0 ? (
                <div
                  id="productCarousel" // เปลี่ยน id ให้เฉพาะเจาะจงขึ้น
                  className="carousel slide carousel-fade rounded shadow-sm"
                  data-bs-ride="carousel"
                >
                  <div className="carousel-inner rounded">
                    {product.images.map((element, index) => (
                      <div
                        key={index}
                        className={`carousel-item ${
                          index === 0 ? "active" : ""
                        }`}
                      >
                        <img
                          src={element.url}
                          className="d-block w-100 img-fluid rounded"
                          alt={`Product image ${index + 1}`}
                          style={{
                            maxHeight: "550px", // จำกัดความสูง
                            objectFit: "contain", // ให้รูปภาพพอดีโดยไม่ถูกตัด
                            backgroundColor: "#FFFFFF", // พื้นหลังรูปภาพเป็นสีขาว
                          }}
                          // เอา onMouseEnter/onMouseLeave ออกตามคำขอ
                        />
                      </div>
                    ))}
                  </div>
                  {product.images.length > 1 && ( // แสดงปุ่มควบคุมก็ต่อเมื่อมีรูปภาพมากกว่า 1 รูป
                    <>
                      <button
                        className="carousel-control-prev"
                        type="button"
                        data-bs-target="#productCarousel"
                        data-bs-slide="prev"
                      >
                        <span
                          className="carousel-control-prev-icon"
                          aria-hidden="true"
                          style={{ filter: "invert(0%)" }} // ทำให้ไอคอนเป็นสีดำ
                        ></span>{" "}
                        <span className="visually-hidden">Previous</span>
                      </button>
                      <button
                        className="carousel-control-next"
                        type="button"
                        data-bs-target="#productCarousel"
                        data-bs-slide="next"
                      >
                        <span
                          className="carousel-control-next-icon"
                          aria-hidden="true"
                          style={{ filter: "invert(0%)" }} // ทำให้ไอคอนเป็นสีดำ
                        ></span>{" "}
                        <span className="visually-hidden">Next</span>
                      </button>
                    </>
                  )}
                </div>
              ) : (
                <div
                  className="d-flex justify-content-center align-items-center rounded shadow-sm"
                  style={{ minHeight: "400px", backgroundColor: "#f2f2f2" }} // พื้นหลังเป็นเทาอ่อน (#f2f2f2)
                >
                  <p className="text-muted">ไม่มีรูปภาพสินค้า</p>
                </div>
              )}
            </div>

            {/* Product Information */}
            <div className="col-lg-6">
              <div
                className="p-4 rounded shadow-sm h-100 d-flex flex-column justify-content-between"
                style={{ backgroundColor: "#FFFFFF" }}
              >
                {" "}
                {/* พื้นหลัง Card เป็นสีขาว */}
                <div>
                  <h1 className="mb-3 fw-bold" style={{ color: "#333333" }}>
                    {product.title || "ไม่พบชื่อสินค้า"}
                  </h1>{" "}
                  {/* สีหัวข้อเทาเข้ม */}
                  {product.category && (
                    <p className="lead text-muted">
                      ประเภท:{" "}
                      <strong style={{ color: "#333333" }}>
                        {product.category.name}
                      </strong>{" "}
                      {/* สีเทาเข้ม */}
                    </p>
                  )}
                  <p className="fs-2 fw-bold" style={{ color: "#333333" }}>
                    {" "}
                    {/* สีราคาเทาเข้ม */}
                    {formatPrice(product.price)} บาท
                  </p>
                  <p className="mb-3 text-muted">
                    สินค้าคงคลัง:{" "}
                    <span
                      className={`fw-semibold ${
                        product.quantity > 0 ? "text-success" : "text-danger" // สีเขียว/แดงคงเดิม (ตาม Bootstrap)
                      }`}
                    >
                      {product.quantity > 0
                        ? `${product.quantity} ชิ้น`
                        : "สินค้าหมด"}
                    </span>
                  </p>
                  {/* Quantity Control */}
                  <div className="d-flex align-items-center mb-4">
                    <span className="me-3 fs-5 text-muted">จำนวน:</span>
                    <div
                      className="btn-group rounded-pill"
                      role="group"
                      aria-label="Quantity control"
                    >
                      <button
                        className="btn btn-sm d-flex align-items-center justify-content-center"
                        onClick={remove}
                        disabled={count <= 1 || product.quantity <= 0}
                        style={{
                          width: "40px",
                          height: "40px",
                          color: "#333333", // สีไอคอนเทาเข้ม
                          background: "transparent",
                          border: "1px solid #e0e0e0", // เส้นขอบเทาอ่อน
                          borderTopLeftRadius: "20px", // มุมโค้งเฉพาะปุ่ม
                          borderBottomLeftRadius: "20px", // มุมโค้งเฉพาะปุ่ม
                          transition: "background-color 0.2s ease",
                        }}
                        onMouseOver={(e) => {
                          if (!e.target.disabled)
                            e.target.style.backgroundColor = "#e0e0e0";
                        }}
                        onMouseOut={(e) => {
                          e.target.style.backgroundColor = "transparent";
                        }}
                      >
                        <CircleMinus size={20} />
                      </button>
                      <span
                        className="px-3 d-flex align-items-center justify-content-center fw-bold"
                        style={{
                          color: "#333333", // สีตัวเลขเทาเข้ม
                          minWidth: "50px",
                          backgroundColor: "#f2f2f2", // พื้นหลังเทาอ่อน (#f2f2f2)
                          borderTop: "1px solid #e0e0e0",
                          borderBottom: "1px solid #e0e0e0",
                        }}
                      >
                        {count}
                      </span>
                      <button
                        className="btn btn-sm d-flex align-items-center justify-content-center"
                        onClick={add}
                        disabled={
                          count >= product.quantity || product.quantity <= 0
                        }
                        style={{
                          width: "40px",
                          height: "40px",
                          color: "#333333", // สีไอคอนเทาเข้ม
                          background: "transparent",
                          border: "1px solid #e0e0e0", // เส้นขอบเทาอ่อน
                          borderTopRightRadius: "20px", // มุมโค้งเฉพาะปุ่ม
                          borderBottomRightRadius: "20px", // มุมโค้งเฉพาะปุ่ม
                          transition: "background-color 0.2s ease",
                        }}
                        onMouseOver={(e) => {
                          if (!e.target.disabled)
                            e.target.style.backgroundColor = "#e0e0e0";
                        }}
                        onMouseOut={(e) => {
                          e.target.style.backgroundColor = "transparent";
                        }}
                      >
                        <CirclePlus size={20} />
                      </button>
                    </div>
                  </div>
                </div>
                {/* Action Buttons */}
                <div className="d-grid gap-3 mt-auto">
                  {" "}
                  {/* เพิ่ม mt-auto เพื่อให้ปุ่มอยู่ด้านล่าง */}
                  <button
                    className="btn btn-lg fw-semibold d-flex align-items-center justify-content-center"
                    onClick={addToCart} // ใช้ addToCart ตามชื่อ function ที่เปลี่ยนไป
                    disabled={
                      product.quantity <= 0 || addingToCart || count === 0
                    }
                    style={{
                      borderRadius: "10px",
                      backgroundColor: "#A53860", // สีปุ่มหลัก เทาเข้ม
                      color: "#FFFFFF", // ตัวอักษรสีขาว
                      border: "none",
                      padding: "12px 0",
                      transition: "all 0.3s ease",
                    }}
                    
                  >
                    {addingToCart ? (
                      <>
                        <span
                          className="spinner-border spinner-border-sm me-2"
                          role="status"
                          aria-hidden="true"
                          style={{ color: "#FFFFFF" }}
                        ></span>
                        กำลังหยิบใส่ตะกร้า...
                      </>
                    ) : (
                      <>
                        <ShoppingCart size={20} className="me-2" />
                        หยิบใส่ตะกร้า ({count})
                      </>
                    )}
                  </button>
                  
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Product Description */}
        {product.description && (
          <div
            className="mt-5 p-4 rounded shadow-sm"
            style={{ backgroundColor: "#FFFFFF" }}
          >
            {" "}
            {/* พื้นหลัง Card เป็นสีขาว */}
            <h3 className="mb-3 fw-bold" style={{ color: "#333333" }}>
              รายละเอียดสินค้า
            </h3>{" "}
            {/* สีหัวข้อเทาเข้ม */}
            <p className="text-muted" style={{ whiteSpace: "pre-wrap" }}>
              {product.description}
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default ProductsDetail;
