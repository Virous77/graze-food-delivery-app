import React from "react";
import "../../styles/Navbar.css";
import { Link } from "react-router-dom";
import { useAuthContext } from "../../store/authContext";
import { ImProfile } from "react-icons/im";
import { BiHomeSmile } from "react-icons/bi";
import { FaUser } from "react-icons/fa";
import {
  MdOutlineHotelClass,
  MdAdminPanelSettings,
  MdOutlineLogout,
} from "react-icons/md";
import { GoSearch } from "react-icons/go";
import { useSelector } from "react-redux";
import { selectCartItem } from "../../store/cartSlice";
import { AiOutlineClose } from "react-icons/ai";

const MobileNavbar = ({ setShowMobile }) => {
  const { user, logout } = useAuthContext();
  const CartItem = useSelector(selectCartItem);

  const CurrentUserCart = CartItem.filter(
    (item) => item.orderUserId === user.uid
  );
  const CurrenUserItem = CurrentUserCart.map((order) => order.cartQuantity);
  const total = CurrenUserItem?.reduce((acc, curr) => {
    return +acc + +curr;
  }, 0);

  const close = () => {
    setShowMobile(false);
  };

  return (
    <>
      <div className="overLay" onClick={() => setShowMobile(false)}></div>
      <section className="MobileMenuBar">
        <div className="mobileHead">
          <AiOutlineClose onClick={() => close()} className="closeMobile" />
          <Link to="/">
            <h1 onClick={() => close()}>Graze</h1>
          </Link>
        </div>

        <div className="lineMobile">
          <Link to="/" className="mobileLink" onClick={() => close()}>
            <BiHomeSmile className="navIcon" />
            Home
          </Link>

          {user.email === process.env.REACT_APP_ADMIN_ID && (
            <Link
              to="/admin/dashboard"
              className="mobileLink"
              onClick={() => close()}
            >
              <MdAdminPanelSettings className="navIcon" />
              Admin
            </Link>
          )}

          <Link to="/search" className="mobileLink" onClick={() => close()}>
            <GoSearch className="navIcon" />
            Search
          </Link>

          <Link to="/offers" className="mobileLink" onClick={() => close()}>
            <MdOutlineHotelClass className="navIcon" />
            Offers
          </Link>

          {user.isLoggedIn ? (
            <Link
              to="/profile/order-history"
              className="mobileLink"
              onClick={() => close()}
            >
              <ImProfile className="navIcon" />
              Profile
            </Link>
          ) : (
            <Link to="/login" className="mobileLink" onClick={() => close()}>
              <FaUser className="navIcon" />
              Login
            </Link>
          )}

          {user.isLoggedIn && (
            <p
              onClick={() => {
                close();
                logout();
              }}
            >
              <MdOutlineLogout />
              Logout
            </p>
          )}
        </div>
      </section>
    </>
  );
};

export default MobileNavbar;
