import React, { useEffect, useState } from "react";
import useFetchCollection from "../../hooks/useFetchCollection";
import SearchView from "../../components/SearchView";
import { toast } from "react-toastify";
import { deleteDoc, doc } from "firebase/firestore";
import { db } from "../../firebase/firebase.config";

const ViewShop = () => {
  const [search, setSearch] = useState("");
  const { data, loading, getCollection } = useFetchCollection("shop");

  useEffect(() => {
    getCollection();
  }, []);

  const deleteShop = async (e) => {
    try {
      if (window.confirm("Are you sure wanna Delete??")) {
        await deleteDoc(doc(db, "shop", e));
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
          place={"Search Shop"}
        />
      </div>

      <div className="viewShopList">
        <div className="topConta">
          <p>#</p>
          <p>Shop Info</p>
          <p>Action</p>
        </div>

        <div className="bottomConta">
          {data
            ?.filter((s) =>
              s.shopName.toLowerCase().includes(search.toLowerCase())
            )
            .map((shop, idx) => (
              <div className="viewShopLists" key={idx}>
                <p>{idx + 1}</p>
                <div className="viewShopInfo">
                  <img src={shop.shopImage} alt="" />
                  <div>
                    <p>{shop.shopName}</p>
                    <span>{shop.shopLocation}</span>
                  </div>
                </div>

                <div className="bShopAction">
                  <button onClick={() => deleteShop(shop.id)}>Delete</button>
                </div>
              </div>
            ))}
        </div>
      </div>
    </section>
  );
};

export default ViewShop;
