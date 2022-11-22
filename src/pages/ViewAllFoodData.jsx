import React from "react";
import { Link, Route, Routes } from "react-router-dom";
import ViewFood from "./Admin/ViewFood";
import ViewOrder from "./Admin/ViewOrder";
import ViewShop from "./Admin/ViewShop";
import "../styles/DashBoard.css";

const ViewAllFoodData = () => {
  return (
    <section>
      <div className="viewNav">
        <Link to="/admin/view/shop">
          <p>Shop</p>
        </Link>

        <Link to="/admin/view/food">
          <p>Food</p>
        </Link>

        <Link to="/admin/view/order">
          <p>Order</p>
        </Link>
      </div>

      <Routes>
        <Route path="shop" element={<ViewShop />} />
        <Route path="food" element={<ViewFood />} />
        <Route path="order" element={<ViewOrder />} />
      </Routes>
    </section>
  );
};

export default ViewAllFoodData;
