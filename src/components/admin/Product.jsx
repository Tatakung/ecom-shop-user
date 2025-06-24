import React, { useState } from "react";
import { createProduct } from "../../api/productApi";
import ProductForm from "./ProductForm";
import useMyStore from "../../global-state/bigdata";
import { ToastContainer, toast } from "react-toastify";

const Product = () => {
  const token = useMyStore((state) => state.token);
  const initialData = {};
  const [loading, setLoading] = useState(true);
  const category = useMyStore((state) => state.category);
  const getCategory = useMyStore((state) => state.actionCategory);
  const handleCreate = async (token, data, resetvalue) => {
    try {
      setLoading(true);
      const res = await createProduct(token, data);
      toast.success(res.data.message);
      resetvalue();
      setLoading(false);
    } catch (error) {
      console.log(error);
      toast.error(error.response.data.message);
    }
  };
  return (
    <>
      <ToastContainer />

      <ProductForm
        mode="create"
        onSubmit={handleCreate}
        token={token}
        category={category}
        getCategory={getCategory}
        initialData={initialData}
      />
    </>
  );
};

export default Product;
