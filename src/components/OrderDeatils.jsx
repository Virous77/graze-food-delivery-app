import React from "react";
import { MdCloseFullscreen } from "react-icons/md";
import { BiFoodTag } from "react-icons/bi";

const OrderDeatils = ({ setShowDetails, tempData }) => {
  return (
    <>
      <div className="overLay" onClick={() => setShowDetails(false)}></div>
      <section className="orderFullBar">
        <div className="orderFullHead">
          <h3>Order Details</h3>

          <MdCloseFullscreen
            className="minimize"
            onClick={() => setShowDetails(false)}
          />
        </div>

        <div className="orderShopData">
          <img src={tempData.userCartItem[0]?.shopImage} alt="Shop Name" />

          <div className="orderShopName">
            <h3>{tempData.userCartItem[0]?.shopName}</h3>
            <p>{tempData.userCartItem[0]?.shopLocation}</p>
          </div>
        </div>

        <div className="yourOrder">
          <h2>Your Order</h2>

          <div className="fullorderItem">
            {tempData.userCartItem?.map((shop, idx) => (
              <div className="categoryfull" key={idx}>
                <BiFoodTag className={shop.category ? "veg" : "nonVeg"} />
                <div className="fullItemName">
                  <div className="eight">
                    <p>{shop.foodName}</p>
                    <span>
                      {shop.cartQuantity} x ${shop.foodPrice}
                    </span>
                  </div>

                  <p>${(shop.foodPrice * shop.cartQuantity)?.toFixed(2)}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="grandTotalBar">
          <div className="cartTotal">
            <p>Item Total</p>
            <span>${tempData.orderAmount}</span>
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
            <p>Grand Total</p>

            <span>${tempData.orderAmount + 2 + 7.5}</span>
          </div>
        </div>

        <div className="fullInfo">
          <h2>Order Details</h2>

          <div className="fuulId">
            <p>Order id</p>

            <span>{tempData.id}</span>
          </div>

          <div className="fuulId">
            <p>payment</p>

            <span>paid : Using Card </span>
          </div>

          <div className="fuulId">
            <p>Date</p>

            <span>
              {tempData.orderDate} {tempData.orderTime}{" "}
            </span>
          </div>

          <div className="fuulId">
            <p>Email</p>

            <span>{tempData.userEmail}</span>
          </div>

          <div className="fuulId">
            <p>Deliver To</p>

            <span>
              {tempData.shippingAdd.flat}

              <b> {tempData.shippingAdd.address}</b>

              <b> {tempData.shippingAdd.landmark}</b>
            </span>
          </div>
        </div>
      </section>
    </>
  );
};

export default OrderDeatils;
