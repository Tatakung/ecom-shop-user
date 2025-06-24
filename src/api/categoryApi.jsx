import axios from "axios";
export const createApi = async (token, name) => {
  
  return await axios.post("https://ecom-shop-api-ten.vercel.app/api/category", name, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};
export const createProductApi = async (token, data) => {
  
  return await axios.post("https://ecom-shop-api-ten.vercel.app/api/category", data, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};
export const removeApi = async (token, id) => {
  
  return await axios.delete("https://ecom-shop-api-ten.vercel.app/api/category/" + id, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};
export const editApi = async (token, id, name) => {
 
  return await axios.put("https://ecom-shop-api-ten.vercel.app/api/category/" + id, name, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};
export const listApi = async () => {
  return await axios.get("https://ecom-shop-api-ten.vercel.app/api/category", {});
};
