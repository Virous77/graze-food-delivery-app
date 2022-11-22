import React, { useState } from "react";
import "../../styles/Navbar.css";
import { NavLink, Link } from "react-router-dom";
import { useAuthContext } from "../../store/authContext";
import { ImProfile } from "react-icons/im";
import { FaUser } from "react-icons/fa";
import { MdOutlineHotelClass, MdAdminPanelSettings } from "react-icons/md";
import { GoSearch } from "react-icons/go";
import { useSelector } from "react-redux";
import { selectCartItem } from "../../store/cartSlice";
import PopUp from "./PopUp";
import { TbMenu } from "react-icons/tb";

const Navbar = ({ setShowMobile }) => {
  const { user, logout } = useAuthContext();
  const CartItem = useSelector(selectCartItem);
  const [show, setShow] = useState(false);
  const path = window.location.pathname;

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
      <nav onMouseLeave={() => setShow(false)}>
        <div className="logo">
          <NavLink to="/">
            <h1>Graze</h1>
          </NavLink>
        </div>

        <div className="navLinks">
          <div className="navLinks  hideMainNav">
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
                onMouseEnter={() => {
                  setTimeout(() => {
                    setShow(true);
                  }, 400);
                }}
                onClick={() => setShow(false)}
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

          <Link to="/cart" className="navLinkss  hideNav">
            <span className="cartNav">{total}</span>
            Cart
          </Link>

          <div className="mobileMenu">
            <TbMenu className="menuIcon" onClick={() => setShowMobile(true)} />
          </div>
        </div>

        {show && path === "/" && <PopUp setShow={setShow} logout={logout} />}
      </nav>
    </header>
  );
};

export default Navbar;
