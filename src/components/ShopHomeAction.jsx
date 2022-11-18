import React from "react";
import { GrFormClose } from "react-icons/gr";
import { BiSearch } from "react-icons/bi";
import { FaRegHeart, FaHeart } from "react-icons/fa";
import "../styles/ShopHomeAction.css";
import { useAuthContext } from "../store/authContext";
import { toast } from "react-toastify";
import {
  addDoc,
  collection,
  deleteDoc,
  doc,
  serverTimestamp,
} from "firebase/firestore";
import { db } from "../firebase/firebase.config";
import useFetchBookmark from "../hooks/useFetchBookmark";

const ShopHomeAction = ({ search, setSearch, shop, shopId: sId }) => {
  const { user } = useAuthContext();
  const { data } = useFetchBookmark(user.uid, "bookmark");
  const uniqueBookmark = data?.find((shop) => shop.shopId === sId);

  const saveBookMark = async (e) => {
    if (uniqueBookmark) {
      await deleteDoc(doc(db, "bookmark", uniqueBookmark.id));
      return;
    }

    const tempData = {
      userBookMarkId: user.uid,
      createdAt: serverTimestamp(),
      shopCategory: e.shopCategory,
      shopImage: e.shopImage,
      shopLocation: e.shopLocation,
      shopType: e.shopTypeVeg,
      shopName: e.shopName,
      shopId: sId,
    };

    try {
      await addDoc(collection(db, "bookmark"), tempData);
    } catch (error) {
      toast.error("Something went wrong, Try again!");
    }
  };

  return (
    <div className="shopActionBar">
      <div className="search">
        <BiSearch className="searchIcon" />
        <input
          type="text"
          placeholder="Search for Dishes"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
        <GrFormClose
          className={`searchClose ${search !== "" ? "showSearch" : ""}`}
          onClick={() => setSearch("")}
        />
      </div>
      {uniqueBookmark?.shopId === sId ? (
        <div className="shopBookmark">
          <FaHeart className="bookmarkIconF" onClick={() => saveBookMark()} />
          Favourited
        </div>
      ) : (
        <div className="shopBookmark">
          <FaRegHeart
            className="bookmarkIcon"
            onClick={() => saveBookMark(shop)}
          />
          Favourite
        </div>
      )}
    </div>
  );
};

export default ShopHomeAction;
