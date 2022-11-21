import React, { useEffect, useState } from "react";
import "../styles/HotelHome.css";
import { useParams } from "react-router-dom";
import useFetchCollection from "../hooks/useFetchCollection";
import useFetchUser from "../hooks/useFetchUser";
import Loader from "../components/UI/Loader";
import Card from "../components/UI/Card";
import { BiFoodTag } from "react-icons/bi";
import { TiLockOpen, TiLockClosed } from "react-icons/ti";
import FoodList from "../components/FoodList";
import ShopHomeAction from "../components/ShopHomeAction";
import HotelFooter from "../components/layout/HotelFooter";

const HotelHomePage = () => {
  const { id } = useParams();
  const [search, setSearch] = useState("");

  const { data, getCollection } = useFetchCollection("food");
  const { userData: shopData, loading } = useFetchUser("shop", id);

  const uniqueFood = data?.filter((unique) => unique.shopId === id);
  const avaPrice = uniqueFood?.map((avg) => avg.foodPrice);

  const total = avaPrice?.reduce((acc, curr) => {
    return +acc + +curr;
  }, 0);

  useEffect(() => {
    getCollection();
  }, []);

  if (loading) return <Loader />;

  return (
    <section className="shopHomeBar">
      <div
        style={{
          backgroundColor: "#282c3f",
          position: "relative",
        }}
      >
        <Card>
          <div className="shopHomeWrap">
            <div className="shopImage">
              <img src={shopData?.shopImage} alt={shopData?.shopName} />
            </div>

            <div className="shopHomeInfo">
              <div className="wrapHomeName">
                <h1>{shopData?.shopName}</h1>
                <p>{shopData?.shopCategory}</p>
                <span>{shopData?.shopLocation}</span>
              </div>

              <div className="aboutShop">
                <div className="shopHomeVeg">
                  <BiFoodTag
                    className={shopData?.shopTypeVeg ? "veg" : "nonVeg"}
                  />
                  {shopData?.shopTypeVeg ? "Veg" : "Non-Veg"}
                </div>

                <div className="shopHomeVegs">
                  <div className="wrapShopAbout">
                    <p>
                      <TiLockOpen />
                      {shopData?.shopOpen}
                    </p>
                    <span>open</span>
                  </div>

                  <div className="wrapShopAbout">
                    <p>
                      <TiLockClosed />
                      {shopData?.shopClose}
                    </p>
                    <span>close</span>
                  </div>
                </div>

                <div className="shopHomeVegss">
                  ${(total / uniqueFood?.length)?.toFixed(2)}
                  <p>Avg Food Price</p>
                </div>
              </div>
              <ShopHomeAction
                search={search}
                setSearch={setSearch}
                shop={shopData}
                shopId={id}
              />
            </div>
          </div>
        </Card>
      </div>

      <Card>
        <FoodList
          food={uniqueFood.filter((food) =>
            food.foodName?.toLowerCase()?.includes(search?.toLowerCase())
          )}
          type={shopData?.shopTypeVeg}
          shopData={shopData}
          shopId={id}
        />
      </Card>
      <HotelFooter shopData={shopData} />
    </section>
  );
};

export default HotelHomePage;
