import React, { useState } from "react";
import "../../styles/Profile.css";
import { useAuthContext } from "../../store/authContext";
import useFetchOrders from "../../hooks/useFetchOrders";
import Loader from "../../components/UI/Loader";
import order from "../../images/order.svg";
import OrderDeatils from "../../components/OrderDeatils";

const OrderHistory = ({ setTempData: setTemp, setShowReview }) => {
  const { user } = useAuthContext();
  const { data, loading } = useFetchOrders(user.uid, "orders");
  const [showDetails, setShowDetails] = useState(false);
  const [tempData, setTempData] = useState("");

  if (loading) return <Loader />;

  return (
    <section className="orderHistoryBar">
      {data?.length > 0 ? (
        <div className="orderListBar">
          {data?.map((order) => (
            <div className="orderList" key={order.id}>
              <div className="orderShopData">
                <img src={order.userCartItem[0]?.shopImage} alt="Shop Name" />

                <div className="orderShopName">
                  <h3>{order.userCartItem[0]?.shopName}</h3>
                  <p>{order.userCartItem[0]?.shopLocation}</p>
                </div>
              </div>

              <div className="orderMiniInfo">
                <div className="orderId">
                  <p>order id</p>
                  <span>{order.id}</span>
                </div>

                <div className="orderItems">
                  <p>items</p>

                  <div className="itemsName">
                    {order.userCartItem?.slice(0, 3)?.map((shop, idx) => (
                      <div key={idx}>
                        <span>{shop.foodName?.substring(0, 10)}...</span>
                        <span>[{shop.cartQuantity}],</span>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="orderDate">
                  <p>ORDERED ON</p>

                  <span>
                    {order?.orderDate}, {order?.orderTime}
                  </span>
                </div>

                <div className="viewOrder">
                  <button
                    onClick={() => {
                      const cartShop = {
                        shopids: order?.userCartItem[0]?.shopId,
                        shopLocations: order?.userCartItem[0]?.shopLocation,
                        shopNames: order?.userCartItem[0]?.shopName,
                        shopImages: order?.userCartItem[0]?.shopImage,
                      };

                      setTemp(cartShop);
                      setShowReview(true);
                    }}
                  >
                    Review
                  </button>

                  <button
                    onClick={() => {
                      setShowDetails(true);
                      setTempData(order);
                    }}
                  >
                    View Details
                  </button>
                </div>
              </div>
            </div>
          ))}

          {showDetails && (
            <OrderDeatils setShowDetails={setShowDetails} tempData={tempData} />
          )}
        </div>
      ) : (
        <div className="emptyOrder">
          <img src={order} alt="empty order" />
          <h4>No Orders</h4>
          <p>You haven't placed any order yet.</p>
        </div>
      )}
    </section>
  );
};

export default OrderHistory;
