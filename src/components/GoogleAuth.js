import React, { useContext } from "react";
import { GeneralContext } from "../contexts/General";

const GoogleAuth = () => {
  const { state } = useContext(GeneralContext);

  const onClick = () => {
    const auth = window.gapi.auth2.getAuthInstance();
    auth.signIn();
  };

  return (
    <React.Fragment>
      <div to="/" className="login btn" onClick={onClick}>
        Sign in with Google
        <svg className="google__svg">
          <use xlinkHref="img/sprite.svg#icon-google"></use>
        </svg>
      </div>
    </React.Fragment>
  );
};

export default GoogleAuth;
