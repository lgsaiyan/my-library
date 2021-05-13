import React, { useContext, useEffect, useState } from "react";
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
  const [loaded, setLoaded] = useState(false);
  const location = history.location.pathname;

  // Update context state on GAPI auth status change
  const onAuthChange = () => {
    if (location === "/home" && state.authStatus === "guest") {
      console.log(
        "won't reload and change authstatus as the guest on home page"
      );
    } else {
      const auth = window.gapi.auth2.getAuthInstance();
      setState({ authStatus: auth.isSignedIn.get() });
      console.log("onAuthChange activated in APP");

      if (auth.isSignedIn.get() === true) {
        const token = auth.currentUser.fe.qc.access_token;
        setState({ accessToken: token });
        console.log("I have the token");
      }
    }
  };

  // Determine location based on auth status
  const determineLocation = () => {
    console.log(state.authStatus);
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
      case "guest":
        //history.push("/home"); <-- this happens at Link component
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
      // case "guest":
      //   //history.push("/home"); <-- this happens at Link component
      //   break;
      default:
        console.log("Default break activated");
        break;
    }
  };

  determineLocation();

  // After context state updates, proceed based on auth status and location check
  useEffect(() => {
    determineLocation();
    if (loaded === true) {
      onAuthChange();
    }
  }, [state.authStatus, loaded]);

  // Check auth status at start
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
          setLoaded(true);
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
