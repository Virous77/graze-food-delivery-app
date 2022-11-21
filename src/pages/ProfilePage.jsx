import React, { useState } from "react";
import { NavLink, Route, Routes } from "react-router-dom";
import { useAuthContext } from "../store/authContext";
import Loader from "../components/UI/Loader";
import Card from "../components/UI/Card";
import "../styles/Profile.css";
import EditProfile from "../components/profile/EditProfile";
import OrderHistory from "./Profile/OrderHistory";
import UserFavShop from "./Profile/UserFavShop";
import UserAddressHome from "./Profile/UserAddressHome";
import { MdOutlineFavorite, MdOutlineReviews } from "react-icons/md";
import { BsFillHandbagFill } from "react-icons/bs";
import { FaRegAddressCard } from "react-icons/fa";
import userGuy from "../images/user.svg";
import Reviews from "../components/Reviews";
import UserReviewList from "./Profile/UserReviewList";

const ProfilePage = () => {
  const { user, setUser, userData, fetchLoading } = useAuthContext();
  const [showEdit, setShowEdit] = useState(false);
  const [showReview, setShowReview] = useState(false);
  const [tempData, setTempData] = useState("");

  let active = {
    color: "rgb(253, 171, 17)",
    fontSize: "1.05rem",
    backgroundColor: "white",
  };

  let notActive = {
    color: "#393e46",
    fontSize: "1rem",
    backgroundColor: "whitesmoke",
  };

  if (fetchLoading) return <Loader />;

  return (
    <section className="adminBar">
      <Card>
        <div className="adminHead">
          <div className="adminInfo">
            <img
              src={userData.photoURL || userGuy}
              referrerPolicy="noreferrer"
              alt={userData.name}
            />
            <div>
              <h1>{userData.name}</h1>
              <p>{userData.email}</p>
              <p>{userData.bio || ""}</p>
            </div>
          </div>

          <div className="editAdmin" onClick={() => setShowEdit(true)}>
            Edit Profile
          </div>
        </div>

        <div className="AdminLinks">
          <div className="adminNav">
            <NavLink
              to="/profile/order-history"
              className="navLink"
              style={({ isActive }) => (isActive ? active : notActive)}
            >
              <BsFillHandbagFill className="navIcon" />
              Orders
            </NavLink>

            <NavLink
              to="/profile/favourites"
              className="navLink"
              style={({ isActive }) => (isActive ? active : notActive)}
            >
              <MdOutlineFavorite className="navIcon" />
              Favourites
            </NavLink>

            <NavLink
              to="/profile/address-home"
              className="navLink"
              style={({ isActive }) => (isActive ? active : notActive)}
            >
              <FaRegAddressCard className="navIcon" />
              Addresses
            </NavLink>

            <NavLink
              to="/profile/reviews"
              className="navLink"
              style={({ isActive }) => (isActive ? active : notActive)}
            >
              <MdOutlineReviews className="navIcon" />
              Reviews
            </NavLink>
          </div>

          <div className="adminContent">
            <Routes>
              <Route
                path="order-history"
                element={
                  <OrderHistory
                    setTempData={setTempData}
                    setShowReview={setShowReview}
                  />
                }
              />
              <Route path="address-home" element={<UserAddressHome />} />
              <Route path="favourites" element={<UserFavShop />} />
              <Route path="reviews" element={<UserReviewList />} />
            </Routes>
          </div>
        </div>
      </Card>

      {showEdit && (
        <div className="editProfile">
          <EditProfile
            setShowEdit={setShowEdit}
            user={user}
            setUser={setUser}
          />
        </div>
      )}

      {showReview && (
        <Reviews setShowReview={setShowReview} tempData={tempData} />
      )}
    </section>
  );
};

export default ProfilePage;
