import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom"; // สำหรับลิงก์ไปหน้าสินค้าทั้งหมด
import { listProducthome } from "../../api/productApi";

const Home = () => {
  const [product, setProduct] = useState([]);
  const [productNew, setProductNew] = useState([]);
  const [loading, setLoading] = useState(true);
  const getProduct = async () => {
    try {
      setLoading(true);
      const res = await listProducthome();
      setProduct(res.data.products_month);
      setProductNew(res.data.list_new);
      setLoading(false);
    } catch (error) {}
  };
  useEffect(() => {
    getProduct();
  }, []);
  // สร้างข้อมูลตัวอย่างสินค้าขายดี (placeholder data)

  // สร้างข้อมูลตัวอย่างสินค้าใหม่ล่าสุด (placeholder data)

  const colors = {
    white: "#FFFFFF",
    lightGrayBorder: "#dee2e6",
    darkPink: "#A53860", // สีชมพูเข้มสำหรับ accent
    textDark: "#212529", // สีข้อความหลัก
    textMuted: "#6c757d", // สีข้อความรอง
  };
  return (
    <div className="container">
      <h2
        className="text-center mb-5 fw-bold"
        style={{ color: colors.textDark }}
      >
        สินค้าขายดีในเดือนนี้!
      </h2>

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
            {" "}
            {/* สี Spinner เทาเข้ม */}
            <span className="visually-hidden">Loading...</span>
          </div>
          <p className="ms-3 text-muted">กำลังโหลดรายละเอียดสินค้า...</p>
        </div>
      ) : (
        <div className="row justify-content-center">
          {product?.map((product) => (
            <div key={product.id} className="col-2">
              <div
                className="card h-100 shadow-sm border-0 rounded-lg overflow-hidden"
                style={{ backgroundColor: colors.white }}
              >
                <img
                  src={product.images[0].url}
                  className="card-img-top img-fluid"
                  alt={product.id}
                  style={{ height: "300px", objectFit: "cover" }}
                />
                <div className="card-body d-flex flex-column">
                  <h5
                    className="card-title fw-bold mb-1"
                    style={{ color: colors.textDark }}
                  >
                    {product.title}
                  </h5>
                  <p
                    className="card-text mb-2"
                    style={{ color: colors.textMuted }}
                  >
                    ราคา:{" "}
                    <span
                      className="fw-semibold"
                      style={{ color: colors.darkPink }}
                    >
                      {product.price.toLocaleString()} บาท
                    </span>
                  </p>
                  <Link
                    to={`/products-detail/${product.id}`}
                    className="btn btn-sm mt-auto text-white fw-semibold"
                    style={{ backgroundColor: colors.darkPink, border: "none" }}
                    onMouseEnter={(e) =>
                      (e.target.style.backgroundColor = "#E53888")
                    }
                    onMouseLeave={(e) =>
                      (e.target.style.backgroundColor = colors.darkPink)
                    }
                  >
                    ดูรายละเอียด
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
      <div className="container py-5">
        <h2
          className="text-center mb-5 fw-bold"
          style={{ color: colors.textDark }}
        >
          สินค้าใหม่ล่าสุด!
        </h2>
        {
          loading ? (
          <div
            className="d-flex justify-content-center align-items-center"
            style={{ minHeight: "300px" }}
          >
            <div
              className="spinner-border"
              role="status"
              style={{ color: "#333333" }}
            >
              {" "}
              {/* สี Spinner เทาเข้ม */}
              <span className="visually-hidden">Loading...</span>
            </div>
            <p className="ms-3 text-muted">กำลังโหลดรายละเอียดสินค้า...</p>
          </div>
        ) : 
        
        <div className="row justify-content-center">
          {productNew?.map((product) => (
            <div key={product.id} className="col-2">
              <div
                className="card h-100 shadow-sm border-0 rounded-lg overflow-hidden"
                style={{ backgroundColor: colors.white }}
              >
                <img
                  src={product.images[0].url}
                  className="card-img-top img-fluid"
                  alt={product.id}
                  style={{ height: "300px", objectFit: "cover" }}
                />
                <div className="card-body d-flex flex-column">
                  <h5
                    className="card-title fw-bold mb-1"
                    style={{ color: colors.textDark }}
                  >
                    {product.title}
                  </h5>
                  <p
                    className="card-text mb-2"
                    style={{ color: colors.textMuted }}
                  >
                    ราคา:{" "}
                    <span
                      className="fw-semibold"
                      style={{ color: colors.darkPink }}
                    >
                      {product.price.toLocaleString()} บาท
                    </span>
                  </p>
                  <Link
                    to={`/products-detail/${product.id}`}
                    className="btn btn-sm mt-auto text-white fw-semibold"
                    style={{ backgroundColor: colors.darkPink, border: "none" }}
                    onMouseEnter={(e) =>
                      (e.target.style.backgroundColor = "#E53888")
                    }
                    onMouseLeave={(e) =>
                      (e.target.style.backgroundColor = colors.darkPink)
                    }
                  >
                    ดูรายละเอียด
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>
        }
        <div className="text-center mt-5">
          <Link
            to="/products-total?sort=latest"
            className="btn btn-lg fw-semibold"
            style={{
              backgroundColor: colors.darkPink,
              color: colors.white,
              border: "none",
              padding: "12px 30px",
              borderRadius: "8px",
            }}
            onMouseEnter={(e) => (e.target.style.backgroundColor = "#E53888")}
            onMouseLeave={(e) =>
              (e.target.style.backgroundColor = colors.darkPink)
            }
          >
            ดูสินค้าทั้งหมด
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Home;
