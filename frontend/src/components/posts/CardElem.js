import React from "react";
import {
  Card,
  Typography,
  CardContent,
  CardActions,
  Box,
  Grid,
  Paper,
} from "@material-ui/core";
import { useCardStyles } from "./styles";

import Skeleton from "@material-ui/lab/Skeleton";
import InfoOutlinedIcon from "@material-ui/icons/InfoOutlined";
import PropTypes from "prop-types";

const CardElem = (props) => {
  const classes = useCardStyles();
  const { data, openModal, isLoaded } = props;
  return (
    <Grid item className={classes.huo}>
      <Card className={classes.root}>
        <Box className={classes.bdy} justifyContent="center">
          <Box component="div" display="inline" p={1} m={1}>
            <Typography variant="h6">
              {isLoaded ? (
                data.coinName
              ) : (
                <Skeleton variant="rect" width={100} height={31} />
              )}
            </Typography>
            <div className={classes.ticker}>
              {isLoaded ? (
                data.ticker
              ) : (
                <Skeleton mt="5px" variant="rect" width={50} height={16} />
              )}
            </div>
          </Box>
          <Box component="div" display="inline" p={1} m={1}>
            {isLoaded ? (
              <img src={data.img_link} alt={data.name} />
            ) : (
              <Skeleton variant="circle" width={50} height={50} />
            )}
          </Box>
        </Box>
        <CardContent>
          <Typography variant="body1" component="p">
            {isLoaded ? (
              data.message
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
                <Skeleton variant="rect" width={110} height={24} />
              )}
            </Paper>
          </Grid>
          <Grid item xs={4}>
            <Paper
              className={classes.paper}
              style={
                data.change && data.change > 0
                  ? { color: "#27d030" }
                  : { color: "#f50057" }
              }
              elevation={0}
              square
            >
              {isLoaded ? (
                <>{data.change}%</>
              ) : (
                <Skeleton variant="rect" width={110} height={24} />
              )}
            </Paper>
          </Grid>
          <Grid item xs={4}>
            <Paper className={classes.paper} elevation={0} square>
              {isLoaded ? (
                <>after: {data.currPrice || data.coin.currPrice}$</>
              ) : (
                <Skeleton variant="rect" width={110} height={24} />
              )}
            </Paper>
          </Grid>
        </Grid>
        <CardActions className={classes.bdy}>
          {isLoaded ? (
            <>
              <a href={data.cg_link}>
                <img
                  className={classes.actionIcons}
                  alt="Qries"
                  src="https://static.coingecko.com/s/thumbnail-007177f3eca19695592f0b8b0eabbdae282b54154e1be912285c9034ea6cbaf2.png"
                />
              </a>
              <a href={data.tg_link}>
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
              <Skeleton variant="circle" width={40} height={40} />
              <Skeleton variant="circle" width={40} height={40} />
              <Skeleton variant="circle" width={40} height={40} />
            </>
          )}
        </CardActions>
        <Box className={classes.bdy} p="10px">
          <Typography>
            {isLoaded ? (
              data.date || data.date_added
            ) : (
              <Skeleton variant="text" width={50} />
            )}
          </Typography>
          <Typography>
            {isLoaded ? (
              data.tags || data.tag.join(", ")
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
