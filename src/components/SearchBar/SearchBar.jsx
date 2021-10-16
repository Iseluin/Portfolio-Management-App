import React from "react";
import "./SearchBar.css";
import SearchIcon from "@mui/icons-material/Search";

const SearchBar = ({ data }) => {
  return (
    <div className="search">
      <div className="searchInputs">
        <input type="text" placeholder="Search..." />
        <div className="searchIcon">
          <SearchIcon />
        </div>
      </div>
      <div className="searchresults">
          {data.map((value, key) => {
              return <a key={key} href={"_blank"}>
                  <p>{value.name}</p>
              </a>
          })}
      </div>
    </div>
  );
};

export default SearchBar;
