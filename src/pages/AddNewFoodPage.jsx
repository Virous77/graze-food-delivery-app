import React from "react";
import { FaTrash } from "react-icons/fa";
import { BsCamera } from "react-icons/bs";
import { useAdminContext } from "../store/adminContext";

import "../styles/AddnewFood.css";

const AddNewFoodPage = () => {
  const {
    shopData,
    setShopData,
    handleChange,
    addShop,
    isLoading,
    uploadImage,
    imageAsset,
    imageLoad,
    deleteImage,
  } = useAdminContext();

  return (
    <section className="addFoodBar">
      <h1 className="head">Add Shop</h1>
      <div className="adminCardss">
        <div className="shopForm">
          <div className="heroImage">
            {imageAsset ? (
              <div className="heroImageSec">
                <img src={imageAsset} alt="shop" />
                <FaTrash className="deleteImg" onClick={deleteImage} />
              </div>
            ) : (
              <div>
                {!imageLoad ? (
                  <div className="addShopImg">
                    <input type="file" onChange={uploadImage} />
                    <BsCamera className="shopCamera" />
                    <span>Shop Main Image</span>
                  </div>
                ) : (
                  <p>Loading...</p>
                )}
              </div>
            )}
          </div>

          <div className="subShopWrap">
            <div className="shopInput">
              <input
                type="text"
                placeholder="Shop Name"
                onChange={handleChange}
                name="shopName"
                value={shopData.shopName}
              />
            </div>

            <div className="shopInput">
              <input
                type="text"
                placeholder="Shop Category"
                onChange={handleChange}
                name="shopCategory"
                value={shopData.shopCategory}
              />
            </div>
          </div>

          <div className="shopInput">
            <input
              type="text"
              placeholder="Shop Location"
              onChange={handleChange}
              name="shopLocation"
              value={shopData.shopLocation}
            />
          </div>

          <div className="shopBoolean">
            <button
              className={shopData.veg ? "activeVeg" : "notActiveVeg"}
              name="veg"
              value="true"
              onClick={() => {
                setShopData({ ...shopData, veg: true });
              }}
            >
              Veg
            </button>
            <button
              className={!shopData.veg ? "activeVeg" : "notActiveVeg"}
              name="veg"
              value="false"
              onClick={() => {
                setShopData({ ...shopData, veg: false });
              }}
            >
              Non Veg
            </button>
          </div>

          <div className="subShopWrap">
            <div className="shopInput">
              <input
                type="text"
                placeholder="Open Time"
                onChange={handleChange}
                name="shopOpen"
                value={shopData.shopOpen}
              />
            </div>

            <div className="shopInput">
              <input
                type="text"
                placeholder="Close Time"
                onChange={handleChange}
                name="shopClose"
                value={shopData.shopClose}
              />
            </div>
          </div>

          <div className="shopInput">
            <textarea
              name="shopDesc"
              cols="30"
              rows="10"
              placeholder="About Shop"
              onChange={handleChange}
              value={shopData.shopDesc}
            />
          </div>

          <div className="submitShop">
            <button onClick={addShop}>
              {isLoading ? "Adding Shop..." : "Add Shop"}
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AddNewFoodPage;
