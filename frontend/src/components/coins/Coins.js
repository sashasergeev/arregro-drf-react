import React from "react";

import { CoinList } from "./CoinList";
import { CoinDetail } from "./CoinDetail";
import { Route, Switch } from "react-router-dom";
import { AnimatePresence } from "framer-motion";
import PropTypes from "prop-types";

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

Coins.propTypes = {
  isAuth: PropTypes.bool,
  token: PropTypes.string,
};

export default Coins;
