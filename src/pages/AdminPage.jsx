import React, { useState } from "react";
import "../styles/Admin.css";
import { useAuthContext } from "../store/authContext";
import Loader from "../components/UI/Loader";
import Card from "../components/UI/Card";
import EditProfile from "../components/profile/EditProfile";
import AddNewFoodPage from "./AddNewFoodPage";
import ViewAllFoodData from "./ViewAllFoodData";
import AddFoodPage from "./AddFoodPage";
import { NavLink, Route, Routes } from "react-router-dom";
import AdminDashboard from "./AdminDashboard";
import {
  MdDashboardCustomize,
  MdTableView,
  MdOutlineFastfood,
} from "react-icons/md";
import { BsShop } from "react-icons/bs";

const AdminPage = () => {
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
              src={userData.photoURL}
              referrerPolicy="noreferrer"
              alt={userData.name}
            />
            <div>
              <h1>{userData.name}</h1>
              <p>{userData.email}</p>
            </div>
          </div>

          <div className="editAdmin" onClick={() => setShowEdit(true)}>
            Edit Profile
          </div>
        </div>

        <div className="AdminLinks">
          <div className="adminNav">
            <NavLink
              to="/admin/"
              className="navLink"
              style={({ isActive }) => (isActive ? active : notActive)}
            >
              <MdDashboardCustomize className="navIcon" />
              Dashboard
            </NavLink>

            <NavLink
              to="/admin/add-shop"
              className="navLink"
              style={({ isActive }) => (isActive ? active : notActive)}
            >
              <BsShop className="navIcon" />
              Add Shop
            </NavLink>

            <NavLink
              to="/admin/add-food"
              className="navLink"
              style={({ isActive }) => (isActive ? active : notActive)}
            >
              <MdOutlineFastfood className="navIcon" />
              Add Food
            </NavLink>

            <NavLink
              to="/admin/view-food"
              className="navLink"
              style={({ isActive }) => (isActive ? active : notActive)}
            >
              <MdTableView className="navIcon" />
              View FoodList
            </NavLink>
          </div>
          <div className="adminContent">
            <Routes>
              <Route index element={<AdminDashboard />} />
              <Route path="add-shop" element={<AddNewFoodPage />} />
              <Route path="add-food" element={<AddFoodPage />} />
              <Route path="view-food" element={<ViewAllFoodData />} />
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

export default AdminPage;
