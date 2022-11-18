import React from "react";
import "./Loader.css";
import { TbFidgetSpinner } from "react-icons/tb";

const Loader = () => {
  return (
    <div className="Loader">
      <TbFidgetSpinner className="loaderIcon" />
    </div>
  );
};

export default Loader;
