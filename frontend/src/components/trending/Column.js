import React from "react";
import { Box, Card, Typography } from "@material-ui/core";
import Skeleton from "@material-ui/lab/Skeleton";
import { makeStyles } from "@material-ui/core/styles";
import { Link } from "react-router-dom";

const useStyles = makeStyles({
  row: {
    display: "flex",
    alignItems: "center",
    gap: "10px",
    padding: "5px 10px",
  },
  coinLogo: {},
  change: { marginLeft: "auto" },
});

const Column = (props) => {
  const { trendData } = props;
  const { row, change } = useStyles();

  return (
    <Box>
      {trendData[0] !== "skelet"
        ? trendData.map((e) => (
            <Link
              to={`/coins/coin?id=${e.id}`}
              key={e.id}
              style={{ textDecoration: "none", color: "inherit" }}
            >
              <Box className={row}>
                <Box display="inline">
                  <img style={{}} src={e.img_link} alt={e.name} />
                </Box>
                <Typography display="inline">{e.name} &nbsp;· </Typography>
                <Typography display="inline">{e.currPrice}$</Typography>
                <Typography
                  className={change}
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
            <Box key={inx} className={row}>
              <Skeleton
                variant="rect"
                style={{
                  width: "-webkit-fill-available",
                  background: "#ffeddb14",
                }}
                height={31}
              />
            </Box>
          ))}
    </Box>
  );
};

export default Column;
