import React, { useEffect } from "react";
import "../../styles/Navbar.css";
import { NavLink } from "react-router-dom";
import { useAuthContext } from "../../store/authContext";
import { ImProfile } from "react-icons/im";
import { FaUser } from "react-icons/fa";
import { MdOutlineHotelClass, MdAdminPanelSettings } from "react-icons/md";
import { GoSearch } from "react-icons/go";
import { useSelector, useDispatch } from "react-redux";
import { selectCartItem } from "../../store/cartSlice";

const Navbar = () => {
  const { user } = useAuthContext();
  const CartItem = useSelector(selectCartItem);
  const dispatch = useDispatch();

  const CurrentUserCart = CartItem.filter(
    (item) => item.orderUserId === user.uid
  );
  const CurrenUserItem = CurrentUserCart.map((order) => order.cartQuantity);
  const total = CurrenUserItem?.reduce((acc, curr) => {
    return +acc + +curr;
  }, 0);

  let active = {
    color: "rgb(253, 171, 17)",
    fontSize: "1.05rem",
  };

  let notActive = {
    color: "#393e46",
    fontSize: "1rem",
  };

  return (
    <header>
      <nav>
        <div className="logo">
          <NavLink to="/">
            <h1>Graze</h1>
          </NavLink>
        </div>

        <div className="navLinks">
          {user.email === process.env.REACT_APP_ADMIN_ID && (
            <NavLink
              to="/admin/dashboard"
              className="navLink"
              style={({ isActive }) => (isActive ? active : notActive)}
            >
              <MdAdminPanelSettings className="navIcon" />
              Admin
            </NavLink>
          )}

          <NavLink
            to="/search"
            className="navLink"
            style={({ isActive }) => (isActive ? active : notActive)}
          >
            <GoSearch className="navIcon" />
            Search
          </NavLink>

          <NavLink
            to="/offers"
            className="navLink"
            style={({ isActive }) => (isActive ? active : notActive)}
          >
            <MdOutlineHotelClass className="navIcon" />
            Offers
          </NavLink>

          {!user.isLoggedIn ? (
            <NavLink
              to="/login"
              className="navLink"
              style={({ isActive }) => (isActive ? active : notActive)}
            >
              <FaUser className="navIcon" />
              Sign In
            </NavLink>
          ) : (
            <NavLink
              to="/profile/order-history"
              className="navLink"
              style={({ isActive }) => (isActive ? active : notActive)}
            >
              <ImProfile className="navIcon" />
              Profile
            </NavLink>
          )}

          <NavLink
            to="/cart"
            className="navLink"
            style={({ isActive }) => (isActive ? active : notActive)}
          >
            <span className="cartNav">{total}</span>
            Cart
          </NavLink>
        </div>
      </nav>
    </header>
  );
};

export default Navbar;
