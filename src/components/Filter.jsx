import React from "react";
import "../styles/Filter.css";
import { BsFilter } from "react-icons/bs";
import { BiSearch } from "react-icons/bi";
import { MdOutlineClose } from "react-icons/md";

const Filter = ({ data, search, setSearch, setShow }) => {
  return (
    <section className="filterBar">
      <div className="filterAction">
        <div className="totalRes hideCounts">
          <h1>{data?.length} restaurants</h1>
        </div>

        <div className="filterSearch">
          <BiSearch className="homeS" />
          <input
            type="text"
            placeholder="Search for restaurants"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
          {search.length > 0 && (
            <MdOutlineClose onClick={() => setSearch("")} className="homeC" />
          )}
        </div>

        <div className="filterIt">
          <BsFilter onClick={() => setShow(true)} className="filterIcon" />
        </div>
      </div>
    </section>
  );
};

export default Filter;
