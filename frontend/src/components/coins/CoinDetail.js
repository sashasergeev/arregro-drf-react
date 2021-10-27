import React, { useState, useEffect } from "react";
import { useLocation, useHistory } from "react-router-dom";
import PropTypes from "prop-types";
import axios from "axios";
import useSnackbarAlert from "../other/useSnackbarAlert";

// style related
import { motion } from "framer-motion";
import { Box, Typography, Button } from "@mui/material";
import { useCoinStyles, containerVariants } from "./styles";

import Cards from "../posts/Cards";
import { FetchCoinData } from "../other/FetchCoinData";
import { useStateValue } from "../../context";

export const CoinDetail = () => {
  // style
  const classes = useCoinStyles();
  // alert
  const snackbar = useSnackbarAlert();
  // getting param from url
  const search = useLocation().search;

  // state
  const [idOfCoin, setIdOfCoin] = useState(
    new URLSearchParams(search).get("id")
  );
  const [coinInfo, setCoinInfo] = useState(null);
  const [follow, setFollow] = useState(false);

  // auth context
  const [{ token, isAuth, isLoaded }] = useStateValue();

  // obtaining data related functions
  useEffect(() => {
    if (isLoaded) {
      fetchData();
    }
  }, [isLoaded]);
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
      .then((res) => {
        setFollow(!follow);
        snackbar.showSuccess(`You've ${res.data.status} the coin!`);
      })
      .catch((err) =>
        snackbar.showError("Some error has happend. Reload the page!")
      );
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
        <Box justifyContent="center">
          {/* CONTAINER WITH BACK BTN< NAME AND TICKER OF THE COIN AND AN IMG */}
          <Box display="flex" alignItems="center">
            <Box className={classes.headerElements}>
              <Button
                variant="contained"
                onClick={handleBack}
                className={classes.backBtn}
              >
                Back
              </Button>
            </Box>
            <Box
              className={classes.headerElements}
              flexDirection="column"
              alignItems="center"
            >
              <Typography variant="h5">{coinInfo.name}</Typography>
              <Box className={classes.secondaryDetails}>{coinInfo.ticker}</Box>
              <Box className={classes.secondaryDetails}>
                {coinInfo.currPrice} ({coinInfo.price_change24h}%)
              </Box>
            </Box>
            <Box className={classes.headerElements}>
              <img src={coinInfo.img_link} alt={coinInfo.name} />
            </Box>
          </Box>
          {/* links and follow/unfollow btn */}
          <Box display="flex" mt="20px" justifyContent="space-evenly">
            <a href={coinInfo.cg_link}>
              <img
                className={classes.socialImg}
                alt="Qries"
                src="https://static.coingecko.com/s/thumbnail-007177f3eca19695592f0b8b0eabbdae282b54154e1be912285c9034ea6cbaf2.png"
              />
            </a>
            {isAuth && (
              <Button
                variant="outlined"
                className={follow ? classes.unFollow : classes.follow}
                onClick={followUnfollow}
              >
                {follow ? "Unfollow" : "Follow"}
              </Button>
            )}
            <a href={coinInfo.tg_link}>
              <img
                className={classes.socialImg}
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
