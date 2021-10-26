import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import PropTypes from "prop-types";

import { motion } from "framer-motion";
import { Card, Typography, Grid, Box, Button } from "@material-ui/core";
import Skeleton from "@material-ui/lab/Skeleton";
import AddIcon from "@material-ui/icons/Add";
import { useCoinStyles, containerVariants } from "./styles";

import CoinSubmitModal from "./CoinSubmitModal";
import PageNav from "../Layout/PageNav";
import Search from "./Search";

import useSnackbarAlert from "../other/useSnackbarAlert";
import { FetchCoinData } from "../other/FetchCoinData";
import { useStateValue } from "../../context";

const skeletonArr = new Array(8).fill("skelet");

export const CoinList = () => {
  // styles
  const classes = useCoinStyles();
  const snackbar = useSnackbarAlert();

  // states
  const [coins, setCoins] = useState([]);
  const [page, setPage] = useState(1);
  const [numOfPages, setNumOfPages] = useState(1);
  const [coinSubmitModal, setCoinSubmitModal] = useState(false);

  // get auth data
  const [{ token, isAuth, isLoaded }] = useStateValue();

  // HANDLE DATA FETCH AND CHANGE OF PAGE
  useEffect(() => {
    if (isLoaded) {
      setCoins([]);
      getCoinData();
      window.scrollTo(0, 0);
    }
  }, [page, isLoaded]);
  const getCoinData = () => {
    FetchCoinData(`api/coins/?page=${page}`, isAuth, token).then((res) => {
      setCoins(res.coins);
      setNumOfPages(res.numOfPages);
    });
  };
  const handlePageChange = (e, val) => setPage(val);

  const followUnfollowMain = (coin_id, e) => {
    let items = [...coins];
    let item = { ...items[e] };
    let data = {
      coin_id: coin_id,
      action: item.doesUserFollow ? "unfollow" : "follow",
    };
    item.doesUserFollow = !item.doesUserFollow;
    items[e] = item;
    axios
      .post("api/coins/following/", data, {
        headers: { Authorization: `Token ${token}` },
      })
      .then((res) => {
        setCoins(items);
        snackbar.showSuccess(`You've ${res.data.status} the coin!`);
      })
      .catch((err) =>
        snackbar.showError("Some error has happend. Reload the page!")
      );
  };
  const handleModal = () => setCoinSubmitModal(!coinSubmitModal);

  return (
    <motion.div
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      exit="exit"
    >
      <CoinSubmitModal isOpen={coinSubmitModal} handleModal={handleModal} />
      <Box display="flex" justifyContent="center">
        <AddIcon className={classes.addBtn} onClick={handleModal} />
        <Search />
      </Box>
      <Grid container justifyContent="center" spacing={1} pt="25px" pb="15px">
        {coins.length > 0
          ? coins.map((e, inx) => {
              return (
                <Grid key={inx} item>
                  <Card className={classes.coinCard} elevation={0}>
                    <Grid
                      container
                      justifyContent="space-between"
                      alignItems="center"
                    >
                      <Link
                        className={classes.coinLink}
                        to={`coins/coin?id=${e.id}`}
                      >
                        <Box component="div" display="inline">
                          <Typography variant="h6" display="inline">
                            {e.name}
                          </Typography>
                          <div className={classes.secondaryDetails}>
                            {e.ticker}
                          </div>
                        </Box>
                      </Link>
                      {isAuth && (
                        <Button
                          variant="outlined"
                          className={
                            e.doesUserFollow ? classes.unFollow : classes.follow
                          }
                          onClick={() => followUnfollowMain(e.id, inx)}
                        >
                          {e.doesUserFollow ? "Unfollow" : "Follow"}
                        </Button>
                      )}
                      <Box component="div" display="inline">
                        <img src={e.img_link} alt={e.name} />
                      </Box>
                    </Grid>
                  </Card>
                </Grid>
              );
            })
          : skeletonArr.map((e, inx) => {
              return (
                <Grid key={inx} item>
                  <Card elevation={0} className={classes.coinCard}>
                    <Grid
                      container
                      justifyContent="space-between"
                      alignItems="center"
                    >
                      <Box component="div" display="inline">
                        <Typography variant="h6" display="inline">
                          <Skeleton variant="rect" width={120} height={32} />
                        </Typography>
                        <div className={classes.secondaryDetails}>
                          <Skeleton
                            variant="rect"
                            width={70}
                            height={20}
                            mt="5px"
                          />
                        </div>
                      </Box>

                      <Box component="div" display="inline">
                        <Skeleton variant="circle" width={50} height={50} />
                      </Box>
                    </Grid>
                  </Card>
                </Grid>
              );
            })}
      </Grid>
      <PageNav
        page={page}
        numOfPages={numOfPages}
        onChange={handlePageChange}
      />
    </motion.div>
  );
};

CoinList.propTypes = {
  isAuth: PropTypes.bool,
  token: PropTypes.string,
};

export default CoinList;
