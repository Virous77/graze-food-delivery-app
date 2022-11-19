import React, { useState } from "react";
import "../styles/Cart.css";
import Card from "../components/UI/Card";
import { useSelector } from "react-redux";
import { selectCartItem } from "../store/cartSlice";
import { useAuthContext } from "../store/authContext";
import MainCartItem from "../components/MainCartItem";
import DeliveryAddress from "../components/DeliveryAddress";
import breaks from "../images/break.svg";
import { Link } from "react-router-dom";
import ThankYou from "../components/ThankYou";

const CartPage = () => {
  const cartItem = useSelector(selectCartItem);
  const { user } = useAuthContext();
  const [thankYou, setThankYou] = useState(false);

  const userCartItem = cartItem.filter((item) => item.orderUserId === user.uid);

  return (
    <Card>
      {thankYou && <ThankYou setThankYou={setThankYou} />}

      {userCartItem.length > 0 ? (
        <section className="cartBar">
          <div className="address">
            <DeliveryAddress setThankYou={setThankYou} />
          </div>
          <div className="cartAddedBar">
            <div className="cartShopBar">
              <img
                src={userCartItem[0]?.shopImage}
                alt={userCartItem[0]?.shopName}
              />

              <div className="shopCartName">
                <h4>{userCartItem[0]?.shopName}</h4>
                <span>{userCartItem[0]?.shopLocation}</span>
                <div className="cartLine"></div>
              </div>
            </div>
            <MainCartItem currentUserCart={userCartItem} />
          </div>
        </section>
      ) : (
        <div className="wcartEmpty">
          <img src={breaks} alt="cart empty" />

          <h4>Your cart is empty</h4>
          <span>You can go to home page to view more restaurants</span>

          <Link to="/">
            <button>VISIT RESTAURANTS</button>
          </Link>
        </div>
      )}
    </Card>
  );
};

export default CartPage;
