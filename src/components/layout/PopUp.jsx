import React from "react";
import { Link } from "react-router-dom";
import { MdOutlineFavorite, MdOutlineLogout } from "react-icons/md";
import { BsFillHandbagFill } from "react-icons/bs";
import { FaRegAddressCard } from "react-icons/fa";
import { ImProfile } from "react-icons/im";

const PopUp = ({ setShow, logout }) => {
  return (
    <div className={`popUp`} onMouseLeave={() => setShow(false)}>
      <p onClick={() => setShow(false)}>
        <Link to="/profile/order-history">
          <ImProfile />
          Profile
        </Link>
      </p>

      <p onClick={() => setShow(false)}>
        <Link to="/profile/order-history">
          <BsFillHandbagFill />
          Orders
        </Link>
      </p>

      <p onClick={() => setShow(false)}>
        <Link to="/profile/address-home">
          <FaRegAddressCard />
          Address
        </Link>
      </p>

      <p onClick={() => setShow(false)}>
        <Link to="/profile/favourites">
          <MdOutlineFavorite />
          Favourite
        </Link>
      </p>

      <span
        onClick={() => {
          setShow(false);
          logout();
        }}
      >
        <MdOutlineLogout />
        Logout
      </span>
    </div>
  );
};

export default PopUp;
