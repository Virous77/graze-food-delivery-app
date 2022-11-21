import React, { useState, useEffect } from "react";
import "../styles/Search.css";
import { BiSearch } from "react-icons/bi";
import { MdOutlineClose } from "react-icons/md";
import useFetchCollection from "../hooks/useFetchCollection";
import Loader from "../components/UI/Loader";
import { CiPercent } from "react-icons/ci";
import { Link } from "react-router-dom";
import empty from "../images/empty.svg";

const SearchPage = () => {
  const [search, setSearch] = useState("");
  const [foods, setFood] = useState([]);
  const { data, loading, getCollection } = useFetchCollection("food");

  const getData = () => {
    const searchData = data.filter((food) =>
      food.foodName?.toLowerCase()?.includes(search?.toLowerCase())
    );
    setFood(searchData);
    if (search?.trim().length === 0) {
      setFood([]);
    }
  };

  const price = (price, discount) => {
    const fact = ((price - discount) / price) * 100;
    return fact;
  };

  useEffect(() => {
    getData();
    getCollection();
  }, [search]);

  if (loading) return <Loader />;

  return (
    <section className="searchBar">
      <div className="searchInputBar">
        <div className="searchInput">
          <input
            type="text"
            placeholder="Search for food"
            value={search}
            autoFocus
            onChange={(e) => setSearch(e.target.value)}
          />
          {search.length > 0 ? (
            <MdOutlineClose
              onClick={() => setSearch("")}
              className="searchIt"
            />
          ) : (
            <BiSearch />
          )}
        </div>
      </div>

      {foods.length > 0 ? (
        <div className="searchDataBar">
          <div className="searchListBar">
            {foods?.map((food) => (
              <Link to={`/${food.shopName}/${food.shopId}`} key={food.id}>
                <div className="offerList">
                  <div className="offerImage">
                    <img src={food?.foodImage} alt={food.foodName} />

                    {food.offer && (
                      <div className="offerTag">
                        <span>
                          {price(
                            +food.foodPrice,
                            +food.offerFoodPrice
                          )?.toFixed(2)}

                          <b>
                            <CiPercent />
                            OFF
                          </b>
                        </span>
                      </div>
                    )}
                  </div>

                  <div className="searchPageInfo">
                    <h2>
                      {food.foodName.length > 20
                        ? `${food.foodName?.substring(0, 20)}...`
                        : food.foodName}
                    </h2>

                    <div className="offerPrice">
                      <p>Net Price</p>
                      <span>${food.foodPrice}</span>
                    </div>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      ) : (
        <div className="searchEmpty">
          <img src={empty} alt="empty" />
        </div>
      )}
    </section>
  );
};

export default SearchPage;
