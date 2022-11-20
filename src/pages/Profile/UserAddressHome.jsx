import React, { useState } from "react";
import { useAuthContext } from "../../store/authContext";
import useFetchAddress from "../../hooks/useFetchAddress";
import Loader from "../../components/UI/Loader";
import { MdOutlineShareLocation, MdWork } from "react-icons/md";
import { BiHomeSmile } from "react-icons/bi";
import { toast } from "react-toastify";
import { deleteDoc, doc } from "firebase/firestore";
import { db } from "../../firebase/firebase.config";
import EditAddress from "../../components/EditAddress";

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

  if (loading) return <Loader />;

  return (
    <>
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
      <EditAddress
        showNewAdd={showNewAdd}
        setShowNewAdd={setShowNewAdd}
        tempData={tempData}
      />
    </>
  );
};

export default UserAddressHome;
