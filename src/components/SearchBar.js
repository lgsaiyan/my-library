import React from "react";

const SearchBar = () => {
  return (
    <React.Fragment>
      <div className="search-bar">
        <input
          type="text"
          className="search-bar__input"
          placeholder="Search for books here..."
        />
        <button className="search-bar__btn">
          <img
            className="search-bar__icon"
            src="img/svg/search.svg"
            alt="mag-glass"
          ></img>
        </button>
      </div>
    </React.Fragment>
  );
};

export default SearchBar;
