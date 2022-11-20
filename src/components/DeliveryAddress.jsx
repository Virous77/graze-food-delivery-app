import React, { useState } from "react";
import "../styles/DeliveryAddress.css";
import { IoCloseSharp } from "react-icons/io5";
import { BiHomeSmile } from "react-icons/bi";
import { MdWork, MdOutlineShareLocation } from "react-icons/md";
import Address from "./Address";
import { toast } from "react-toastify";
import { useAuthContext } from "../store/authContext";
import { addDoc, collection, serverTimestamp } from "firebase/firestore";
import { db } from "../firebase/firebase.config";
import useFetchAddress from "../hooks/useFetchAddress";
import Loader from "../components/UI/Loader";
import CheckoutPayment from "./CheckoutPayment";
import { RiSecurePaymentLine } from "react-icons/ri";
import { IoIosCheckmarkCircle } from "react-icons/io";

const DeliveryAddress = ({ setThankYou }) => {
  const [showNewAdd, setShowNewAdd] = useState(false);
  const [goPayment, setGoPayment] = useState(true);
  const [tempAdd, setTempAdd] = useState("");
  const { user } = useAuthContext();
  const {
    data,
    loading: addLoading,
    getCollection,
  } = useFetchAddress(user.uid, "userAddress");

  const initialState = {
    address: "",
    flat: "",
    landmark: "",
    otherAdd: "",
    type: "",
    active: false,
    loading: false,
  };
  const [addData, setAddData] = useState(initialState);
  const { address, flat, landmark, otherAdd, type, loading } = addData;

  const handleChange = (e) => {
    const { name, value } = e.target;
    setAddData({ ...addData, [name]: value });
  };

  const handlerAddData = async () => {
    setAddData({ ...addData, loading: true });

    if (!addData || !flat || !landmark) {
      setAddData({ ...addData, loading: false });
      toast.error("All fields must be filled");
      return;
    }

    const tempData = {
      address: address,
      flat: flat,
      landmark: landmark,
      userAddressId: user.uid,
      createdAt: serverTimestamp(),
      otherAdd: otherAdd || null,
      type: type || null,
    };

    try {
      await addDoc(collection(db, "userAddress"), tempData);
      setAddData({ ...addData, loading: false });
      getCollection();
      setShowNewAdd(false);
      setAddData(initialState);
    } catch (error) {
      setAddData({ ...addData, loading: false });
      toast.error("Something went wrong, Try again!");
    }
  };

  const goPaymentAction = (e) => {
    setTempAdd(e);
    setGoPayment(false);
  };

  if (addLoading) return <Loader />;

  return (
    <>
      {goPayment ? (
        <section className="deliveryAddBar">
          <div className={`outlineBar ${goPayment ? "activePay" : ""}`}>
            <MdOutlineShareLocation className="outline" />
          </div>

          {showNewAdd && (
            <div className="overLay" onClick={() => setShowNewAdd(false)}></div>
          )}
          {showNewAdd && (
            <div className="newAdd">
              <div className="newAddHead">
                <IoCloseSharp
                  className="newAddClose"
                  onClick={() => setShowNewAdd(false)}
                />
                <h3>Save delivery address</h3>
              </div>

              <div className="addNewInput">
                <input
                  type="text"
                  placeholder="Address"
                  name="address"
                  value={addData.address}
                  onChange={handleChange}
                />
              </div>

              <div className="addNewInputTwo">
                <div className="inputAddWrap">
                  <input
                    type="text"
                    placeholder="Door / Flat no."
                    name="flat"
                    value={addData.flat}
                    onChange={handleChange}
                  />

                  <input
                    type="text"
                    placeholder="Landmark"
                    name="landmark"
                    value={addData.landmark}
                    onChange={handleChange}
                  />
                </div>

                <div className="addNewAction">
                  {!addData.active ? (
                    <div className="addNewActionWrap">
                      <div
                        className={`homeAdd ${
                          addData.type === "home" ? "addActive" : ""
                        }`}
                        onClick={() => setAddData({ ...addData, type: "home" })}
                      >
                        <BiHomeSmile />
                        <span>Home</span>
                      </div>

                      <div
                        className={`homeAdd ${
                          addData.type === "work" ? "addActive" : ""
                        }`}
                        onClick={() => setAddData({ ...addData, type: "work" })}
                      >
                        <MdWork />
                        <span>Work</span>
                      </div>
                      <div
                        className="homeAdd five"
                        onClick={() =>
                          setAddData({ ...addData, type: "", active: true })
                        }
                      >
                        <MdOutlineShareLocation />
                        <span>Other</span>
                      </div>
                    </div>
                  ) : (
                    <div className="otherBar">
                      <div className="otherNewAdd">
                        <MdOutlineShareLocation />
                        <span>Other</span>
                      </div>
                      <div className="otherInput">
                        <input
                          type="text"
                          placeholder="My Dad address"
                          name="otherAdd"
                          value={addData.otherAdd}
                          onChange={handleChange}
                        />
                      </div>

                      <div className="otherClose">
                        <span
                          onClick={() =>
                            setAddData({ ...addData, active: false })
                          }
                        >
                          Cancel
                        </span>
                      </div>
                    </div>
                  )}
                </div>
              </div>

              <div className="newAddButton">
                <button onClick={handlerAddData}>
                  {loading ? "SAVING ADDRESS.." : "Save Address"}
                </button>
              </div>
            </div>
          )}

          <div className="userAddressBar">
            <div className="userAddHead">
              <h3>Choose a delivery address </h3>
              <p>Multiple addresses in this location</p>
            </div>

            <Address
              setShowNewAdd={setShowNewAdd}
              data={data}
              goPaymentAction={goPaymentAction}
            />
          </div>
        </section>
      ) : (
        <div className="doneAddBar">
          <div
            className={`outlineBar ${goPayment ? "activePay" : ""}`}
            onClick={() => setGoPayment(true)}
          >
            <MdOutlineShareLocation className="outline" />
          </div>

          <div className="doneAdd">
            <div className="doneHead">
              <div className="doneFirst">
                <h4>Delivery Address</h4>
                <IoIosCheckmarkCircle className="checkmarkIcon" />
              </div>

              <div className="doneChange">
                <p onClick={() => setGoPayment(true)}>CHANGE</p>
              </div>
            </div>

            <div className="doneGoAdd">
              <h3>{tempAdd?.type || tempAdd?.otherAdd}</h3>
              <p>
                {tempAdd?.flat} {tempAdd?.address} {tempAdd?.landmark}
              </p>

              <span>32 Minutes</span>
            </div>
          </div>
        </div>
      )}

      {goPayment ? (
        <div className="paymentEmpty">
          <h4>Payment</h4>

          <div className={`secureBar ${!goPayment ? "activePay" : ""}`}>
            <RiSecurePaymentLine className="secure" />
          </div>
        </div>
      ) : (
        <div className="paymentAcBar">
          <div className={`secureBars ${!goPayment ? "activePay" : ""}`}>
            <RiSecurePaymentLine className="secure" />
          </div>
          <CheckoutPayment tempAdd={tempAdd} setThankYou={setThankYou} />
        </div>
      )}
    </>
  );
};

export default DeliveryAddress;
