import React, { Suspense } from "react";

import { Route, RouteProps, Switch } from "react-router";
import { BrowserRouter as Router } from "react-router-dom";
import { FillLoader, Nav } from "../components";
import PageNotFound from "../containers/PageNotFound";
import { PUBLIC_ROUTES } from "./routes";

interface RouteType extends RouteProps {
  component: React.FC;
}

const PublicRoute = ({ component: Component, ...rest }: RouteType) => (
  <Route {...rest}>
    <Nav>
      <Suspense fallback={<FillLoader />}>
        <Component />
      </Suspense>
    </Nav>
  </Route>
);

const Navigation = () => (
  <Router>
    <Suspense fallback={<FillLoader />}>
      <Switch>
        {PUBLIC_ROUTES.map((route) => {
          return <PublicRoute key={route.path} {...route} />;
        })}
        <Route render={PageNotFound} />
      </Switch>
    </Suspense>
  </Router>
);

export default Navigation;
