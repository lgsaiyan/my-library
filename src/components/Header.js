import React, { useContext, useEffect } from "react";
import { Link } from "react-router-dom";
import SearchBar from "./SearchBar";
import { GeneralContext } from "../contexts/General";
import history from "../history";

const Header = () => {
  const { state } = useContext(GeneralContext);

  const onClick = () => {
    if (state.authStatus === true) {
      const auth = window.gapi.auth2.getAuthInstance();
      auth.signOut();
      //auth.isSignedIn.listen(onAuthChange);
      console.log(
        "Auth State in HEADER right after sign out click: " + state.authStatus
      );
    } else {
      history.push("/");
    }
  };

  // const exit = () => {
  //   if (state.authStatus === false) {
  //     console.log("I tried to exit");
  //     history.push("/");
  //   }
  // };

  // Runs after user is signed out in google auth
  useEffect(() => {
    if (state.authStatus === false) {
      console.log("I tried to exit");
      history.push("/");
    }
  }, [state.authStatus]);

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

        <div className="Sign-out btn sign-out__btn" onClick={onClick}>
          Sign out
        </div>
      </header>
    </React.Fragment>
  );
};

export default Header;
