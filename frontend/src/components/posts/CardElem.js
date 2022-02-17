import React from "react";
import {
  Card,
  Typography,
  CardContent,
  CardActions,
  Box,
  Grid,
  Paper,
} from "@mui/material";
import { useCardStyles } from "./styles";

import Skeleton from "@mui/material/Skeleton";
import InfoOutlinedIcon from "@mui/icons-material/InfoOutlined";
import PropTypes from "prop-types";

import { Link } from "react-router-dom";

const CardElem = ({ isLoaded, data, openModal }) => {
  const classes = useCardStyles();
  const change =
    isLoaded && ((data.coin.currPrice / data.price - 1) * 100).toFixed(2);
  return (
    <Grid item className={classes.huo}>
      <Card className={classes.root}>
        <Box className={classes.bdy} justifyContent="center">
          {isLoaded ? (
            <>
              <Box component="div" display="inline" p={1} m={1}>
                <Link
                  style={{
                    textDecoration: "none",
                    display: "block",
                    color: "white",
                  }}
                  to={`coins/coin?id=${data.coin.id}`}
                >
                  <Typography variant="h6">{data.coin.name}</Typography>
                </Link>
                <div className={classes.ticker}>{data.coin.ticker}</div>
              </Box>
              <Box component="div" display="inline" p={1} m={1}>
                <img src={data.coin.img_link} alt={data.coin.name} />
              </Box>{" "}
            </>
          ) : (
            <>
              <Box component="div" display="inline" p={1} m={1}>
                <Typography variant="h6">
                  <Skeleton variant="rectangular" width={100} height={31} />
                </Typography>
                <div className={classes.ticker}>
                  <Skeleton
                    mt="5px"
                    variant="rectangular"
                    width={50}
                    height={16}
                  />
                </div>
              </Box>
              <Box component="div" display="inline" p={1} m={1}>
                <Skeleton variant="circular" width={50} height={50} />
              </Box>
            </>
          )}
        </Box>
        <CardContent>
          <Typography variant="body1" component="p">
            {isLoaded ? (
              data.message.substr(0, 50 - 1) + "…"
            ) : (
              <>
                <Skeleton variant="text" />
                <Skeleton variant="text" />
              </>
            )}
          </Typography>
        </CardContent>
        <Grid container spacing={2} className={classes.priceSection}>
          <Grid item xs={4}>
            <Paper className={classes.paper} elevation={0} square>
              {isLoaded ? (
                <>before: {data.price}$</>
              ) : (
                <Skeleton variant="rectangular" width={103} height={24} />
              )}
            </Paper>
          </Grid>
          <Grid item xs={4}>
            <Paper
              className={classes.paper}
              style={
                change && change > 0
                  ? { color: "#27d030" }
                  : { color: "#f50057" }
              }
              elevation={0}
              square
            >
              {isLoaded ? (
                <>{change}%</>
              ) : (
                <Skeleton variant="rectangular" width={103} height={24} />
              )}
            </Paper>
          </Grid>
          <Grid item xs={4}>
            <Paper className={classes.paper} elevation={0} square>
              {isLoaded ? (
                <>after: {data.coin.currPrice}$</>
              ) : (
                <Skeleton variant="rectangular" width={103} height={24} />
              )}
            </Paper>
          </Grid>
        </Grid>
        <CardActions className={classes.bdy}>
          {isLoaded ? (
            <>
              <a href={data.coin.cg_link}>
                <img
                  className={classes.actionIcons}
                  alt="Qries"
                  src="https://static.coingecko.com/s/thumbnail-007177f3eca19695592f0b8b0eabbdae282b54154e1be912285c9034ea6cbaf2.png"
                />
              </a>
              <a href={data.coin.tg_link}>
                <img
                  className={classes.actionIcons}
                  alt="Qries"
                  src="https://upload.wikimedia.org/wikipedia/commons/thumb/8/82/Telegram_logo.svg/240px-Telegram_logo.svg.png"
                />
              </a>
              <InfoOutlinedIcon
                onClick={() => openModal(data.id)}
                className={classes.actionIcons}
              >
                info
              </InfoOutlinedIcon>
            </>
          ) : (
            <>
              <Skeleton variant="circular" width={40} height={40} />
              <Skeleton variant="circular" width={40} height={40} />
              <Skeleton variant="circular" width={40} height={40} />
            </>
          )}
        </CardActions>
        <Box className={classes.bdy} p="10px">
          <Typography>
            {isLoaded ? (
              data.date_added
            ) : (
              <Skeleton variant="text" width={50} />
            )}
          </Typography>
          <Typography>
            {isLoaded ? (
              data.tag.join(", ")
            ) : (
              <Skeleton variant="text" width={50} />
            )}
          </Typography>
        </Box>
      </Card>
    </Grid>
  );
};

CardElem.propTypes = {
  isLoaded: PropTypes.bool,
  openModal: PropTypes.func.isRequired,
};

export default CardElem;
