import React from "react";
import { Link } from "react-router-dom";

const SignIn = () => {
  return (
    <React.Fragment>
      <div className="content__sign-in">
        <h1 className="logo__sign-in">
          <svg className="logo__svg">
            <use xlinkHref="img/sprite.svg#icon-books"></use>
          </svg>
          myLibrary
        </h1>

        <Link to="/" className="login btn">
          Sign-in with Google
          <svg className="google__svg">
            <use xlinkHref="img/sprite.svg#icon-google"></use>
          </svg>
        </Link>

        <Link to="/home" className="login btn">
          Continue as guest
          <svg className="guest__svg">
            <use xlinkHref="/img/sprite.svg#icon-user"></use>
          </svg>
        </Link>
      </div>
    </React.Fragment>
  );
};

export default SignIn;
