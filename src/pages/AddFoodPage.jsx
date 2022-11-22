import React, { useEffect } from "react";
import { useAdminContext } from "../store/adminContext";
import { FaTrash } from "react-icons/fa";
import { BsCamera } from "react-icons/bs";

const AddFoodPage = () => {
  const {
    foodData,
    setFoodData,
    handleChangeFood,
    addFood,
    isLoading,
    uploadImage,
    imageAsset,
    imageLoad,
    deleteImage,
    getCollection,
  } = useAdminContext();

  useEffect(() => {
    getCollection();
  }, []);

  return (
    <section className="addFoodBar">
      <h1 className="head">Add Food</h1>
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
                    <span>Food Main Image</span>
                  </div>
                ) : (
                  <p>Loading...</p>
                )}
              </div>
            )}
          </div>

          <div className="shopInput">
            <input
              type="text"
              placeholder="Food Name"
              onChange={handleChangeFood}
              name="foodName"
              value={foodData.foodName}
            />
          </div>

          <div className="subShopWrap">
            <div className="shopInput">
              <input
                type="number"
                placeholder="Price"
                onChange={handleChangeFood}
                name="foodPrice"
                value={foodData.foodPrice}
              />
            </div>

            {foodData.offer && (
              <div className="shopInput">
                <input
                  type="number"
                  placeholder="Offer Price"
                  onChange={handleChangeFood}
                  name="offerFoodPrice"
                  value={foodData.offerFoodPrice}
                />
              </div>
            )}
          </div>

          <div className="shopBoolean">
            <button
              className={foodData.offer ? "activeVeg" : "notActiveVeg"}
              name="offer"
              value="true"
              onClick={() => {
                setFoodData({ ...foodData, offer: true });
              }}
            >
              Offer
            </button>
            <button
              className={!foodData.offer ? "activeVeg" : "notActiveVeg"}
              name="offer"
              value="false"
              onClick={() => {
                setFoodData({ ...foodData, offer: false });
              }}
            >
              No Offer
            </button>
          </div>

          <div className="shopInput">
            <textarea
              name="foodDesc"
              cols="30"
              rows="10"
              placeholder="About Food"
              onChange={handleChangeFood}
              value={foodData.foodDesc}
            />
          </div>

          <div className="submitShop">
            <button onClick={addFood}>
              {isLoading ? "Adding Food..." : "Add Food"}
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AddFoodPage;
