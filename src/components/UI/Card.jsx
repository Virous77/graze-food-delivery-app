import React from "react";
import "./Card.css";

const Card = ({ children }) => {
  return <div className={`cardBar`}>{children}</div>;
};

export default Card;
