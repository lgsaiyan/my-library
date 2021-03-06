import React from "react";
import { Link } from "react-router-dom";
import SearchBar from "./SearchBar";

const Header = () => {
  return (
    <React.Fragment>
      <header className="header">
        <Link to="/home" className="logo">
          <svg className="logo__svg">
            <use xlinkHref="img/sprite.svg#icon-books"></use>
          </svg>
          myLibrary
        </Link>
        <SearchBar />

        <Link to="/" className="Sign-out btn sign-out__btn">
          Sign-out
        </Link>
      </header>
    </React.Fragment>
  );
};

export default Header;
