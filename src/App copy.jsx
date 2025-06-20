import React, { useState } from "react";
import Resizer from "react-image-file-resizer";
import axios from "axios";

function Input() {
  const [image, setImage] = useState("");

  const uploadImage = async (files) => {
    const file = files[0]; // รับไฟล์จาก input
    if (!file) return;

    const resizeFile = (file) =>
      new Promise((resolve) => {
        Resizer.imageFileResizer(
          file,
          300,
          300,
          "JPEG",
          100,
          0,
          (uri) => {
            resolve(uri);
          },
          "base64"
        );
      });

    try {
      const resizedImage = await resizeFile(file); // รอการ resize
      setImage(resizedImage);
      const res = await axios.post("https://ecom-shop-api-ten.vercel.app/api/image", {
        image: resizedImage,
      });

      console.log(res.data);
    } catch (err) {
      console.error("Upload failed:", err);
    }
  };

  return (
    <div>
      <input
        type="file"
        name="image"
        onChange={(e) => uploadImage(e.target.files)}
      />
    </div>
  );
}

export default Input;
