import React, { Suspense } from "react";
import { HashRouter as Router, Switch } from "react-router-dom";

import appRoutes from "./routes";
import useAuthorization from "./hooks/useAuthorization";

import Header from "./components/header/Header";
import Loading from "./components/LoadingScreen";

export const App = () => {
  // hook just to hide unneeded init auth logic
  useAuthorization();

  return (
    <>
      <Router>
        <Header />
        <div className="container">
          <Suspense fallback={<Loading />}>
            <Switch>{appRoutes}</Switch>
          </Suspense>
        </div>
      </Router>
    </>
  );
};

export default App;
