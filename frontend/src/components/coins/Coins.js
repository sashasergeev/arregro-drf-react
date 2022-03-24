import React, { lazy } from "react";

const CoinList = lazy(() => import("./CoinList"));
const CoinDetail = lazy(() => import("./CoinDetail"));

import { Route, Switch } from "react-router-dom";
import { AnimatePresence } from "framer-motion";

const Coins = (props) => {
  return (
    <div>
      <AnimatePresence exitBeforeEnter>
        <Switch location={props.location} key={props.location.search}>
          <Route
            key="list"
            exact
            path={props.match.url + "/coin"}
            component={CoinDetail}
          />
          <Route
            key="detail"
            exact
            path={props.match.url + "/"}
            component={CoinList}
          />
        </Switch>
      </AnimatePresence>
    </div>
  );
};

export default Coins;
