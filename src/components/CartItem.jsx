import React from "react";
import { useAuthContext } from "../store/authContext";
import { selectCartItem, ADD_TO_CART, DEC_TO_CART } from "../store/cartSlice";
import { useSelector, useDispatch } from "react-redux";
import "../styles/CartItem.css";
import { BiFoodTag } from "react-icons/bi";
import empty from "../images/emptycart.svg";
import { useNavigate } from "react-router-dom";

const CartItem = () => {
  const cartItem = useSelector(selectCartItem);
  const { user } = useAuthContext();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const currentUserCart = cartItem.filter(
    (item) => item.orderUserId === user.uid
  );

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

  const validate = () => {
    if (!user.isLoggedIn) {
      navigate("/login");
      return;
    } else {
      navigate("/cart");
    }
  };

  return (
    <>
      {currentUserCart.length > 0 ? (
        <div className="cartItemBar">
          <div className="cartItemHead">
            <h1>Cart</h1>
            <p>
              {currentUserCart.length}{" "}
              {currentUserCart.length > 1 ? "Items" : "Item"}
            </p>
          </div>

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

          <div className="subtotalBar">
            <div className="subtotal">
              <div>
                <h3>Subtotal</h3>
                <span>Extra charges may apply</span>
              </div>

              <h3>${total}</h3>
            </div>
          </div>

          <div className="checkOutButton">
            <button onClick={validate}>Checkout</button>
          </div>
        </div>
      ) : (
        <div className="emptyBar">
          <div className="emptyHead">
            <h1>Empty Cart</h1>
          </div>

          <img src={empty} alt="cart empty" />

          <p>
            Good food is always cooking! Go ahead, order some yummy items from
            the menu.
          </p>
        </div>
      )}
    </>
  );
};

export default CartItem;
