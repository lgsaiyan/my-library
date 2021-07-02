import React, { useContext, useEffect } from "react";
import { Router, Switch } from "react-router-dom";
import history from "./history";
import { SearchProvider } from "./contexts/Search";
import { GeneralContext } from "./contexts/General";
import { determineLocationPath, initGoogleAuth } from "./api";
import { Routes } from "./Routes";
import { HOME_LOCATION, GUEST_STATUS } from './constants';


/**
  *Renders app component 
  */
const App = () => {
  const { state, setState } = useContext(GeneralContext);
  const location = history.location.pathname;

  /**
   * Checks whether authentication is required then retrieves the auth status.
   */
  const onAuthChange = () => {
    if (location === HOME_LOCATION && state.authStatus === GUEST_STATUS) {
      return;
    }

    const auth = window.gapi.auth2.getAuthInstance();
    let token = null;
    if (auth.isSignedIn.get() === true) {
      token = auth.currentUser.ee.mc.access_token;
    }

    setState({ authStatus: auth.isSignedIn.get(), accessToken: token });
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
    let newLocation = determineLocationPath(state.authStatus, location);
    if (newLocation !== location) {
      history.push(newLocation);
    }
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
