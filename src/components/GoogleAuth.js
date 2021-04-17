import React, { useEffect, useContext } from "react";
import history from "../history";
import { GeneralContext } from "../contexts/General";

const GoogleAuth = () => {
  const { state, setState } = useContext(GeneralContext);

  console.log("Sign in Page Auth State at Start " + state.authStatus);

  const onAuthChange = () => {
    const auth = window.gapi.auth2.getAuthInstance();
    setState({ authStatus: auth.isSignedIn.get() });
  };

  // Check auth status initally
  useEffect(() => {
    window.gapi.load("client:auth2", () => {
      window.gapi.client
        .init({
          clientId:
            "320808104510-qjdjiooodidc8jm1i000oteqc7h63029.apps.googleusercontent.com",
          scope: "https://www.googleapis.com/auth/books",
        })
        .then(() => {
          const auth = window.gapi.auth2.getAuthInstance();
          //setState({ authStatus: auth.isSignedIn.get() });
          console.log(auth.isSignedIn.get());
          auth.isSignedIn.listen(onAuthChange);
        });
    });
  }, []);

  const onClick = () => {
    const auth = window.gapi.auth2.getAuthInstance();
    auth.signIn();
    //setState({ authStatus: auth.isSignedIn.get() });
  };

  // Proceed to next page if user Signs into Google
  const proceed = () => {
    console.log(state.authStatus);
    //Verify sign in
    if (state.authStatus === true) {
      //console.log("I am signed in");
      history.push("/home");
    }
  };

  // Runs after state updates
  useEffect(() => {
    proceed();
  }, [state.authStatus]);

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
