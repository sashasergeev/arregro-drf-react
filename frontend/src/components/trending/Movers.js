import React, { useEffect, useState } from "react";
import { Box, Card, Typography } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import Column from "./Column";
import axios from "axios";
import TrendingUpIcon from "@material-ui/icons/TrendingUp";
import TrendingDownIcon from "@material-ui/icons/TrendingDown";
import { useTheme } from "@material-ui/core/styles";
import useMediaQuery from "@material-ui/core/useMediaQuery";

const useStyles = makeStyles({
  columns: {
    display: "flex",
    flexWrap: "wrap",
    marginTop: "35px",
  },
  column: {
    borderRadius: "5px",
    padding: "5px",
    backgroundColor: "#000",
  },
  columnheader: {
    display: "flex",
    gap: "10px",
    alignItems: "center",
    justifyContent: "center",
  },
  gainersBord: {
    background:
      "linear-gradient(0deg, rgba(194,29,77,0.47102591036414565) 0%, rgba(50,205,50,0.3617822128851541) 100%)",
  },
  losersBord: {
    background:
      "linear-gradient(0deg, rgba(50,205,50,0.5438550420168067) -64%, rgba(194,29,77,0.5606617647058824) 100%)",
  },
});

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
  const { main, columns, column, columnheader, gainersBord, losersBord } =
    useStyles();
  return (
    <>
      <Box style={matches ? { padding: "5px" } : { padding: "20px" }}>
        {/* <Typography align="center" variant="h3">
          Here you can see top movers in last 24h.
        </Typography> */}
        <Box
          className={columns}
          style={
            matches
              ? { justifyContent: "center" }
              : { justifyContent: "space-between" }
          }
        >
          <Box
            className={`${column} ${gainersBord}`}
            style={
              matches
                ? { width: "92vw", marginBottom: "20px" }
                : { width: "44vw" }
            }
          >
            <Box className={columnheader}>
              <Typography align="center" variant="h5">
                Top Gainers
              </Typography>
              <TrendingUpIcon />
            </Box>
            <Column trendData={gainers} />
          </Box>
          <Box
            className={`${column} ${losersBord}`}
            style={matches ? { width: "92vw" } : { width: "44vw" }}
          >
            <Box className={columnheader}>
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
