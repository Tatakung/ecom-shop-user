import React, { useState, useEffect } from "react";
// import useEcomStore from "../store/ecom-store";
import { currentUser } from "../api/auth";
// import LoadingToRedirect from "./LoadingToRedirect";
import useMyStore from "../global-state/bigdata";
import Bonus from "./Bonus";

const ProtectRouteUser = ({ element }) => {
  const [ok, setOk] = useState(false);
  const user = useMyStore((state) => state.user);
  const token = useMyStore((state) => state.token);
  useEffect(() => {
    if (user && token) {
      // send to back
      currentUser(token)
        .then((res) => setOk(true))
        .catch((err) => setOk(false));
    }
  }, []);
  return ok ? element : <Bonus />;
};
export default ProtectRouteUser;
