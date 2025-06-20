import axios from "axios";
export const loginApi = async (data) => {
  // console.log(data);
  return axios.post("https://ecom-shop-api-ten.vercel.app/api/login", data);
};
export const registerApi = async (data) => {
  // console.log(data);
  return axios.post("https://ecom-shop-api-ten.vercel.app/api/register", data);
};
export const currentAdmin = async (token) => {
  return await axios.post(
    "https://ecom-shop-api-ten.vercel.app/api/currentAdmin",
    {},
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );
};
export const currentUser = async (token) => {
  return await axios.post(
    "https://ecom-shop-api-ten.vercel.app/api/currentUser",
    {},
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );
};
export const show = async (token, month, year) => {
  return await axios.get(
    "https://ecom-shop-api-ten.vercel.app/api/show?month=" + month + "&year=" + year,
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );
};
