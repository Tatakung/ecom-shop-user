import React, { useState, useEffect } from "react";
import { currentAdmin } from "../api/auth";
import useMyStore from "../global-state/bigdata";
import Bonus from "./Bonus";
const ProtectRouteAdmin = ({ element }) => {
  const [ok, setOk] = useState(false);
  const user = useMyStore((state) => state.user);
  const token = useMyStore((state) => state.token);
  useEffect(() => {
    if (user && token) {
      // send to back
      currentAdmin(token)
        .then((res) => {
                    setOk(true);
        })
        .catch((err) => {
          
          setOk(false);
        });
    }
  }, []);
  
  return ok ? element : <Bonus />;
};

export default ProtectRouteAdmin;
