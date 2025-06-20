import axios from "axios";
export const createCartApi = async (token, data) => {
  return await axios.post("https://ecom-shop-api-ten.vercel.app/api/cart", data, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};
export const listCartApi = async (token, data) => {
  return await axios.get("https://ecom-shop-api-ten.vercel.app/api/cart", {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};
export const AddCountedCartApi = async (token, data) => {
  return await axios.post("https://ecom-shop-api-ten.vercel.app/api/cart/add", data, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};
export const removeCountedCartApi = async (token, data) => {
  return await axios.post("https://ecom-shop-api-ten.vercel.app/api/cart/remove", data, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};
export const submitCartApi = async (token, data) => {
  console.log("s;dl;sdl;sld;lsd;l");
  return await axios.post("https://ecom-shop-api-ten.vercel.app/api/cart/onSubmit", data, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};

export const removeitemCartApi = async (token, data) => {
  return await axios.post("https://ecom-shop-api-ten.vercel.app/api/cart/removeItem", data, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};
export const checkPaymentsCartApi = async (token, data,id) => {
  return await axios.post("https://ecom-shop-api-ten.vercel.app/api/cart/checkPayments/"+id, data, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};
