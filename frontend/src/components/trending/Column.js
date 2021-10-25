import React from "react";
import { Box, Typography } from "@material-ui/core";
import Skeleton from "@material-ui/lab/Skeleton";
import { Link } from "react-router-dom";
import { useColumnStyles } from "./styles";

const Column = (props) => {
  const { trendData } = props;
  const classes = useColumnStyles();

  return (
    <Box>
      {trendData[0] !== "skelet"
        ? trendData.map((e) => (
            <Link
              to={`/coins/coin?id=${e.id}`}
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
                variant="rect"
                className={classes.skeleton}
                height={45}
              />
            </Box>
          ))}
    </Box>
  );
};

export default Column;
