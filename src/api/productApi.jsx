import axios from "axios";
export const createProductApi = async (token, data) => {
  return await axios.post("https://ecom-shop-api-ten.vercel.app/api/createImages", data, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};
export const removeimage = async (token, public_id, productId = null) => {
  return await axios.post(
    "https://ecom-shop-api-ten.vercel.app/api/removeimage",
    { public_id, productId },
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );
};
export const createProduct = async (token, data) => {
  return await axios.post("https://ecom-shop-api-ten.vercel.app/api/product", data, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};
export const editProductdedtail = async (token, data, id) => {
  return await axios.put(
    "https://ecom-shop-api-ten.vercel.app/api/products/detail/" + id,
    data,
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );
};

export const listProduct = async () => {
  return await axios.get("https://ecom-shop-api-ten.vercel.app/api/products");
};
export const listProducthome = async () => {
  return await axios.get("https://ecom-shop-api-ten.vercel.app/api/productshome");
};
export const listqueryProduct = async (setype, seel, stock) => {
  console.log(setype, seel, stock);
  return await axios.get(
    "https://ecom-shop-api-ten.vercel.app/api/productsquery?setype=" +
      setype +
      "&seel=" +
      seel +
      "&stock=" +
      stock
  );
};
export const listProductdetail = async (token, id) => {
  return await axios.get("https://ecom-shop-api-ten.vercel.app/api/products/detail/" + id, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};
export const filterProduct = async (data) => {
  return await axios.post("https://ecom-shop-api-ten.vercel.app/api/products-filter", data);
};
export const removeProduct = async (token, id) => {
  return await axios.delete("https://ecom-shop-api-ten.vercel.app/api/products/" + id, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};
