import React, { useContext, useEffect } from "react";
import { Router, Switch } from "react-router-dom";
import history from "./history";
import { SearchProvider } from "./contexts/Search";
import { GeneralContext } from "./contexts/General";
import { determineLocationPath, initGoogleAuth } from "./api";
import { Routes } from "./Routes";

/**
  *Renders app component 
  */
const App = () => {
  const { state, setState } = useContext(GeneralContext);
  const location = history.location.pathname;

  const onAuthChange = () => {
    if (location === "/home" && state.authStatus === "guest") {
    } else {
      const auth = window.gapi.auth2.getAuthInstance();

      let token = null;
      if (auth.isSignedIn.get() === true) {
        token = auth.currentUser.ee.mc.access_token;
      }

      setState({ authStatus: auth.isSignedIn.get(), accessToken: token });
    }
  };

  const determineLocation = (authStatus) => {
    let newLocation = determineLocationPath(authStatus, location);
    if (newLocation !== location) {
      history.push(newLocation);
    }
  };

  const init = async () => {
    const auth = await initGoogleAuth();
    auth.isSignedIn.listen(onAuthChange);
    onAuthChange();
  };

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
