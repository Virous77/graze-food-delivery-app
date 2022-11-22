import React, { useEffect, useState } from "react";
import useFetchCollection from "../../hooks/useFetchCollection";
import SearchView from "../../components/SearchView";
import { toast } from "react-toastify";
import { deleteDoc, doc } from "firebase/firestore";
import { db } from "../../firebase/firebase.config";

const ViewFood = () => {
  const [search, setSearch] = useState("");
  const { data, loading, getCollection } = useFetchCollection("food");

  useEffect(() => {
    getCollection();
  }, []);

  const deleteShop = async (e) => {
    try {
      if (window.confirm("Are you sure wanna Delete??")) {
        await deleteDoc(doc(db, "food", e));
      }
    } catch (error) {
      toast.error("Something went wrong");
    }
  };

  if (loading)
    return (
      <div className="loadingView">
        <p>Loading...</p>
      </div>
    );

  return (
    <section className="viewShopBar">
      <div className="searchShop">
        <SearchView
          search={search}
          setSearch={setSearch}
          place={"Search Food"}
        />
      </div>

      <div className="viewShopList">
        <div className="topConta">
          <p>#</p>
          <p>Food Info</p>
          <p>Action</p>
        </div>

        <div className="bottomConta">
          {data
            ?.filter((s) =>
              s.foodName.toLowerCase().includes(search.toLowerCase())
            )
            .map((food, idx) => (
              <div className="viewShopLists" key={idx}>
                <p>{idx + 1}</p>
                <div className="viewShopInfo">
                  <img src={food.foodImage} alt="" />
                  <div>
                    <p>{food.foodName}</p>
                    <span>${food.foodPrice}</span>
                  </div>
                </div>

                <div className="bShopAction">
                  <button onClick={() => deleteShop(food.id)}>Delete</button>
                </div>
              </div>
            ))}
        </div>
      </div>
    </section>
  );
};

export default ViewFood;
