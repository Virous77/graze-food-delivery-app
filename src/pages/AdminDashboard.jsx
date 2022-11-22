import React, { useEffect } from "react";
import Loader from "../components/UI/Loader";
import useFetchCollection from "../hooks/useFetchCollection";
import "../styles/DashBoard.css";
import { BsShop } from "react-icons/bs";
import { BiFoodMenu } from "react-icons/bi";
import { MdOutlineBorderColor } from "react-icons/md";

const AdminDashboard = () => {
  const {
    data: shop,
    loading,
    getCollection: getCollectionShop,
  } = useFetchCollection("shop");
  const { data: food, getCollection: getCollectionFood } =
    useFetchCollection("food");
  const { data: order, getCollection: getCollectionOrder } =
    useFetchCollection("orders");

  useEffect(() => {
    getCollectionShop();
    getCollectionFood();
    getCollectionOrder();
  }, []);

  if (loading) return <Loader />;

  return (
    <section className="adminDashboard">
      <div className="shopCount">
        <BsShop className="dashIcon dashS" />
        <div className="dash">
          <p>{shop?.length}</p>
          <span>Shops Listed on Graze</span>
        </div>
      </div>

      <div className="foodCount">
        <BiFoodMenu className="dashIcon dashF" />
        <div className="dash">
          <p>{food?.length}</p>
          <span>Foods on Graze</span>
        </div>
      </div>

      <div className="orderCount">
        <MdOutlineBorderColor className="dashIcon dashO" />

        <div className="dash">
          <p>{order?.length}</p>
          <span>Order placed on Graze</span>
        </div>
      </div>
    </section>
  );
};

export default AdminDashboard;
