import React, { useState } from "react";
import "../styles/Reviews.css";
import { Rating } from "react-simple-star-rating";
import {
  addDoc,
  collection,
  doc,
  serverTimestamp,
  setDoc,
} from "firebase/firestore";
import { useAuthContext } from "../store/authContext";
import { db } from "../firebase/firebase.config";
import useFetchUser from "../hooks/useFetchUser";

const Reviews = ({ setShowReview, tempData }) => {
  const { user } = useAuthContext();
  const [review, setReview] = useState("");
  const [rate, setRate] = useState(0);
  const { userData } = useFetchUser("shop", tempData.shopids);

  const handleRating = async (e) => {
    e.preventDefault();

    const setData = {
      shopId: tempData.shopids,
      review: review,
      rate: rate,
      createdAt: serverTimestamp(),
      reviewUserId: user.uid,
    };

    const setDataShop = {
      createdAt: userData?.createdAt,
      rates: userData?.rates + rate,
      shopCategory: userData?.shopCategory,
      shopClose: userData?.shopClose,
      shopDesc: userData?.shopDesc,
      shopImage: userData?.shopImage,
      shopLocation: userData?.shopLocation,
      shopName: userData?.shopName,
      shopOpen: userData?.shopOpen,
      shopTypeVeg: userData?.shopTypeVeg,
      shopUserUid: userData?.shopUserUid,
      ratesCount: userData?.ratesCount + 1,
    };

    await addDoc(collection(db, "reviews"), setData);
    await setDoc(doc(db, "shop", tempData.shopids), setDataShop);
    setShowReview(false);
    setRate(0);
    setReview("");
  };

  return (
    <>
      <div className="overLay" onClick={() => setShowReview(false)}></div>
      <section className="reviewsBar">
        <div className="shopReview">
          <img src={tempData.shopImages} alt={tempData.shopNames} />
          <div>
            <p>{tempData.shopNames}</p>
            <span>{tempData.shopLocations}</span>
          </div>
        </div>

        <div className="rating">
          <div className="ratingHead">
            <p>Rating</p>
            <Rating onClick={(e) => setRate(e)} initialValue={rate} />
          </div>
        </div>

        <div className="reviewBox">
          <p>Review</p>

          <form onSubmit={handleRating}>
            <input
              placeholder="Write a Review"
              value={review}
              onChange={(e) => setReview(e.target.value)}
            ></input>

            <button>Submit Rating</button>
          </form>
        </div>
      </section>
    </>
  );
};

export default Reviews;
