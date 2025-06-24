import React, { useState } from "react";
import { useEffect } from "react";
import { useParams } from "react-router-dom";
import {
  createProductApi,
  editProductdedtail,
  listProductdetail,
} from "../../api/productApi";
import useMyStore from "../../global-state/bigdata";
import UploadFile from "./UploadFile";
import ProductForm from "./ProductForm";
import { ToastContainer, toast } from "react-toastify";
const Listproductdetail = () => {
  const token = useMyStore((state) => state.token);
  const { id } = useParams();
  const getCategory = useMyStore((state) => state.actionCategory);
  const category = useMyStore((state) => state.category);
  const [product, setProduct] = useState(null);
  useEffect(() => {
    getProduct(token, id);
    getCategory();
  }, []);
  const getProduct = async (token, id) => {
    try {
      const res = await listProductdetail(token, id);
      setProduct(res.data);
    } catch (error) {
      console.log(error);
    }
  };
  const getImages = (token, data) => {
    createProductApi(token, data);
  };

  const handleupdate = async (token, data, resetvalue) => {
    try {
      const res = await editProductdedtail(token, data, id);
      getProduct(token, id);

      toast.success(res.data.message);
    } catch (error) {
      console.log(error);
    }
  };
  if (!product)
    return (
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
        <p className="ms-3 text-muted">กำลังโหลดรายละเอียด...</p>
      </div>
    ); 
  return (
    <div>
      <ToastContainer />
      <ProductForm
        mode="edit"
        token={token}
        onSubmit={handleupdate}
        initialData={product} //
        category={category}
        getCategory={getCategory}
      />
    </div>
  );
};

export default Listproductdetail;
