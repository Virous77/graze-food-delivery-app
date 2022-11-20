import React from "react";
import "../styles/Offer.css";
import useFetchOfferFood from "../hooks/useFetchOfferFood";
import Loader from "../components/UI/Loader";
import Card from "../components/UI/Card";
import { Link } from "react-router-dom";
import { CiPercent } from "react-icons/ci";

const OffersPage = () => {
  const { data, loading } = useFetchOfferFood("food");

  const price = (price, discount) => {
    const fact = ((price - discount) / price) * 100;
    return fact;
  };

  if (loading) return <Loader />;

  return (
    <section className="offerPageBar">
      <Card>
        <div className="offerListBar">
          {data?.map((food) => (
            <Link to={`/${food.shopName}/${food.shopId}`} key={food.id}>
              <div className="offerList">
                <div className="offerImage">
                  <img src={food?.foodImage} alt={food.foodName} />

                  <div className="offerTag">
                    <span>
                      {price(+food.foodPrice, +food.offerFoodPrice)?.toFixed(2)}

                      <b>
                        <CiPercent />
                        OFF
                      </b>
                    </span>
                  </div>
                </div>

                <div className="offerPageInfo">
                  <h2>
                    {food.foodName.length > 30
                      ? `${food.foodName?.substring(0, 30)}...`
                      : food.foodName}
                  </h2>

                  <div className="offerPrice">
                    <p>Net Price</p>
                    <span>${food.foodPrice}</span>
                  </div>

                  <div className="offerPrices">
                    <p>Offer Price</p>
                    <span>${food.offerFoodPrice}</span>
                  </div>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </Card>
    </section>
  );
};

export default OffersPage;
