import React from "react";
import { MdOutlineShareLocation, MdWork } from "react-icons/md";
import { BiHomeSmile } from "react-icons/bi";

const Address = ({ setShowNewAdd, data, goPaymentAction }) => {
  return (
    <div className="userAddBar">
      <div className="userNewAdd">
        <div className="addnewLogo">
          <MdOutlineShareLocation className="addNewIcon" />
          <p>+</p>
        </div>

        <div className="userAddData">
          <div className="addDataWrap">
            <h3>Add new Address</h3>
            <p>
              J58F+W6H, Ashok Rajpath Rd, Sudhitola, Tripolia, Mumbai, India
            </p>
          </div>

          <div className="six">
            <button onClick={() => setShowNewAdd(true)}>ADD NEW</button>
          </div>
        </div>
      </div>

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
                <h3>{type ? (type === "home" ? "Home" : "Work") : otherAdd}</h3>
                <p>
                  {flat} {address} {landmark}
                </p>
              </div>

              <div className="showAddBar">
                <button onClick={() => goPaymentAction(add)}>
                  DELIVER ADDRESS
                </button>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default Address;
