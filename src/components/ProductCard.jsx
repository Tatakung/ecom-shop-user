import React from "react";
import { Link } from "react-router-dom";

const ProductCard = ({ items, index }) => {
  return (
    <div className="col-3 mt-3 mb-3">
      <Link
        to={`/products-detail/${items.id}`}
        className="text-decoration-none text-dark"
      >
        <div className="card h-100 shadow-sm">
          <div
            style={{
              overflow: "hidden",
              borderRadius: "4px",
            }}
          >
            <img
              src={items.images[0].url}
              alt=""
              style={{
                width: "100%",
                height: "400px",
                objectFit: "cover",
                borderRadius: "1px",
                transition: "transform 0.5s ease",
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.transform = "scale(1.1)";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = "scale(1)";
              }}
            />
          </div>

          <div className="p-2">
            <div className="d-flex flex-column">
              <span>{items.title}</span>
              <span>฿{items.price}</span>
            </div>
          </div>
        </div>
      </Link>
    </div>
  );
};

export default ProductCard;
