import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import {
  AddCountedCartApi,
  listCartApi,
  removeCountedCartApi,
  removeitemCartApi,
} from "../../api/cartApi";
import useMyStore from "../../global-state/bigdata";
import { ToastContainer, toast } from "react-toastify"; // Added Toastify for notifications
import { CircleMinus, CirclePlus, Trash2, ShoppingCart } from "lucide-react"; // Added relevant icons
import "react-toastify/dist/ReactToastify.css"; // Toastify CSS

const Cart = () => {
  const token = useMyStore((state) => state.token);
  const [cart, setCart] = useState(null); // Changed to null initially to indicate no data yet
  const [loading, setLoading] = useState(true); // Added loading state

  // Function to fetch cart data
  const getCart = async () => {
    setLoading(true); // Set loading to true before fetching
    try {
      const res = await listCartApi(token);
      setCart(res.data);
    } catch (error) {
      setCart(null); // Clear cart on error
    } finally {
      setLoading(false); // Set loading to false after fetching
    }
  };

  useEffect(() => {
    getCart();
  }, [token]); // Added token to dependency array for re-fetch on token change

  // Function to add quantity of an item
  const add = async (item_id, product_id, cart_id) => {
    try {
      await AddCountedCartApi(token, { item_id, product_id, cart_id });
      getCart(); // Re-fetch cart to update UI
    } catch (error) {
      console.error("Error adding item quantity:", error);
      toast.error(error.response?.data?.message || "ไม่สามารถเพิ่มจำนวนสินค้าได้");
    }
  };

  // Function to remove quantity of an item
  const remove = async (item_id) => {
    try {
      await removeCountedCartApi(token, { item_id });
      getCart(); // Re-fetch cart to update UI
    } catch (error) {
      console.error("Error removing item quantity:", error);
      toast.error(error.response?.data?.message || "ไม่สามารถลดจำนวนสินค้าได้");
    }
  };

  // Function to remove an item from the cart
  const removeItemed = async (item_id, cart_id) => {
    try {
      await removeitemCartApi(token, { item_id, cart_id });
      toast.success("ลบสินค้าออกจากตะกร้าเรียบร้อยแล้ว"); // Success notification
      getCart(); // Re-fetch cart to update UI
    } catch (error) {
      console.error("Error removing item from cart:", error);
      toast.error(error.response?.data?.message || "ไม่สามารถลบสินค้าออกจากตะกร้าได้");
    }
  };

  // Helper for price formatting
  const formatPrice = (price) => {
    return price
      ? price.toLocaleString("th-TH", {
          minimumFractionDigits: 0,
          maximumFractionDigits: 0,
        })
      : "0"; // Default to "0" if price is not available
  };

  return (
    <div className="min-vh-100 py-4" style={{ backgroundColor: "#FFFFFF" }}>
      <ToastContainer position="top-right" autoClose={3000} hideProgressBar />
      <div className="container">
        <h3 className="text-center mb-4 fw-bold" style={{ color: "#333333" }}>
          รายการสินค้าในตะกร้า
        </h3>
        
        { !cart || !cart.products || cart.products.length === 0 ? (
          <div className="text-center py-5 bg-light rounded" style={{backgroundColor: "#f2f2f2"}}>
            <ShoppingCart size={60} className="mb-3" style={{ color: "#999999" }} />
            <p className="lead" style={{ color: "#555555" }}>ยังไม่มีสินค้าในตะกร้า</p>
            <Link to="/products-total" className="btn btn-dark mt-3" 
                  style={{ backgroundColor: "#FF90BB", color: "#333333", borderRadius: "8px" }}>
              เลือกซื้อสินค้าเลย
            </Link>
          </div>
        ) : (
          <>
            {cart.products.map((element, index) => (
              <div
                key={index}
                className="row g-3 py-3 mb-3 align-items-center rounded shadow-sm"
                style={{ backgroundColor: "#FFFFFF", border: "1px solid #e0e0e0" }}
              >
                {/* Product Image */}
                <div className="col-md-2 col-4">
                  <img
                    src={element.product?.images?.[0]?.url || "https://via.placeholder.com/100x100?text=No+Image"}
                    alt={element.product?.title || "Product image"}
                    className="img-fluid rounded"
                    style={{ maxHeight: "100px", objectFit: "cover" }}
                  />
                </div>
                {/* Product Info & Quantity */}
                <div className="col-md-7 col-8">
                  <h5 className="mb-1 fw-semibold" style={{ color: "#333333" }}>
                    {element.product?.title || "สินค้าไม่มีชื่อ"}
                  </h5>
                  <p className="mb-2 text-muted">
                    ราคา: <span className="fw-bold" style={{ color: "#333333" }}>{formatPrice(element.price)} บาท</span>
                  </p>
                  <div className="d-flex align-items-center mb-2">
                    <span className="me-2 text-muted">จำนวน:</span>
                    <div className="btn-group" role="group">
                      <button
                        type="button"
                        className="btn btn-sm"
                        onClick={() => remove(element.id)}
                        disabled={element.count <= 1}
                        style={{
                          backgroundColor: "transparent",
                          color: "#333333",
                          border: "1px solid #e0e0e0",
                          borderRadius: "5px 0 0 5px",
                        }}
                      >
                        <CircleMinus size={18} />
                      </button>
                      <span
                        className="px-3 d-flex align-items-center justify-content-center fw-bold"
                        style={{
                          backgroundColor: "#f2f2f2", // Use f2f2f2 for quantity background
                          color: "#333333",
                          borderTop: "1px solid #e0e0e0",
                          borderBottom: "1px solid #e0e0e0",
                          minWidth: "40px"
                        }}
                      >
                        {element.count}
                      </span>
                      <button
                        type="button"
                        className="btn btn-sm"
                        onClick={() => add(element.id, element.product.id, element.cartId)} // Use element.product.id
                        disabled={element.count >= element.product?.quantity} // Disable if count equals stock
                        style={{
                          backgroundColor: "transparent",
                          color: "#333333",
                          border: "1px solid #e0e0e0",
                          borderRadius: "0 5px 5px 0",
                        }}
                      >
                        <CirclePlus size={18} />
                      </button>
                    </div>
                  </div>
                  <p className="text-muted mb-0">
                    คงเหลือ: <span className="fw-semibold" style={{ color: element.product?.quantity > 0 ? "#5cb85c" : "#d9534f" }}>
                    {element.product?.quantity > 0 ? `${element.product?.quantity} ชิ้น` : "สินค้าหมด"}
                    </span>
                  </p>
                </div>
                {/* Total Price for item and Remove Button */}
                <div className="col-md-3 col-12 text-md-end text-start">
                  <p className="fs-5 fw-bold mb-2" style={{ color: "#333333" }}>
                    รวม: {formatPrice(element.count * element.price)} บาท
                  </p>
                  <button
                    type="button"
                    className="btn btn-danger btn-sm"
                    onClick={() => removeItemed(element.id, element.cartId)}
                    style={{
                      backgroundColor: "#dc3545", // Bootstrap's default danger color
                      color: "#FFFFFF",
                      border: "none",
                      borderRadius: "5px",
                      padding: "8px 12px"
                    }}
                  >
                    <Trash2 size={16} className="me-1" /> ลบ
                  </button>
                </div>
              </div>
            ))}
            {/* Cart Summary */}
            <div className="row justify-content-end mt-4">
              <div className="col-md-4 col-12">
                <div className="p-3 rounded shadow-sm" style={{ backgroundColor: "#f2f2f2", border: "1px solid #e0e0e0" }}>
                  <p className="fs-5 fw-bold mb-2" style={{ color: "#333333" }}>
                    ราคารวมทั้งหมด: {formatPrice(cart?.cartTotal)} บาท
                  </p>
                  <div className="d-grid mt-3">
                    <Link
                      to="/user/confirm-order"
                      className="btn btn-dark btn-lg"
                      style={{
                        backgroundColor: "#A53860",
                        color: "#FFFFFF",
                        borderRadius: "8px",
                        border: "none",
                        padding: "12px 0"
                      }}
                    >
                      ยืนยันรายการ
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default Cart;