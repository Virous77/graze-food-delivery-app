import React, { useState, useEffect } from "react";
import { loadStripe } from "@stripe/stripe-js";
import { Elements } from "@stripe/react-stripe-js";
import { useSelector } from "react-redux";
import { toast } from "react-toastify";
import { useAuthContext } from "../store/authContext";
import { selectCartItem } from "../store/cartSlice";
import CheckoutForm from "./CheckoutForm";

const stripePromise = loadStripe(process.env.REACT_APP_STRIPE_PUBLIC_KEY);

const CheckoutPayment = ({ tempAdd, setThankYou }) => {
  const [clientSecret, setClientSecret] = useState("");
  const [message, setMessage] = useState("Initializing checkout...");
  const { user } = useAuthContext();

  const cartItem = useSelector(selectCartItem);
  const userCartItem = cartItem?.filter(
    (userCart) => userCart.orderUserId === user.uid
  );
  const CurrenUserItem = userCartItem?.map(
    (order) => order.foodPrice * order.cartQuantity
  );
  const total = CurrenUserItem?.reduce((acc, curr) => {
    return +acc + +curr;
  }, 0);

  const description = `graze: email: ${user?.email}, Ammounts: ${total}`;

  const shippingAdd = {
    line1: "kohara",
    line2: "patna",
    city: "saran",
    country: "united states",
    postal_code: 841205,
    name: "reetesh kumar",
    phone: 8323220747,
  };

  useEffect(() => {
    fetch("https://graze.herokuapp.com/create-payment-intent", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        items: userCartItem,
        userEmail: user.email,
        shipping: shippingAdd,
        description,
      }),
    })
      .then((res) => {
        if (res.ok) {
          return res.json();
        }
        return res.json().then((json) => Promise.reject(json));
      })
      .then((data) => {
        setClientSecret(data.clientSecret);
      })

      .catch((error) => {
        setMessage("failed to initialize checkout");
        toast.error("something went wrong!");
      });
  }, []);

  const appearance = {
    theme: "stripe",
  };
  const options = {
    clientSecret,
    appearance,
  };

  return (
    <>
      <section>
        {!clientSecret && <h3>{message}</h3>}
        <div className="checkForm">
          {clientSecret && (
            <Elements options={options} stripe={stripePromise}>
              <CheckoutForm
                userCartItem={userCartItem}
                total={total}
                tempAdd={tempAdd}
                setThankYou={setThankYou}
              />
            </Elements>
          )}
        </div>
      </section>
    </>
  );
};

export default CheckoutPayment;
