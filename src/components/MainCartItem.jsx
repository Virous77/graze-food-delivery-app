import React from "react";
import { ADD_TO_CART, DEC_TO_CART } from "../store/cartSlice";
import { useDispatch } from "react-redux";
import "../styles/CartItem.css";
import { BiFoodTag } from "react-icons/bi";

const MainCartItem = ({ currentUserCart }) => {
  const dispatch = useDispatch();

  const CurrenUserItem = currentUserCart.map(
    (order) => order.foodPrice * order.cartQuantity
  );
  const total = CurrenUserItem?.reduce((acc, curr) => {
    return +acc + +curr;
  }, 0);

  const decCart = (e) => {
    dispatch(DEC_TO_CART(e));
  };

  const incCart = (e) => {
    dispatch(ADD_TO_CART(e));
  };
  return (
    <div>
      <div className="cartItemListBar">
        {currentUserCart.map((item, idx) => (
          <div className="cartItemList" key={idx}>
            <div className="cartItemName">
              <BiFoodTag className={item.category ? "veg" : "nonVeg"} />
              <span>{item.foodName}</span>
            </div>

            <div className="cartAction">
              <div className="incDecBar">
                <span
                  className="dec"
                  onClick={() => {
                    const cartData = {
                      id: item.id,
                      foodImage: item.foodImage,
                      orderUserId: item.orderUserId,
                      foodName: item.foodName,
                      category: item.category,
                      foodPrice: item.foodPrice,
                      shopName: item.shopName,
                      shopLocation: item.shopLocation,
                      shopImage: item.shopImage,
                    };

                    decCart(cartData);
                  }}
                >
                  -
                </span>
                <span className="quantity">
                  {
                    currentUserCart?.find((lis) => lis.id === item.id)
                      ?.cartQuantity
                  }
                </span>

                <span
                  className="inc"
                  onClick={() => {
                    const cartData = {
                      id: item.id,
                      foodImage: item.foodImage,
                      orderUserId: item.orderUserId,
                      foodName: item.foodName,
                      category: item.category,
                      foodPrice: item.foodPrice,
                      shopName: item.shopName,
                      shopLocation: item.shopLocation,
                      shopImage: item.shopImage,
                    };

                    incCart(cartData);
                  }}
                >
                  +
                </span>
              </div>
            </div>

            <div className="cartItemPrice">
              <p>${+item.cartQuantity * +item.foodPrice}</p>
            </div>
          </div>
        ))}
      </div>
      <div className="billBar">
        <div className="billHead">
          <p>Bill Details</p>
        </div>

        <div className="cartTotal">
          <p>Item Total</p>
          <span>${total}</span>
        </div>

        <div className="cartTotal">
          <p>Delivery Fee</p>
          <span>$2</span>
        </div>

        <div className="subTotalLine"></div>
        <div className="cartTotal">
          <p>Taxes and Charges</p>

          <span>$7.5</span>
        </div>

        <div className="subTotalLineTwo"></div>

        <div className="cartTotalTwo">
          <p>TO PAY</p>

          <span>${total + 2 + 7.5}</span>
        </div>
      </div>
    </div>
  );
};

export default MainCartItem;
