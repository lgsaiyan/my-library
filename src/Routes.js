import React from "react";
import { Route } from "react-router";
import { DETAIL_LOCATION, HOME_LOCATION, ROOT_LOCATION, SEARCH_LOCATION } from "./constants";
import { Home, Search, Detail, SignIn } from "./containers";

export const Routes = () => {
  return (
    <React.Fragment>
      <Route path={ROOT_LOCATION} exact component={SignIn} />
      <Route path={HOME_LOCATION} exact component={Home} />
      <Route path={SEARCH_LOCATION} exact component={Search} />
      <Route path={DETAIL_LOCATION} exact component={Detail} />
    </React.Fragment>
  );
};
