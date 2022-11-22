import React, { useEffect, useState } from "react";
import useFetchCollection from "../../hooks/useFetchCollection";
import Yes from "../../images/Yes.svg";
import OrderDeatils from "../../components/OrderDeatils";

const ViewOrder = () => {
  const { data, loading, getCollection } = useFetchCollection("orders");
  const [tempData, setTempData] = useState("");
  const [showDetials, setShowDetails] = useState(false);

  useEffect(() => {
    getCollection();
  }, []);

  const viewOrderDetails = (e) => {
    setShowDetails(true);
    setTempData(e);
  };

  if (loading)
    return (
      <div className="loadingView">
        <p>Loading...</p>
      </div>
    );

  return (
    <section className="viewShopBar">
      <div className="viewShopList">
        <div className="topConta">
          <p>#</p>
          <p>Order Info</p>
          <p>Action</p>
        </div>

        <div className="bottomConta">
          {data?.map((food, idx) => (
            <div className="viewShopLists" key={idx}>
              <p>{idx + 1}</p>
              <div className="viewShopInfo">
                <img src={Yes} alt="" />
                <div>
                  <p>{food.userEmail?.substring(0, 10)}...</p>
                  <span>{food.orderDate}</span>
                </div>
              </div>

              <div className="bShopAction">
                <button onClick={() => viewOrderDetails(food)}>Details</button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {showDetials && (
        <OrderDeatils tempData={tempData} setShowDetails={setShowDetails} />
      )}
    </section>
  );
};

export default ViewOrder;
