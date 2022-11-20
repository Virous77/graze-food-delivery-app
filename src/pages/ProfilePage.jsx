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
import { MdOutlineFavorite } from "react-icons/md";
import { BsFillHandbagFill } from "react-icons/bs";
import { FaRegAddressCard } from "react-icons/fa";
import userGuy from "../images/user.svg";

const ProfilePage = () => {
  const { user, setUser, userData, fetchLoading } = useAuthContext();
  const [showEdit, setShowEdit] = useState(false);

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
              to="/profile/Favourites"
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
          </div>
          <div className="adminContent">
            <Routes>
              <Route path="order-history" element={<OrderHistory />} />
              <Route path="address-home" element={<UserAddressHome />} />
              <Route path="Favourites" element={<UserFavShop />} />
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
    </section>
  );
};

export default ProfilePage;
