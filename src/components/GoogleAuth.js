import React from "react";
import { ROOT_LOCATION } from "../constants";

/**
  *Renders google sign in button
  */
const GoogleAuth = () => {
  const onClick = () => {
    const auth = window.gapi.auth2.getAuthInstance();
    auth.signIn();
  };

  return (
    <React.Fragment>
      <div to={ROOT_LOCATION} className="login btn" onClick={onClick}>
        Sign in with Google
        <svg className="google__svg">
          <use xlinkHref="img/sprite.svg#icon-google"></use>
        </svg>
      </div>
    </React.Fragment>
  );
};

export default GoogleAuth;
