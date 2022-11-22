import React, { useState } from "react";
import { BiFoodTag } from "react-icons/bi";
import "../styles/FoodList.css";
import { useDispatch, useSelector } from "react-redux";
import { ADD_TO_CART, DEC_TO_CART, selectCartItem } from "../store/cartSlice";
import { useAuthContext } from "../store/authContext";
import CartItem from "./CartItem";
import notFounds from "../images/notfounds.svg";
import CheckHotel from "./CheckHotel";

const FoodList = ({ food, type, shopData, shopId: sId }) => {
  const dispatch = useDispatch();
  const { user } = useAuthContext();
  const cartItemTotalIem = useSelector(selectCartItem);

  const [checkHotels, setCheckHotel] = useState(false);
  const [tempDataC, setTempDataC] = useState("");

  const cartItem = cartItemTotalIem?.filter(
    (item) => item.orderUserId === user?.uid
  );

  const addToCart = (e) => {
    const checkHotel = cartItem.find((hotel) => hotel.shopId === sId);

    if (cartItem.length === 0) {
      dispatch(ADD_TO_CART(e));
      return;
    }

    if (!checkHotel) {
      setCheckHotel(true);
    } else {
      dispatch(ADD_TO_CART(e));
    }
  };

  const decCart = (e) => {
    dispatch(DEC_TO_CART(e));
  };

  const incCart = (e) => {
    dispatch(ADD_TO_CART(e));
  };

  return (
    <section className="foodListBar">
      <div className="hideCartItem"></div>
      {food.length > 0 ? (
        <div className="foodCard">
          {food.map((item) => (
            <div key={item.id}>
              <div className="foodHomeList">
                <div className="foodleft">
                  <BiFoodTag className={type ? "veg" : "nonVeg"} />
                  <h3>{item.foodName}</h3>
                  <p>${item?.offer ? item.offerFoodPrice : item.foodPrice}</p>
                  <span>{item.foodDesc}</span>
                </div>
                <div className="foodRight">
                  <img src={item.foodImage} alt={item.foodName} />

                  <div className="addFood">
                    {cartItem?.find((lis) => lis.id === item.id)?.cartQuantity >
                    0 ? (
                      <div className="incDecBar">
                        <span
                          className="dec"
                          onClick={() => {
                            const cartData = {
                              id: item.id,
                              foodImage: item.foodImage,
                              orderUserId: user?.uid,
                              foodName: item.foodName,
                              category: type,
                              foodPrice: item.offer
                                ? item?.offerFoodPrice
                                : item?.foodPrice,
                              shopId: item.shopId,
                              shopName: shopData.shopName,
                              shopImage: shopData.shopImage,
                              shopLocation: shopData.shopLocation,
                            };

                            decCart(cartData);
                          }}
                        >
                          -
                        </span>
                        <span className="quantity">
                          {
                            cartItem?.find((lis) => lis.id === item.id)
                              ?.cartQuantity
                          }
                        </span>

                        <span
                          className="inc"
                          onClick={() => {
                            const cartData = {
                              id: item.id,
                              foodImage: item.foodImage,
                              orderUserId: user?.uid,
                              foodName: item.foodName,
                              category: type,
                              foodPrice: item.offer
                                ? item?.offerFoodPrice
                                : item?.foodPrice,
                              shopId: item.shopId,
                              shopName: shopData.shopName,
                              shopImage: shopData.shopImage,
                              shopLocation: shopData.shopLocation,
                            };

                            incCart(cartData);
                          }}
                        >
                          +
                        </span>
                      </div>
                    ) : (
                      <p
                        onClick={() => {
                          const cartData = {
                            id: item.id,
                            foodImage: item.foodImage,
                            orderUserId: user?.uid,
                            foodName: item.foodName,
                            category: type,
                            foodPrice: item.offer
                              ? item?.offerFoodPrice
                              : item?.foodPrice,
                            shopId: item.shopId,
                            shopName: shopData.shopName,
                            shopImage: shopData.shopImage,
                            shopLocation: shopData.shopLocation,
                          };

                          addToCart(cartData);
                          setTempDataC(cartData);
                        }}
                      >
                        Add
                      </p>
                    )}
                  </div>
                </div>
              </div>
              <div className="foodLine"></div>
              {checkHotels && (
                <CheckHotel
                  setCheckHotel={setCheckHotel}
                  item={item}
                  shopData={shopData}
                  tempDataC={tempDataC}
                />
              )}
            </div>
          ))}
        </div>
      ) : (
        <div className="notFounds">
          <img src={notFounds} alt="Not founds" />
        </div>
      )}
      <div className="hide2">
        <CartItem />
      </div>
    </section>
  );
};

export default FoodList;
