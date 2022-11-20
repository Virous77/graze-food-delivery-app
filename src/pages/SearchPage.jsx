import React, { useState } from "react";
import "../styles/Search.css";
import { BiSearch } from "react-icons/bi";
import { MdOutlineClose } from "react-icons/md";

const SearchPage = () => {
  const [search, setSearch] = useState("");

  return (
    <section className="searchBar">
      <div className="searchInputBar">
        <div className="searchInput">
          <input
            type="text"
            placeholder="Search for restaurants and food"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
          {search.length > 0 ? (
            <MdOutlineClose
              onClick={() => setSearch("")}
              className="searchIt"
            />
          ) : (
            <BiSearch />
          )}
        </div>
      </div>
    </section>
  );
};

export default SearchPage;
