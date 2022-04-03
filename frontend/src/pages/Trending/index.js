import React, { useState } from "react";
import { useQuery } from "react-query";
import { useTheme } from "@mui/material/styles";
import useMediaQuery from "@mui/material/useMediaQuery";
import { Box, Typography } from "@mui/material";
import TrendingUpIcon from "@mui/icons-material/TrendingUp";
import TrendingDownIcon from "@mui/icons-material/TrendingDown";

import Column from "./components/Column";
import { useMoversStyles } from "./styles";

import { fetchMovers } from "../../api/trending";

const Trending = () => {
  const skelet = new Array(10).fill("skelet");
  // state and fetching data
  const [gainers, setGainers] = useState();
  const [losers, setLosers] = useState();

  useQuery("trends", fetchMovers, {
    onSuccess: ({ data }) => {
      setGainers(data.gainers);
      setLosers(data.losers);
    },
  });

  // styles
  const theme = useTheme();
  const matches = useMediaQuery(theme.breakpoints.down("xl"));
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
            <Column trendData={gainers ?? skelet} />
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
            <Column trendData={losers ?? skelet} />
          </Box>
        </Box>
      </Box>
    </>
  );
};

export default Trending;
