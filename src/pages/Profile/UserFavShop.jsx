import React from "react";
import useFetchBookmark from "../../hooks/useFetchBookmark";
import Loader from "../../components/UI/Loader";
import { useAuthContext } from "../../store/authContext";
import { BiFoodTag } from "react-icons/bi";
import { MdLocationOn } from "react-icons/md";
import "../../styles/UserFav.css";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import { deleteDoc, doc } from "firebase/firestore";
import { db } from "../../firebase/firebase.config";
import bookmarkImg from "../../images/bookmark.svg";
import { HiOutlineStar } from "react-icons/hi";

const UserFavShop = () => {
  const { user } = useAuthContext();
  const { data, loading } = useFetchBookmark(user.uid, "bookmark");

  const removeBookmark = async (e) => {
    try {
      await deleteDoc(doc(db, "bookmark", e));
    } catch (error) {
      toast.error("Something went wrong, Try again");
    }
  };

  if (loading) return <Loader />;

  return (
    <>
      {data?.length > 0 ? (
        <section className="userBookmarkBar">
          {data.map((shop) => (
            <div className="contentList" key={shop.shopId}>
              <Link to={`/${shop.shopName}/${shop.shopId}`}>
                <div className="contentImage stop">
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
                          shop.rates / shop.ratesCount > 3 ? "rates" : "rate"
                        }
                      >
                        <HiOutlineStar />
                        {shop.rates / shop.ratesCount}
                      </span>
                    ) : (
                      <span>
                        <HiOutlineStar />
                        --
                      </span>
                    )}
                  </div>
                </div>
              </Link>

              <div className="removes">
                <p onClick={() => removeBookmark(shop.id)}>Remove</p>
              </div>
            </div>
          ))}
        </section>
      ) : (
        <div className="noBookmark">
          <img src={bookmarkImg} alt="no bookmark" />
          <h3>No Favourite found</h3>
          <p>Add Your Favourite Restaurants for quick ordering! </p>
        </div>
      )}
    </>
  );
};

export default UserFavShop;
