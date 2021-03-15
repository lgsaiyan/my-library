import React from "react";
import { Router, Route, Switch } from "react-router-dom";
import history from "./history";
import SignIn from "./containers/SignIn";
import Home from "./containers/Home";
import Search from "./containers/Search";
import Detail from "./containers/Detail";
import { SearchProvider } from "./contexts/Search";

function App() {
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
