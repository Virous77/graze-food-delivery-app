import React, { useEffect, useState } from "react";
import useFetchCollection from "../hooks/useFetchCollection";
import Loader from "../components/UI/Loader";
import Card from "../components/UI/Card";
import { BiFoodTag } from "react-icons/bi";
import "../styles/Home.css";
import { MdLocationOn } from "react-icons/md";
import { GiButterflyFlower } from "react-icons/gi";
import { Link } from "react-router-dom";

const HomePage = () => {
  const { data, loading, getCollection } = useFetchCollection("shop");
  const { data: foodData, getCollection: getCollectionFood } =
    useFetchCollection("food");

  const [quickData, setQuickData] = useState([]);

  const fetchQuickData = (e) => {
    const uniqueFoodData = foodData.filter((unique) => unique.shopId === e);
    setQuickData(uniqueFoodData);
  };

  useEffect(() => {
    getCollection();
    getCollectionFood();
  }, []);

  if (loading) return <Loader />;

  return (
    <section className="homeBar">
      <Card>
        <div className="homeCard">
          <div className="filterSection"></div>

          <div className="homeContent">
            {data.map((shop) => (
              <div
                className="contentList"
                key={shop.id}
                onMouseEnter={() => {
                  fetchQuickData(shop.id);
                }}
              >
                <div className="contentImage">
                  <img src={shop.shopImage} alt={shop.shopName} />
                </div>
                <div className="shopInfo">
                  <h1>{shop.shopName}</h1>
                  <span>
                    <BiFoodTag
                      className={shop.shopTypeVeg ? "veg" : "nonVeg"}
                    />
                    {shop.shopCategory}
                  </span>

                  <p>
                    <MdLocationOn />
                    {shop.shopLocation}
                  </p>

                  <div className="contentLine hide"></div>
                </div>

                <div className="cool hide"></div>

                {quickData.length > 0 && (
                  <div className="overViewPage hide">
                    <div className="wrapOverView">
                      <div className="rightConta">
                        <h1>MENU</h1>

                        <div className="head">
                          <GiButterflyFlower />
                          <GiButterflyFlower />
                        </div>

                        <div className="quickFoodBar">
                          {quickData?.slice(0, 6)?.map((data) => (
                            <div className="quickFoodList" key={data.id}>
                              <div className="quickImg">
                                <img src={data.foodImage} alt="" />
                              </div>
                              <p>{data.foodName?.substring(0, 14)}...</p>
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>

                    <div className="quick">
                      <Link to={`/${shop.shopName}/${shop.id}`}>
                        <button>{shop.shopName} Home</button>
                      </Link>
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </Card>
    </section>
  );
};

export default HomePage;
