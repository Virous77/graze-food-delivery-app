import React from "react";
import "../styles/CheckHotel.css";
import { useDispatch } from "react-redux";
import { ADD_TO_CART, CLEAR_CART } from "../store/cartSlice";
import { useAuthContext } from "../store/authContext";

const CheckHotel = ({ setCheckHotel, shopData, item, tempDataC }) => {
  const dispatch = useDispatch();
  const { user } = useAuthContext();

  return (
    <section className="checkHotelBar">
      <div>
        <h3>Items already in cart</h3>
        <p>
          Your cart contains items from other restaurant. Would you like to
          reset your cart for adding items from this restaurant?
        </p>
      </div>

      <div className="checkHotelAction">
        <button className="first" onClick={() => setCheckHotel(false)}>
          NO
        </button>
        <button
          className="second"
          onClick={() => {
            dispatch(CLEAR_CART());
            const cartData = {
              id: tempDataC.id,
              foodImage: tempDataC.foodImage,
              orderUserId: user?.uid,
              foodName: tempDataC.foodName,
              category: shopData.shopTypeVeg,
              foodPrice: tempDataC.offer
                ? tempDataC?.offerFoodPrice
                : tempDataC?.foodPrice,
              shopId: tempDataC.shopId,
              shopName: shopData.shopName,
              shopImage: shopData.shopImage,
              shopLocation: shopData.shopLocation,
            };
            dispatch(ADD_TO_CART(cartData));
            setCheckHotel(false);
          }}
        >
          YES, START AFRESH
        </button>
      </div>
    </section>
  );
};

export default CheckHotel;
