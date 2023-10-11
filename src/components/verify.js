import React, { useEffect } from "react";
import { UseAuth } from "../functions/authentication";
import Cookies from "universal-cookie";

function Verify() {
  const { isVerified } = UseAuth();

  useEffect(() => {
    setTimeout(() => {
      const cookies = new Cookies();
      console.log(cookies.get("token"));
      console.log("hello");
      if (cookies.get("token")) {
        isVerified(cookies.get("name"));
      }
    }, 1000);
  }, []);

  return <></>;
}

export default Verify;
