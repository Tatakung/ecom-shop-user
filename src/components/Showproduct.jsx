import React, { useEffect, useState } from "react";
import { listProduct } from "../api/productApi";
import ProductCard from "./ProductCard";

const Showproduct = ({ products }) => {
  return (
    <div>
      <div className="row">
        {products.map((items, index) => (
          <ProductCard items={items} index={index} />
        ))}
      </div>
    </div>
  );
};

export default Showproduct;
