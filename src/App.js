import React, { useContext, useEffect, useState } from "react";
import { Router, Switch } from "react-router-dom";
import history from "./history";
import { SearchProvider } from "./contexts/Search";
import { GeneralContext } from "./contexts/General";
import { determineLocationPath, initGoogleAuth } from "./api";
import { Routes } from "./Routes";

const App = () => {
  const { state, setState } = useContext(GeneralContext);
  const location = history.location.pathname;

  // Update context state on GAPI auth status change
  const onAuthChange = () => {
    if (location === "/home" && state.authStatus === "guest") {
      console.log(
        "won't reload and change authstatus as the guest on home page"
      );
    } else {
      const auth = window.gapi.auth2.getAuthInstance();
      console.log("onAuthChange activated in APP");

      let token = null;
      if (auth.isSignedIn.get() === true) {
        token = auth.currentUser.he.qc.access_token;
        console.log("I have the token");
      }

      setState({ authStatus: auth.isSignedIn.get(), accessToken: token });
    }
  };

  // Determine location based on auth status
  const determineLocation = (authStatus) => {
    console.log("Determining Location: " + authStatus);
    let newLocation = determineLocationPath(authStatus, location);
    if (newLocation !== location) {
      history.push(newLocation);
    }
  };

  // After context state updates, proceed based on auth status and location chec
  const init = async () => {
    const auth = await initGoogleAuth();
    console.log("Event listender mounted");
    auth.isSignedIn.listen(onAuthChange);
    onAuthChange();
  };

  // Check auth status at start
  useEffect(() => {
    init();
  }, []);

  useEffect(() => {
    determineLocation(state.authStatus);
  }, [state.authStatus]);

  return (
    <React.Fragment>
      <Router history={history}>
        <Switch>
          <SearchProvider>
            <Routes />
          </SearchProvider>
        </Switch>
      </Router>
    </React.Fragment>
  );
};

export default App;
