import React, { lazy } from "react";
import { Route, Switch } from "react-router-dom";
import { AnimatePresence } from "framer-motion";

const CoinDetail = lazy(() => import("../pages/CoinDetail"));
const CoinList = lazy(() => import("../pages/CoinList"));

const coinRoutes = [
  <Route key="detail" path="/coins/coin" component={CoinDetail} />,
  <Route key="list" path="/coins" component={CoinList} />,
];

// Place it in a wrapper for animations
export default [
  <Route key="coins" path="/coins">
    <AnimatePresence exitBeforeEnter>
      <Switch>{coinRoutes}</Switch>
    </AnimatePresence>
  </Route>,
];
