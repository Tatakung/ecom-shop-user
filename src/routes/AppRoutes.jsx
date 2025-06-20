// rafce
import React from "react";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import LayoutUser from "../layouts/LayoutUser";
import Layoutnormal from "../layouts/Layoutnormal";
import Home from "../pages/normal/Home";
import ProtectRouteAdmin from "./ProtectRouteAdmin";
import Loginpage from "../pages/normal/Loginpage";
import Registerpage from "../pages/normal/Registerpage";
import Dashboardpage from "../pages/admin/Dashboardpage";
import LayoutAdmin from "../layouts/LayoutAdmin";
import Categorypage from "../pages/admin/Categorypage";
import Productpage from "../pages/admin/Productpage";
import Listproductpage from "../pages/admin/Listproductpage";
import Listproductpagedetailtpage from "../pages/admin/Listproductdetailpage";
import ProductTotalpage from "../pages/normal/ProductTotalpage";
import ProductsDetailPage from "../pages/normal/ProductsDetailPage";
import CartPage from "../pages/user/CartPage";
import ProtectRouteUser from "./ProtectRouteUser";
import ConfirmPage from "../pages/user/ConfirmPage";
import PurchasePage from "../pages/user/PurchasePage";
import PurchasePageDetail from "../pages/user/PurchasePageDetail";
import NotificationPay from "../pages/user/NotificationPay";
import ListOrderPage from "../pages/admin/ListOrderPage";
import ListOrderdetailPage from "../pages/admin/ListOrderdetailPage";
const router = createBrowserRouter([
  {
    path: "/",
    element: <Layoutnormal />,
    children: [
      { index: true, element: <Home /> },
      { path: "/products-total", element: <ProductTotalpage /> },
      { path: "login", element: <Loginpage /> },
      { path: "register", element: <Registerpage /> },
      { path: "products-detail/:id", element: <ProductsDetailPage /> },
    ],
  },
  {
    path: "/admin",
    element: <ProtectRouteAdmin element={<LayoutAdmin />} />,
    children: [
      { index: true, element: <Dashboardpage /> },
      { path: "category", element: <Categorypage /> },
      { path: "product", element: <Productpage /> },
      { path: "list-product", element: <Listproductpage /> },
      { path: "list-order", element: <ListOrderPage /> },
      { path: "list-order/:id", element: <ListOrderdetailPage /> },
      { path: "list-product/:id", element: <Listproductpagedetailtpage /> },
    ],
  },
  {
    path: "/user",
    element: <ProtectRouteUser element={<LayoutUser />} />,
    children: [
      { index: true, element: <CartPage /> },
      { path: "cart", element: <CartPage /> },
      { path: "confirm-order", element: <ConfirmPage /> },
      { path: "purchase/detail/:id/pay", element: <NotificationPay /> },
      { path: "purchase", element: <PurchasePage /> },
      { path: "purchase/detail/:id", element: <PurchasePageDetail /> },
    ],
  },
]);

const AppRoutes = () => {
  return (
    <>
      <RouterProvider router={router} />
    </>
  );
};

export default AppRoutes;
