import React, { useState } from "react";
import { useQuery } from "react-query";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { Box, Card, Grid, Typography } from "@mui/material";
import AddIcon from "@mui/icons-material/Add";

import { fetchCoinList } from "../../api/coins";
import FollowBtn from "../../components/FollowBtn";
import Pagination from "../../components/Pagination";
import { useStateValue } from "../../contextAuth";
import useChangePage from "../../hooks/useChangePage";
import useFollowCoin from "../../hooks/useFollowCoin";
import CoinSubmitModal from "./components/CoinSubmitModal";
import Search from "./components/Search";
import { containerVariantsEnter, useCoinStyles } from "./styles";
import Skeleton from "./Skeleton";

export const CoinList = () => {
  // styles
  const classes = useCoinStyles();

  // states
  const [coins, setCoins] = useState([]);
  const [coinSubmitModal, setCoinSubmitModal] = useState(false);

  // get auth data
  const [{ token, isAuth, isLoaded }] = useStateValue();

  const { page, handlePage, pageNum, setPageNum } = useChangePage();
  const follow = useFollowCoin(setCoins, coins, token);
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
        {isFetched ? (
          coins.map((e, inx) => {
            return (
              <Grid key={e.name} item>
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
        ) : (
          <Skeleton />
        )}
      </Grid>
      <Pagination page={page} numOfPages={pageNum} onChange={handlePage} />
    </motion.div>
  );
};

export default CoinList;
