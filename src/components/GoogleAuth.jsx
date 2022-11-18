import React from "react";
import { FcGoogle } from "react-icons/fc";
import { useAuthContext } from "../store/authContext";

const GoogleAuth = () => {
  const { googleLogin, googleLoading } = useAuthContext();

  return (
    <div className="googleBar">
      <div onClick={googleLogin} className="googleCard">
        {!googleLoading && <FcGoogle className="googleIcon" />}
        {googleLoading ? "Processing..." : "Continue with Google"}
      </div>
    </div>
  );
};

export default GoogleAuth;
