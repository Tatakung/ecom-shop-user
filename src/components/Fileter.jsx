import React, { useEffect, useState } from "react";
import useMyStore from "../global-state/bigdata";
// import Slider from "rc-slider";
import "rc-slider/assets/index.css";
import Slider from "rc-slider";
import "rc-slider/assets/index.css";
import { filterProduct } from "../api/productApi";
import Showproduct from "./Showproduct";
const Fileter = ({ Category, price, handlePrice, handleSelecteType }) => {
  return (
    <div className="row">
      <div className="col-4">
        <h4>ค้นหาหมวดหมู่</h4>
        <div className="d-flex">
          {Category.map((element, index) => (
            <div class="form-check">
              <input
                className="form-check-input "
                type="checkbox"
                value={element.id}
                id="checkDefault"
                onClick={() => handleSelecteType(element.id)}
              />
              <label class="form-check-label me-2" for="checkDefault">
                {element.name}
              </label>
            </div>
          ))}
        </div>
      </div>
      <div className="col-6">
        <h4>ค้นหาราคา</h4>
        <div>
          <div className="flex justify-between">
            <span>ราคาต่ำสุด : {price[0]}</span>
            <span>ราคาสูงสุด : {price[1]}</span>
          </div>
          <Slider
            onChange={handlePrice}
            range
            min={0}
            max={100000}
            defaultValue={[1000, 30000]}
          />
        </div>
      </div>
    </div>
  );
};

export default Fileter;
