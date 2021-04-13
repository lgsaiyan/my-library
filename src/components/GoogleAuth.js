import React, { useState, useEffect } from "react";
import history from "../history";

const GoogleAuth = () => {
  const [isSignedIn, setIsSignedIn] = useState(null);
  console.log("Use state is " + isSignedIn);

  const onAuthChange = () => {
    const auth = window.gapi.auth2.getAuthInstance();
    setIsSignedIn(auth.isSignedIn.get());
  };

  // Check auth status
  useEffect(() => {
    window.gapi.load("client:auth2", () => {
      window.gapi.client
        .init({
          clientId:
            "320808104510-qjdjiooodidc8jm1i000oteqc7h63029.apps.googleusercontent.com",
          scope: "email",
        })
        .then(() => {
          const auth = window.gapi.auth2.getAuthInstance();
          setIsSignedIn(auth.isSignedIn.get());
          console.log(auth.isSignedIn.get());
          auth.isSignedIn.listen(onAuthChange);
          console.log(".then init");
        });
    });
  }, []);

  const onClick = () => {
    //Make async function????
    console.log("I am clicked");
    const auth = window.gapi.auth2.getAuthInstance();
    auth.signIn();
    setIsSignedIn(auth.isSignedIn.get());
    console.log(auth.isSignedIn.get());
    console.log("State should be changed now");
  };

  // Proceed to next page if user Signs into Google
  const proceed = () => {
    console.log(isSignedIn);
    //Verify sign in
    if (isSignedIn === true) {
      console.log("I am signed in");
      history.push("/home");
    }
  };

  // Runs after state updates
  useEffect(() => {
    proceed();
  }, [isSignedIn]);

  return (
    <React.Fragment>
      <div to="/" className="login btn" onClick={onClick}>
        Sign-in with Google
        <svg className="google__svg">
          <use xlinkHref="img/sprite.svg#icon-google"></use>
        </svg>
      </div>
    </React.Fragment>
  );
};

export default GoogleAuth;
