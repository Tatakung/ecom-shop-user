import React, { useEffect, useState } from "react";
import Fileter from "../../components/Fileter";
import Showproduct from "../../components/Showproduct";
import useMyStore from "../../global-state/bigdata";
import { filterProduct, listProduct } from "../../api/productApi";

const ProductTotalpage = () => {
  const Actioncate = useMyStore((state) => state.actionCategory);
  const Category = useMyStore((state) => state.category);
  const [price, setPrice] = useState([1, 50000]);
  const [type, setType] = useState([]);
  const inState = [...type];
  const findCheck = inState.indexOf(1); // ถ้าไม่เจอ จะ return -1
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);
    Actioncate();
    getProduct();
  }, []);
  useEffect(() => {
    getFilter();
  }, [type, price]);
  const getProduct = async () => {
    const res = await listProduct();
    setProducts(res.data);
    setLoading(false);
  };
  const getFilter = async () => {
    try {
      const data = {
        type: type,
        price: price,
      };
      const res_Filter = await filterProduct(data);

      setProducts(res_Filter.data);
    } catch (error) {
      console.log(error);
    }
  };
  const data = {
    type: type,
    price: price,
  };

  const handlePrice = (value) => {
    setPrice(value);
  };
  const handleSelecteType = (id) => {
    const inState = [...type];
    const findCheck = inState.indexOf(id); // ถ้าไม่เจอ จะ return -1
    if (findCheck === -1) {
      inState.push(id);
    } else {
      inState.splice(findCheck, 1);
    }
    setType(inState);
  };

  return (
    <div>
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
        <div className="container">
          <div className="row">
            <Fileter
              Category={Category}
              price={price}
              handlePrice={handlePrice}
              handleSelecteType={handleSelecteType}
            />
            <Showproduct products={products} />
          </div>
        </div>
      )}
    </div>
  );
};

export default ProductTotalpage;
