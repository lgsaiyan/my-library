import React from "react";
import { Route } from "react-router";
import { Home, Search, Detail, SignIn } from "./containers";

export const Routes = () => {
  return (
    <React.Fragment>
      <Route path="/" exact component={SignIn} />
      <Route path="/home" exact component={Home} />
      <Route path="/search" exact component={Search} />
      <Route path="/detail" exact component={Detail} />
    </React.Fragment>
  );
};
