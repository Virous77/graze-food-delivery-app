import React from "react";
import "../styles/Filter.css";
import { MdOutlineClose } from "react-icons/md";
import { BsCheck } from "react-icons/bs";

const FilterBar = ({ setShow, Categories, fill, setFill }) => {
  return (
    <>
      <div className="overLay" onClick={() => setShow(false)}></div>

      <div className="filterSections">
        <div className="filterCloseHead">
          <MdOutlineClose onClick={() => setShow(false)} className="homeC" />
          <h2>Filters</h2>
        </div>

        <div className="categories">
          <h2>Cuisines</h2>

          <div className="categoryList">
            {Categories.map((cat, idx) => (
              <div className="cate" key={idx}>
                <div className="checkIt">
                  <div
                    className={`schemaCheck ${
                      fill === cat ? "hideFill" : "schemaCheck"
                    }`}
                    id={cat}
                    onClick={(e) => setFill(e.target.id)}
                  ></div>

                  <div
                    className={`checkBar ${
                      fill !== cat ? "hideFill" : "schemaCheck"
                    }`}
                  >
                    <BsCheck
                      className="checkIcon"
                      onClick={() => setFill("")}
                    />
                  </div>
                </div>

                <p>{cat}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  );
};

export default FilterBar;
