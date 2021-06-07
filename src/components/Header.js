import React, { useContext } from "react";
import { Link } from "react-router-dom";
import SearchBar from "./SearchBar";
import { GeneralContext } from "../contexts/General";
import history from "../history";

const Header = () => {
  const { state, setState } = useContext(GeneralContext);

  // const onAuthChange = () => {
  //   console.log("onAuthChange activated");
  //   // console.log("GoogleAuth Unmounted");
  //   // const auth = window.gapi.auth2.getAuthInstance();
  //   // window.removeEventListener(onAuthChange(), auth.isSignedIn.listen());
  //   history.push("/");
  // };

  // useEffect(() => {
  //   const auth = window.gapi.auth2.getAuthInstance();
  //   auth.isSignedIn.listen(onAuthChange);
  //   console.log("Listender mounted in HEADER.");
  // }, []);

  const onClick = () => {
    if (state.authStatus === true) {
      const auth = window.gapi.auth2.getAuthInstance();
      auth.signOut();
      setState({ userBooks: null });
      // auth.isSignedIn.listen(onAuthChange);
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
  // useEffect(() => {
  //   console.log("state at beginining of home: " + state.authStatus);
  //   if (state.authStatus === false) {
  //     console.log("I tried to exit");
  //     history.push("/");
  //   }
  // }, []);

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
