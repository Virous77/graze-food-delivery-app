import React, { useState } from "react";
import { useAuthContext } from "../../store/authContext";
import useFetchAddress from "../../hooks/useFetchAddress";
import { MdOutlineShareLocation, MdWork } from "react-icons/md";
import { BiHomeSmile } from "react-icons/bi";
import { toast } from "react-toastify";
import { deleteDoc, doc } from "firebase/firestore";
import { db } from "../../firebase/firebase.config";
import EditAddress from "../../components/EditAddress";
import addressImg from "../../images/address.svg";

const UserAddressHome = () => {
  const { user } = useAuthContext();
  const { data, loading } = useFetchAddress(user.uid, "userAddress");
  const [showNewAdd, setShowNewAdd] = useState(false);
  const [tempData, setTempData] = useState("");

  const deleteAdd = async (e) => {
    try {
      await deleteDoc(doc(db, "userAddress", e));
    } catch (error) {
      toast.error("Something went wrong, Try again");
    }
  };

  if (loading)
    return (
      <div className="loadingView">
        <p>Loading...</p>
      </div>
    );

  return (
    <>
      {data.length > 0 ? (
        <section className="userAddHome">
          {data.map((add, idx) => {
            const { flat, address, landmark, otherAdd, type } = add;

            return (
              <div className="userNewAdd" key={idx}>
                <div className="addnewLogo">
                  <h3>
                    {type ? (
                      type === "home" ? (
                        <BiHomeSmile />
                      ) : (
                        <MdWork />
                      )
                    ) : (
                      <MdOutlineShareLocation />
                    )}
                  </h3>
                </div>

                <div className="userAddData">
                  <div className="addDataWrap">
                    <h3>
                      {type ? (type === "home" ? "Home" : "Work") : otherAdd}
                    </h3>
                    <p>
                      {flat}, {address}, {landmark}
                    </p>
                  </div>

                  <div className="showAddBa">
                    <button
                      onClick={() => {
                        setShowNewAdd(true);
                        setTempData(add);
                      }}
                    >
                      EDIT
                    </button>
                    <button onClick={() => deleteAdd(add.id)}>DELETE</button>
                  </div>
                </div>
              </div>
            );
          })}
        </section>
      ) : (
        <div className="noBookmark">
          <img src={addressImg} alt="no address" />
          <h3>No Address added yet</h3>
          <p>Add some food, Go to Cart then add Address!!!</p>
        </div>
      )}
      <EditAddress
        showNewAdd={showNewAdd}
        setShowNewAdd={setShowNewAdd}
        tempData={tempData}
      />
    </>
  );
};

export default UserAddressHome;
