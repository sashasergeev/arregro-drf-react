import React, { useState } from "react";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";
import { useQuery } from "react-query";

import { motion } from "framer-motion";
import { Card, Typography, Grid, Box, Button } from "@mui/material";
import Skeleton from "@mui/material/Skeleton";
import AddIcon from "@mui/icons-material/Add";

import CoinSubmitModal from "./CoinSubmitModal";
import PageNav from "../Layout/PageNav";
import Search from "./Search";

import { useStateValue } from "../../contextAuth";
import useChangePage from "../../hooks/useChangePage";
import useFollowCoin from "../../hooks/useFollowCoin";
import { useCoinStyles, containerVariantsEnter } from "./styles";
import { fetchCoinList } from "../../api/coins";
import FollowBtn from "./FollowBtn";

export const CoinList = () => {
  const skeletonArr = new Array(8).fill("skelet");
  // styles
  const classes = useCoinStyles();

  // states
  const [coins, setCoins] = useState([]);
  const [coinSubmitModal, setCoinSubmitModal] = useState(false);

  // get auth data
  const [{ token, isAuth, isLoaded }] = useStateValue();

  const { page, handlePage, pageNum, setPageNum } = useChangePage();
  const { follow } = useFollowCoin(setCoins, coins, token);
  const handleModal = () => setCoinSubmitModal(!coinSubmitModal);

  // HANDLE DATA FETCH AND CHANGE OF PAGE
  const { isFetched } = useQuery(
    ["coinList", page, token, isAuth],
    fetchCoinList,
    {
      onSuccess: (data) => {
        window.scroll(0, 0);
        setCoins(data.data.results);
        setPageNum(Math.ceil(data.data.count / 8));
      },
      enabled: isLoaded,
    }
  );

  return (
    <motion.div
      variants={containerVariantsEnter}
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
        {isFetched
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
                        to={{
                          pathname: "/coins/coin",
                          search: `?id=${e.id}`,
                          state: { page, from: "/coins" },
                        }}
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
                        <FollowBtn
                          isFollow={e.doesUserFollow}
                          follow={follow}
                          coinID={e.id}
                          inx={inx}
                        />
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
      <PageNav page={page} numOfPages={pageNum} onChange={handlePage} />
    </motion.div>
  );
};

CoinList.propTypes = {
  isAuth: PropTypes.bool,
  token: PropTypes.string,
};

export default CoinList;
