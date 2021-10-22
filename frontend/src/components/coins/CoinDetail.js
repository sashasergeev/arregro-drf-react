import React, { Component, useState, useEffect } from "react";
import { Link, useLocation, useHistory } from "react-router-dom";
import PropTypes from "prop-types";
import axios from "axios";

// style related
import { motion } from "framer-motion";
import { Box, Typography, Button } from "@material-ui/core";

import Cards from "../posts/Cards";
import { FetchCoinData } from "../other/FetchCoinData";

// animation and styles
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

export const CoinDetail = ({ isAuth, token }) => {
  // getting param from url
  const search = useLocation().search;

  // state
  const [idOfCoin, setIdOfCoin] = useState(
    new URLSearchParams(search).get("id")
  );
  const [coinInfo, setCoinInfo] = useState(null);
  const [follow, setFollow] = useState(false);

  // obtaining data related functions
  useEffect(() => {
    fetchData();
  }, []);
  const fetchData = () => {
    FetchCoinData(`api/coins/${idOfCoin}`, isAuth, token, idOfCoin).then(
      (res) => {
        setCoinInfo(res.coinInfo);
        setFollow(isAuth ? res.follow : undefined);
      }
    );
  };

  // follow functionality
  const followUnfollow = () => {
    let data = {
      coin_id: idOfCoin,
      action: follow ? "unfollow" : "follow",
    };
    axios
      .post("api/coins/following/", data, {
        headers: { Authorization: `Token ${token}` },
      })
      .then((res) => setFollow(!follow))
      .catch((err) => console.log(err));
  };

  // BACK BTN FUNCTIONALITY
  let history = useHistory();
  const handleBack = () => {
    history.goBack();
  };
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
              <Button
                variant="contained"
                onClick={handleBack}
                style={{
                  color: "black",
                  fontWeight: 600,
                }}
              >
                Back
              </Button>
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
                onClick={followUnfollow}
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
            <Box mt="20px" bgcolor="#8894afbd">
              <Cards cards={coinInfo.posts} />
            </Box>
          )}
        </Box>
      )}
    </motion.div>
  );
};

CoinDetail.propTypes = {
  isAuth: PropTypes.bool,
  token: PropTypes.string,
};

export default CoinDetail;
