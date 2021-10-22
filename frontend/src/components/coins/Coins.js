import React, { Component } from "react";
import { CoinList } from "./CoinList";
import { CoinDetail } from "./CoinDetail";
import { Route, Switch } from "react-router-dom";
import { AnimatePresence } from "framer-motion";
import PropTypes from "prop-types";

export class Coins extends Component {
  render() {
    const { location, token, isAuth, ...rest } = this.props;
    return (
      <div>
        <AnimatePresence exitBeforeEnter>
          <Switch location={location} key={location.search}>
            <Route
              exact
              path={this.props.match.url + "/coin"}
              component={(props) => (
                <CoinDetail {...rest} token={token} isAuth={isAuth} />
              )}
            />
            <Route
              exact
              path={this.props.match.url + "/"}
              component={() => <CoinList isAuth={isAuth} token={token} />}
            />
          </Switch>
        </AnimatePresence>
      </div>
    );
  }
}

// Coins.propTypes = {
//   isAuth: PropTypes.bool,
//   token: PropTypes.string,
// };

export default Coins;
