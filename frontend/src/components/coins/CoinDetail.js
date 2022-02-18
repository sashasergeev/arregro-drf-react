import React, { useState } from "react";
import { useLocation, useHistory } from "react-router-dom";
import PropTypes from "prop-types";
import { useQuery } from "react-query";

// style related
import { motion } from "framer-motion";
import { Box, Typography, Button } from "@mui/material";

import Graph from "./graph/Graph";
import Cards from "../posts/Cards";

import { useCoinStyles, containerVariants } from "./styles";
import { useStateValue } from "../../contextAuth";
import useFollowCoin from "../../hooks/useFollowCoin";

import { fetchCoinDetail } from "../../api/coins";

export const CoinDetail = () => {
  // getting param from url
  const search = useLocation().search;
  const idOfCoin = new URLSearchParams(search).get("id");

  // style
  const classes = useCoinStyles();

  // state
  const [coinInfo, setCoinInfo] = useState(null);
  const [followed, setFollowed] = useState(false);

  // auth context
  const [{ token, isAuth, isLoaded }] = useStateValue();

  // obtaining data
  const { isFetched } = useQuery(
    ["coinDetail", idOfCoin, token, isAuth],
    fetchCoinDetail,
    {
      enabled: isLoaded,
      onSuccess: (data) => {
        setCoinInfo(data.data);
        setFollowed(data.data.doesUserFollow);
      },
    }
  );

  // follow functionality
  const { follow } = useFollowCoin();

  // BACK BTN FUNCTIONALITY
  let history = useHistory();
  const handleBack = () => {
    const state = history.location.state;
    // i could make process of resuming to last page through context, but this is more interesting...
    history.push({
      pathname: state?.from ? `${state.from}` : "/coins",
      state: state?.page ? { page: state.page } : {},
    });
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
                className={followed ? classes.unFollow : classes.follow}
                onClick={() =>
                  follow(token, idOfCoin, followed, setFollowed, null)
                }
              >
                {followed ? "Unfollow" : "Follow"}
              </Button>
            )}
            <a href={`https://github.com/${coinInfo.github}`}>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="40"
                height="40"
                viewBox="0 0 24 24"
                fill={coinInfo.github ? "white" : "gray"}
              >
                <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
              </svg>
            </a>
            <a href={coinInfo.tg_link}>
              <img
                className={classes.socialImg}
                alt="Qries"
                src="https://upload.wikimedia.org/wikipedia/commons/thumb/8/82/Telegram_logo.svg/240px-Telegram_logo.svg.png"
              />
            </a>
          </Box>

          {/* Price and activity graph */}
          <Graph github={coinInfo.github} cg_id={coinInfo.cg_id} />

          {/* POSTS */}
          {coinInfo.posts.length > 0 && (
            <Box mt="20px" bgcolor="#8894afbd">
              <Cards isDataLoaded={isFetched} cards={coinInfo.posts} />
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
