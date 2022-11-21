import React from "react";
import "../../styles/Footer.css";
import { HiOutlineStar } from "react-icons/hi";

const HotelFooter = ({ shopData }) => {
  return (
    <footer className="hotelFooter">
      <div className="hotelFootCard">
        <div className="hotelFootLogo">
          <h1>{shopData.shopName}</h1>
          {shopData.rates / shopData.ratesCount > 0 && (
            <span
              className={
                shopData.rates / shopData.ratesCount > 3 ? "ratess" : "ratee"
              }
            >
              <HiOutlineStar />
              {shopData.rates / shopData.ratesCount}
            </span>
          )}
        </div>

        <div className="hotelFootDesc">
          <p>{shopData.shopDesc}</p>
        </div>

        <div className="listed">
          <p>Listed on GRAZE</p>
          <span>{new Date(shopData.createdAt?.toDate())?.toDateString()}</span>
        </div>
      </div>
    </footer>
  );
};

export default HotelFooter;
