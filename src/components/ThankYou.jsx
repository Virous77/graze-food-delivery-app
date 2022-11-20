import React from "react";
import thank from "../images/thank.svg";
import { Link } from "react-router-dom";
import "../styles/ThankYou.css";
import { useDispatch } from "react-redux";
import { CLEAR_CART } from "../store/cartSlice";

const ThankYou = ({ setThankYou }) => {
  const dispatch = useDispatch();

  return (
    <>
      <div className="overLay"></div>
      <section className="thankYouBar">
        <div className="thankImg">
          <img src={thank} alt="Thank You" />
          <p>Thank you to ordering food with GRAZE</p>
        </div>

        <div className="thankYouAction">
          <Link to="/">
            <button
              onClick={() => {
                setThankYou(false);
                dispatch(CLEAR_CART());
              }}
            >
              GO TO HOME
            </button>
          </Link>

          <Link to="/profile/order-history">
            <button
              onClick={() => {
                setThankYou(false);
                dispatch(CLEAR_CART());
              }}
            >
              GO TO PROFILE
            </button>
          </Link>
        </div>
      </section>
    </>
  );
};

export default ThankYou;
