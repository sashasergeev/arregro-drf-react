import React from "react";
import { Box, Typography } from "@mui/material";
import Skeleton from "@mui/material/Skeleton";
import { Link } from "react-router-dom";
import { useColumnStyles } from "./styles";

const Column = ({ trendData }) => {
  const classes = useColumnStyles();

  return (
    <Box>
      {trendData[0] !== "skelet"
        ? trendData.map((e) => (
            <Link
              to={{
                pathname: `/coins/coin`,
                search: `?id=${e.id}`,
                state: { from: "/trending" },
              }}
              key={e.id}
              className={classes.coinLink}
            >
              <Box className={classes.row}>
                <Box display="inline">
                  <img src={e.img_link} alt={e.name} />
                </Box>
                <Typography display="inline">{e.name} &nbsp;· </Typography>
                <Typography display="inline">{e.currPrice}$</Typography>
                <Typography
                  className={classes.change}
                  style={
                    e.price_change24h > 0
                      ? { color: "#0f6" }
                      : { color: "#ff6fb1" }
                  }
                  display="inline"
                >
                  {e.price_change24h}%
                </Typography>
              </Box>
            </Link>
          ))
        : trendData.map((e, inx) => (
            <Box key={inx} className={classes.row}>
              <Skeleton
                variant="rectangular"
                className={classes.skeleton}
                height={45}
              />
            </Box>
          ))}
    </Box>
  );
};

export default Column;
