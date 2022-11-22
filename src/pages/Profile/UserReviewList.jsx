import React from "react";
import "../../styles/Reviews.css";
import review from "../../images/review.svg";
import { useAuthContext } from "../../store/authContext";
import useFetchReviews from "../../hooks/useFetchReviews";
import { Rating } from "react-simple-star-rating";
import { toast } from "react-toastify";
import { deleteDoc, doc } from "firebase/firestore";
import { db } from "../../firebase/firebase.config";

const UserReviewList = () => {
  const { user } = useAuthContext();
  const { data, loading } = useFetchReviews(user.uid, "reviews");

  const reviewDelete = async (e) => {
    try {
      await deleteDoc(doc(db, "reviews", e));
    } catch (error) {
      toast.error("Something went wrong, Try again!");
    }
  };

  if (loading)
    return (
      <div className="loadingView">
        <p>Loading...</p>
      </div>
    );

  return (
    <section className="userRevBar">
      {data?.length > 0 ? (
        <div className="userRevListBar">
          {data?.map((rev) => (
            <div className="revList" key={rev.id}>
              <h2>{rev.review}</h2>

              <div className="revRate">
                <Rating initialValue={rev.rate} readonly={true} size="16" />
              </div>

              <span>{new Date(rev.createdAt?.toDate())?.toDateString()}</span>

              <button onClick={() => reviewDelete(rev.id)}>Delete</button>
            </div>
          ))}
        </div>
      ) : (
        <div className="revEmpty">
          <img src={review} alt="review empty" />
          <p>No Reviews Found</p>
        </div>
      )}
    </section>
  );
};

export default UserReviewList;
