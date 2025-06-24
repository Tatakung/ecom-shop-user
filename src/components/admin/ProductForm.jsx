import React, { useState, useEffect } from "react";
import UploadFile from "./UploadFile";
import Resizer from "react-image-file-resizer";
import { createProductApi } from "../../api/productApi";
const ProductForm = ({
  initialData = {},
  onSubmit,
  mode = "create",
  token,
  category,
  getCategory,
}) => {
  const [images, setImages] = useState(initialData.images || []);
  const [type, setType] = useState(initialData.categoryId || "");
  const [name, setName] = useState(initialData.title || "");
  const [description, setDescription] = useState(initialData.description || "");
  const [price, setPrice] = useState(initialData.price || "");
  const [stock, setStock] = useState(initialData.quantity || "");

  const resetvalue = () => {
    setImages("");
    setType("");
    setName("");
    setDescription("");
    setPrice("");
    setStock("");
    setImages([]);
  };
  useEffect(() => {
    setImages(initialData.images || []);
    setType(initialData.categoryId || "");
    setName(initialData.title || "");
    setDescription(initialData.description || "");
    setPrice(initialData.price || "");
    setStock(initialData.quantity || "");
  }, [initialData]);
  useEffect(() => {
    getCategory();
  }, []);
  const handleImageChange = async (e) => {
    const files = Array.from(e.target.files);
    for (const file of files) {
      try {
        const resizedImage = await resizeFile(file);
        const data = { image: resizedImage };
        const res = await createProductApi(token, data);
        setImages((prev) => [
          ...prev,
          {
            asset_id: res.data.asset_id,
            public_id: res.data.public_id,
            url: res.data.url,
            secure_url: res.data.secure_url,
            previewUrl: URL.createObjectURL(file),
          },
        ]);
      } catch (error) {
        console.error("Upload error:", error);
      }
    }
  };

  const resizeFile = (file) =>
    new Promise((resolve) => {
      Resizer.imageFileResizer(
        file,
        720,
        720,
        "JPEG",
        100,
        0,
        (uri) => resolve(uri),
        "base64"
      );
    });

  const handleSubmit = async (e) => {
    e.preventDefault();
    const data = {
      categoryId: type,
      title: name,
      description,
      price,
      quantity: stock,
      images,
    };
    onSubmit(token, data, resetvalue); // ส่งข้อมูลไปให้ component ข้างนอก (จะ create หรือ update ก็ได้)
  };

  return (
    <form onSubmit={handleSubmit}>
      <div className="container mt-2">
        <h4 className="text-center">
          {mode === "edit" ? "แก้ไขสินค้า" : "เพิ่มสินค้า"}
        </h4>
        <UploadFile
          images={images}
          setImages={setImages}
          token={token}
          name={name}
        />
        <input
          onChange={handleImageChange}
          className="form-control mb-3"
          type="file"
          multiple
          accept="image/*"
        />

        <select
          className="form-select mb-3"
          required
          onChange={(e) => setType(e.target.value)}
          value={type}
        >
          <option>เลือกประเภทชุด</option>
          {category.map((c) => (
            <option key={c.id} value={c.id}>
              {c.name}
            </option>
          ))}
        </select>

        <input
          type="text"
          className="form-control mb-3"
          placeholder="ชื่อรายการ"
          onChange={(e) => setName(e.target.value)}
          value={name}
        />

        <textarea
          className="form-control mb-3"
          placeholder="รายละเอียดชุด"
          rows="3"
          onChange={(e) => setDescription(e.target.value)}
          value={description}
        ></textarea>

        <input
          type="number"
          className="form-control mb-3"
          placeholder="ราคาซื้อ"
          min="0"
          onChange={(e) => setPrice(e.target.value)}
          value={price}
        />

        <input
          type="number"
          className="form-control mb-3"
          placeholder="จำนวนสต๊อก"
          min="0"
          onChange={(e) => setStock(e.target.value)}
          value={stock}
        />

        <button type="submit" className="btn" style={{background : "#A53860" , color : "#FFFF"}} >
          {mode === "edit" ? "อัปเดต" : "บันทึก"}
        </button>
      </div>
    </form>
  );
};

export default ProductForm;
