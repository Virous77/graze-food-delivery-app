import React, { useEffect, useState } from "react";
import useFetchCollection from "../hooks/useFetchCollection";
import Loader from "../components/UI/Loader";
import Card from "../components/UI/Card";
import { BiFoodTag } from "react-icons/bi";
import "../styles/Home.css";
import { MdLocationOn } from "react-icons/md";
import { GiButterflyFlower } from "react-icons/gi";
import { Link } from "react-router-dom";
import Filter from "../components/Filter";
import FilterBar from "../components/FilterBar";
import { HiOutlineStar } from "react-icons/hi";
import HomeFooter from "../components/layout/HomeFooter";

const HomePage = () => {
  const { data, loading, getCollection } = useFetchCollection("shop");
  const { data: foodData, getCollection: getCollectionFood } =
    useFetchCollection("food");

  const [quickData, setQuickData] = useState([]);
  const [search, setSearch] = useState("");
  const [show, setShow] = useState(false);

  const fetchQuickData = (e) => {
    const uniqueFoodData = foodData.filter((unique) => unique.shopId === e);
    setQuickData(uniqueFoodData);
  };

  const Category = data.map((uniq) => uniq.shopCategory);
  const uniqueCategory = [...new Set(Category)];

  useEffect(() => {
    getCollection();
    getCollectionFood();
  }, []);

  if (loading) return <Loader />;

  return (
    <section className="homeBar">
      <Card>
        <div className="homeCard">
          <div className="filterSection">
            <Filter
              data={data}
              search={search}
              setSearch={setSearch}
              setShow={setShow}
            />
          </div>

          <div className="homeContent">
            {data
              ?.filter(
                (res) =>
                  res.shopName.toLowerCase().includes(search.toLowerCase()) ||
                  res.shopCategory.toLowerCase().includes(search.toLowerCase())
              )
              .map((shop) => (
                <Link to={`/${shop.shopName}/${shop.id}`} key={shop.id}>
                  <div
                    className="contentList"
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

                      <div className="homeRate">
                        {shop.rates > 0 ? (
                          <span
                            className={
                              shop.rates / shop.ratesCount > 3
                                ? "rates"
                                : "rate"
                            }
                          >
                            <HiOutlineStar />
                            {(shop.rates / shop.ratesCount)?.toFixed(2)}
                          </span>
                        ) : (
                          <span>
                            <HiOutlineStar />
                            --
                          </span>
                        )}
                      </div>
                    </div>

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
                </Link>
              ))}
          </div>
        </div>
      </Card>

      {show && (
        <FilterBar
          setShow={setShow}
          Categories={uniqueCategory}
          fill={search}
          setFill={setSearch}
        />
      )}

      <HomeFooter />
    </section>
  );
};

export default HomePage;
