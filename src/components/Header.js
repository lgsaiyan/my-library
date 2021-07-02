import React, { useContext } from "react";
import { Link } from "react-router-dom";
import SearchBar from "./SearchBar";
import { GeneralContext } from "../contexts/General";
import history from "../history";
import { HOME_LOCATION, ROOT_LOCATION } from "../constants";

/**
  *Renders header component 
  */
const Header = () => {
  const { state, setState } = useContext(GeneralContext);

  const onClick = () => {
    if (state.authStatus === true) {
      const auth = window.gapi.auth2.getAuthInstance();
      auth.signOut();
      setState({ userBooks: null });
    } else {
      history.push(ROOT_LOCATION);
    }
  };

  return (
    <React.Fragment>
      <header className="header">
        <Link to={HOME_LOCATION} className="logo">
          <svg className="logo__svg">
            <use xlinkHref="img/sprite.svg#icon-books"></use>
          </svg>
          myLibrary
        </Link>
        <SearchBar />

        <div className="Sign-out btn sign-out__btn" onClick={onClick}>
          Sign out
        </div>
      </header>
    </React.Fragment>
  );
};

export default Header;
