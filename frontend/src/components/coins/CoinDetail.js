import React, { Component } from "react";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";
import axios from "axios";

// style related
import { motion } from "framer-motion";
import { Grid, Box, Typography, Button } from "@material-ui/core";

import Cards from "../posts/Cards";
import { FetchCoinData } from "../other/FetchCoinData";

export class CoinDetail extends Component {
  constructor(props) {
    super(props);
    this.state = {
      idOfCoin: props.location.search.split("=")[1],
      coinInfo: null,
      follow: false,
    };
    this.followUnfollow = this.followUnfollow.bind(this);
  }
  componentDidMount() {
    this.getCoinDetails();
  }

  getCoinDetails() {
    let idOfCoin = this.state.idOfCoin;
    const { isAuth, token } = this.props;
    FetchCoinData(`api/coins/${idOfCoin}`, isAuth, token, idOfCoin).then(
      (res) => {
        this.setState({
          coinInfo: res.coinInfo,
          follow: isAuth ? res.follow : undefined,
        });
      }
    );
  }

  followUnfollow() {
    const { follow } = this.state;
    let data = {
      coin_id: this.state.idOfCoin,
      action: follow ? "unfollow" : "follow",
    };
    axios
      .post("api/coins/following/", data, {
        headers: { Authorization: `Token ${this.props.token}` },
      })
      .then((res) => this.setState({ follow: !follow }))
      .catch((err) => console.log(err));
  }

  render() {
    // animation and style
    const containerVariants = {
      hidden: {
        opacity: 0,
      },
      visible: {
        opacity: 1,
      },
      exit: {
        x: "100vh",
        transition: { ease: "easeInOut" },
      },
    };
    const unFollowStyles = {
      background: "#c21d5112",
      color: "#c21d51",
      border: "1px solid #c21d51",
    };
    const followStyles = {
      background: "#32cd3212",
      color: "#32cd32",
      border: "1px solid #52b788",
    };
    const headerElements = {
      flexBasis: "100%",
      display: "flex",
      justifyContent: "center",
      margin: "10px 0",
    };

    // deconstructing things
    const { coinInfo, follow } = this.state;
    const { isAuth } = this.props;

    return (
      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        exit="exit"
      >
        {coinInfo && (
          <Box
            justifyContent="center"
            style={{
              background:
                "linear-gradient(90deg, rgba(21,24,29,1) 22%, rgba(12,15,17,1) 100%)",
            }}
          >
            {/* CONTAINER WITH BACK BTN< NAME AND TICKER OF THE COIN AND AN IMG */}
            <Box display="flex" alignItems="center">
              <Box style={headerElements}>
                <Link to="/coins" style={{ textDecoration: "none" }}>
                  <Button
                    variant="contained"
                    style={{
                      color: "black",
                      fontWeight: 600,
                    }}
                  >
                    Back
                  </Button>
                </Link>
              </Box>
              <Box
                style={{
                  ...headerElements,
                  ...{ flexDirection: "column", alignItems: "center" },
                }}
                component="div"
                display="inline"
              >
                <Typography
                  variant="h5"
                  style={{
                    display: "inline-block",
                  }}
                >
                  {coinInfo.name}
                </Typography>
                <div
                  style={{
                    color: "#95969a",
                    fontWeight: "600",
                    fontSize: "13px",
                  }}
                >
                  {coinInfo.ticker}
                </div>
                <div
                  style={{
                    color: "#95969a",
                    fontWeight: "600",
                    fontSize: "13px",
                  }}
                >
                  {coinInfo.currPrice} ({coinInfo.price_change24h}%)
                </div>
              </Box>
              <Box style={headerElements} component="div" display="inline">
                <img src={coinInfo.img_link} alt={coinInfo.name} />
              </Box>
            </Box>
            {/* links and follow/unfollow btn */}
            <Box
              container
              display="flex"
              style={{ marginTop: "20px" }}
              justifyContent="space-evenly"
            >
              <a href={coinInfo.cg_link}>
                <img
                  style={{ width: 40 }}
                  alt="Qries"
                  src="https://static.coingecko.com/s/thumbnail-007177f3eca19695592f0b8b0eabbdae282b54154e1be912285c9034ea6cbaf2.png"
                />
              </a>
              {isAuth && (
                <Button
                  variant="outlined"
                  style={follow ? unFollowStyles : followStyles}
                  onClick={this.followUnfollow}
                >
                  {follow ? "Unfollow" : "Follow"}
                </Button>
              )}
              <a href={coinInfo.tg_link}>
                <img
                  style={{ width: 40 }}
                  alt="Qries"
                  src="https://upload.wikimedia.org/wikipedia/commons/thumb/8/82/Telegram_logo.svg/240px-Telegram_logo.svg.png"
                />
              </a>
            </Box>

            {/* POSTS */}
            {coinInfo.posts.length > 0 && (
              <Box bgcolor="#8894afbd">
                <Cards cards={coinInfo.posts} />
              </Box>
            )}
          </Box>
        )}
      </motion.div>
    );
  }
}

CoinDetail.propTypes = {
  isAuth: PropTypes.bool,
  token: PropTypes.string,
};

export default CoinDetail;
