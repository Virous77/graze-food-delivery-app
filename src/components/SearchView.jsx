import React from "react";
import { BiSearch } from "react-icons/bi";
import { GrFormClose } from "react-icons/gr";

const SearchView = ({ search, setSearch, place }) => {
  return (
    <div className="searchView">
      <BiSearch className="viewIcon" />
      <input
        type="text"
        placeholder={place}
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />

      {search.length > 0 && (
        <GrFormClose className="viewIcon" onClick={() => setSearch("")} />
      )}
    </div>
  );
};

export default SearchView;
