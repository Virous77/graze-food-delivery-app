import React, { useEffect, useState } from "react";
import {
  PaymentElement,
  useStripe,
  useElements,
} from "@stripe/react-stripe-js";
import { toast } from "react-toastify";
import { collection, addDoc, Timestamp } from "firebase/firestore";
import { db } from "../firebase/firebase.config";
import { useAuthContext } from "../store/authContext";

const CheckoutForm = ({ userCartItem, total, tempAdd, setThankYou }) => {
  const stripe = useStripe();
  const elements = useElements();
  const { user } = useAuthContext();

  const [message, setMessage] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  const shippingAdd = {
    flat: tempAdd.flat,
    address: tempAdd.address,
    landmark: tempAdd.landmark,
  };

  useEffect(() => {
    if (!stripe) {
      return;
    }

    const clientSecret = new URLSearchParams(window.location.search).get(
      "payment_intent_client_secret"
    );

    if (!clientSecret) {
      return;
    }
  }, [stripe]);

  const saveOrder = () => {
    const today = new Date();
    const date = today.toDateString();
    const time = today.toLocaleTimeString();

    const orderConfig = {
      userId: user.uid,
      userEmail: user.email,
      orderDate: date,
      orderTime: time,
      orderAmount: total,
      orderStatus: "Order Placed...",
      userCartItem,
      shippingAdd,
      createdAt: Timestamp.now().toDate(),
    };

    try {
      addDoc(collection(db, "orders"), orderConfig);
      setThankYou(true);
    } catch (err) {
      toast.error(err.message);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    setMessage(null);

    if (!stripe || !elements) {
      return;
    }

    setIsLoading(true);

    const confirmPayment = await stripe
      .confirmPayment({
        elements,
        confirmParams: {
          return_url: "http://localhost:3000",
        },

        redirect: "if_required",
      })
      .then((result) => {
        if (result.error) {
          toast.error(result.error.message);
          setMessage(result.error.message);
          return;
        }

        if (result.paymentIntent) {
          if (result.paymentIntent.status === "succeeded") {
            setIsLoading(false);
            toast.success("Payment Successful");
            saveOrder();
          }
        }
      });

    setIsLoading(false);
  };

  return (
    <section className="paymentBar">
      <div className="payment">
        <form onSubmit={handleSubmit}>
          <div className="paymentAction">
            <h3>Stripe Payment</h3>
            <PaymentElement id="payment-element" />
            <div className="doPay">
              <button disabled={isLoading || !stripe || !elements} id="submit">
                <span id="button-text">
                  {isLoading ? (
                    <div className="spinner" id="spinner">
                      <p>Processing...</p>
                    </div>
                  ) : (
                    "Pay now"
                  )}
                </span>
              </button>
            </div>

            {/* Show any error or success messages */}
            {message && <div id="payment-message">{message}</div>}
          </div>
        </form>
      </div>
    </section>
  );
};

export default CheckoutForm;
