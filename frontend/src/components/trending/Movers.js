import React, { useEffect, useState } from "react";
import { Box, Typography } from "@material-ui/core";
import Column from "./Column";
import axios from "axios";
import TrendingUpIcon from "@material-ui/icons/TrendingUp";
import TrendingDownIcon from "@material-ui/icons/TrendingDown";
import { useTheme } from "@material-ui/core/styles";
import useMediaQuery from "@material-ui/core/useMediaQuery";

import { useMoversStyles } from "./styles";

const Movers = () => {
  // state and fetching data
  const [gainers, setGainers] = useState(new Array(10).fill("skelet"));
  const [losers, setLosers] = useState(new Array(10).fill("skelet"));
  useEffect(() => {
    fetchMovers();
  }, []);
  const fetchMovers = () => {
    axios.get(`api/trending`).then((res) => {
      setGainers(res.data.gainers);
      setLosers(res.data.losers);
    });
  };

  // styles
  const theme = useTheme();
  const matches = useMediaQuery(theme.breakpoints.down("sm"));
  const classes = useMoversStyles();
  return (
    <>
      <Box style={matches ? { padding: "5px" } : { padding: "20px" }}>
        <Box
          className={classes.columns}
          style={
            matches
              ? { justifyContent: "center" }
              : { justifyContent: "space-between" }
          }
        >
          <Box
            className={`${classes.column} ${classes.gainersBord}`}
            style={
              matches
                ? { width: "92vw", marginBottom: "20px" }
                : { width: "44vw" }
            }
          >
            <Box className={classes.columnheader}>
              <Typography align="center" variant="h5">
                Top Gainers
              </Typography>
              <TrendingUpIcon />
            </Box>
            <Column trendData={gainers} />
          </Box>
          <Box
            className={`${classes.column} ${classes.losersBord}`}
            style={matches ? { width: "92vw" } : { width: "44vw" }}
          >
            <Box className={classes.columnheader}>
              <Typography align="center" variant="h5">
                Top Losers
              </Typography>
              <TrendingDownIcon />
            </Box>
            <Column trendData={losers} />
          </Box>
        </Box>
      </Box>
    </>
  );
};

export default Movers;
