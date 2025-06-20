import React from "react";
import { removeimage } from "../../api/productApi";
import { X } from "lucide-react";

const UploadFile = ({ images, setImages, token, name }) => {

  const colors = {
    cardBackground: "#FFFFFF",
    borderColor: "#e0e0e0",
    primaryText: "#333333",
    secondaryText: "#555555",
    lightGrayBackground: "#f8f8f8",
    removeButton: "#6c757d",
    removeButtonHover: "#5a6268",
  };

  const handleRemoveImage = async (public_id, productId) => {
    try {
      const res_remove = await removeimage(token, public_id, productId);
      setImages((prev) => prev.filter((img) => img.public_id !== public_id));
    } catch (error) {
      console.error("Error removing image:", error);
    }
  };

  return (
    <div className="py-3">
      {name && (
        <h5 className="mb-3" style={{ color: colors.primaryText }}>
          รูปภาพสำหรับ: <span className="fw-bold">{name}</span>
        </h5>
      )}

      <div className="row g-3">
        {images && images.length > 0 ? (
          images.map((img, index) => (
            <div key={index} className="col-lg-3 col-md-4 col-sm-6 mb-4">
              <div
                className="position-relative d-flex justify-content-center align-items-center rounded shadow-sm"
                style={{
                  height: "500px",
                  overflow: "hidden",
                  border: `1px solid ${colors.borderColor}`,
                  backgroundColor: colors.lightGrayBackground,
                }}
              >
                <X
                  onClick={() => handleRemoveImage(img.public_id, img.productId)}
                  className="position-absolute top-0 end-0 m-2 p-1 rounded-circle"
                  style={{
                    cursor: "pointer",
                    backgroundColor: colors.removeButton,
                    color: colors.headerText,
                    zIndex: 10,
                    transition: "background-color 0.2s",
                  }}
                  onMouseOver={(e) => (e.currentTarget.style.backgroundColor = colors.removeButtonHover)}
                  onMouseOut={(e) => (e.currentTarget.style.backgroundColor = colors.removeButton)}
                  size={24}
                />
                
                <img
                  src={img.url}
                  alt={`Image ${index + 1}`}
                  className="img-fluid"
                  style={{
                    width: "100%",
                    height: "100%",
                    objectFit: "cover",
                    objectPosition: "center",
                  }}
                />
              </div>
            </div>
          ))
        ) : (
          <div className="col-12">
            <p className="text-center text-muted py-4" style={{ color: colors.secondaryText }}>
              ยังไม่มีรูปภาพ
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default UploadFile;