import axios from "axios";
export const historyCartApi = async (token, data) => {
  return await axios.get("https://ecom-shop-api-ten.vercel.app/api/history", {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};
export const historyqueryCartApie = async (token, type) => {
  return await axios.get(
    "https://ecom-shop-api-ten.vercel.app/api/historyquery?type=" + type,
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );
};
export const listOrderApi = async (token) => {
  return await axios.get("https://ecom-shop-api-ten.vercel.app/api/listOrder", {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};
export const listOrderqueryApi = async (token, type) => {
  return await axios.get(
    "https://ecom-shop-api-ten.vercel.app/api/listOrderquery?type=" + type,
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );
};
export const ListhistoryCartApi = async (token, id) => {
  return await axios.get("https://ecom-shop-api-ten.vercel.app/api/historydetail/" + id, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};
export const updateStatusApi = async (token, data) => {
  console.log(data);
  return await axios.post("https://ecom-shop-api-ten.vercel.app/api/updateStatus/", data, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};
