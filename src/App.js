import React, { useContext, useEffect } from "react";
import { Router, Route, Switch } from "react-router-dom";
import history from "./history";
import SignIn from "./containers/SignIn";
import Home from "./containers/Home";
import Search from "./containers/Search";
import Detail from "./containers/Detail";
import { SearchProvider } from "./contexts/Search";
import { GeneralContext } from "./contexts/General";

function App() {
  const { state, setState } = useContext(GeneralContext);

  // Update context state on GAPI auth status change
  const onAuthChange = () => {
    const auth = window.gapi.auth2.getAuthInstance();
    setState({ authStatus: auth.isSignedIn.get() });
    console.log("onAuthChange activated in APP");

    if (auth.isSignedIn.get() === true) {
      const token = auth.currentUser.fe.qc.access_token;
      setState({ accessToken: token });
    }
  };

  // Determine location based on auth status
  const determineLocation = () => {
    const location = history.location.pathname;
    switch (state.authStatus) {
      case true:
        switch (location) {
          case "/":
            history.push("/home");
            break;
          case "/home":
            console.log("i'm doin nothin'");
            break;
          default:
            break;
        }
        break;
      case false:
        switch (location) {
          case "/":
            console.log("i'm doin nothin'");
            break;
          default:
            history.push("/");
            break;
        }
        break;
      case "guest":
        break;
      default:
        break;
    }
  };

  determineLocation();

  // After context state updates, proceed based on auth status and location check
  useEffect(() => {
    determineLocation();
  }, [state.authStatus]);

  // Check auth status at start and set landing page
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
          console.log("Event listender mounted");
          auth.isSignedIn.listen(onAuthChange);
        });
    });
  }, []);

  return (
    <React.Fragment>
      <Router history={history}>
        <Switch>
          <SearchProvider>
            <Route path="/" exact component={SignIn} />
            <Route path="/home" exact component={Home} />
            <Route path="/search" exact component={Search} />
            <Route path="/detail" exact component={Detail} />
          </SearchProvider>
        </Switch>
      </Router>
    </React.Fragment>
  );
}

export default App;
