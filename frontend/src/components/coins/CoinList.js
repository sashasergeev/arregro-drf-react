import React, { useState } from "react";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";

import { motion } from "framer-motion";
import { Card, Typography, Grid, Box, Button } from "@mui/material";
import Skeleton from "@mui/material/Skeleton";
import AddIcon from "@mui/icons-material/Add";

import CoinSubmitModal from "./CoinSubmitModal";
import PageNav from "../Layout/PageNav";
import Search from "./Search";

import { useStateValue } from "../../contextAuth";
import useChangePage from "../../hooks/useChangePage";
import useFetchData from "../../hooks/useFetchData";
import useFollowCoin from "../../hooks/useFollowCoin";
import { useCoinStyles, containerVariants } from "./styles";

const skeletonArr = new Array(8).fill("skelet");

export const CoinList = () => {
  // styles
  const classes = useCoinStyles();

  // states
  const [coins, setCoins] = useState([]);
  const [page, setPage] = useState(1);
  const [numOfPages, setNumOfPages] = useState(1);
  const [coinSubmitModal, setCoinSubmitModal] = useState(false);

  // get auth data
  const [{ token, isAuth, isLoaded }] = useStateValue();
  const skeletRender = () => setCoins([]);
  const getCoinData = useFetchData(
    `api/coins/?page=${page}`,
    "coin",
    setCoins,
    setNumOfPages,
    { isAuth, token }
  );
  // HANDLE DATA FETCH AND CHANGE OF PAGE
  const { handlePageChange } = useChangePage(
    getCoinData,
    skeletRender,
    setPage,
    {
      page,
      isLoaded,
    }
  );
  const { follow } = useFollowCoin();
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
                          onClick={() =>
                            follow(token, e.id, coins, setCoins, inx)
                          }
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
                          <Skeleton
                            variant="rectangular"
                            width={120}
                            height={32}
                          />
                        </Typography>
                        <div className={classes.secondaryDetails}>
                          <Skeleton
                            variant="rectangular"
                            width={70}
                            height={20}
                            mt="5px"
                          />
                        </div>
                      </Box>

                      <Box component="div" display="inline">
                        <Skeleton variant="circular" width={50} height={50} />
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
