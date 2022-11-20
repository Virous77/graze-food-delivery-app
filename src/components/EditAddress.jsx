import React, { useState } from "react";
import { IoCloseSharp } from "react-icons/io5";
import { BiHomeSmile } from "react-icons/bi";
import { MdWork, MdOutlineShareLocation } from "react-icons/md";
import { doc, serverTimestamp, setDoc } from "firebase/firestore";
import { toast } from "react-toastify";
import { async } from "@firebase/util";
import { db } from "../firebase/firebase.config";

const EditAddress = ({ showNewAdd, setShowNewAdd, tempData }) => {
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
  const [focus, setFocus] = useState({
    add: false,
    fla: false,
    land: false,
    othe: false,
  });
  const { address, flat, landmark, otherAdd, type, loading } = addData;

  const handleChange = (e) => {
    const { name, value } = e.target;
    setAddData({ ...addData, [name]: value });
  };

  const handlerAddData = async () => {
    setAddData({ ...addData, loading: true });

    const tempDatas = {
      address: address || tempData.address,
      flat: flat || tempData.flat,
      landmark: landmark || tempData.landmark,
      userAddressId: tempData.userAddressId,
      createdAt: tempData.createdAt,
      editedAt: serverTimestamp(),
      otherAdd: otherAdd || tempData.otherAdd,
      type: type || tempData.type,
    };

    try {
      await setDoc(doc(db, "userAddress", tempData.id), tempDatas);
      setAddData({ ...addData, loading: false });
      setShowNewAdd(false);
      setAddData(initialState);
    } catch (error) {
      setAddData({ ...addData, loading: false });
      toast.error("Something went wrong, Try again");
    }

    console.log(tempDatas);
  };

  return (
    <section className="deliveryAddBars">
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
            <h3>Edit delivery address</h3>
          </div>

          <div className="addNewInput">
            <input
              type="text"
              placeholder="Address"
              name="address"
              value={focus.add ? addData.address : tempData.address}
              onChange={handleChange}
              onFocus={() => setFocus({ ...focus, add: true })}
            />
          </div>

          <div className="addNewInputTwo">
            <div className="inputAddWrap">
              <input
                type="text"
                placeholder="Door / Flat no."
                name="flat"
                value={focus.fla ? addData.flat : tempData.flat}
                onChange={handleChange}
                onFocus={() => setFocus({ ...focus, fla: true })}
              />

              <input
                type="text"
                placeholder="Landmark"
                name="landmark"
                value={focus.land ? addData.landmark : tempData.landmark}
                onChange={handleChange}
                onFocus={() => setFocus({ ...focus, land: true })}
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
                      value={focus.othe ? addData.otherAdd : tempData.otherAdd}
                      onChange={handleChange}
                      onFocus={() => setFocus({ ...focus, land: true })}
                    />
                  </div>

                  <div className="otherClose">
                    <span
                      onClick={() => setAddData({ ...addData, active: false })}
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
              {loading ? "SAVING ADDRESS.." : "Save edit Address"}
            </button>
          </div>
        </div>
      )}
    </section>
  );
};

export default EditAddress;
