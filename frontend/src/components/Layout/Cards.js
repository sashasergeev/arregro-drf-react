import React, { useState, useEffect } from "react";
import { makeStyles } from "@material-ui/core/styles";
import {
  Card,
  Typography,
  CardContent,
  CardActions,
  Box,
  Grid,
  Paper,
} from "@material-ui/core";
import Skeleton from "@material-ui/lab/Skeleton";
import InfoOutlinedIcon from "@material-ui/icons/InfoOutlined";
import PostModal from "./PostModal";

const useStyles = makeStyles({
  bdy: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    background: "#06070a40",
  },
  huo: {
    fontFamily: "Quicksand, sans-serif",
    padding: "15px 10px",
  },
  root: {
    minWidth: 350,
    maxWidth: 400,
    backgroundColor: "#040d1b6b",
    color: "white",
  },
  paper: {
    textAlign: "center",
    fontWeight: 500,
    color: "white",
    background: "#181b22",
    padding: 2,
    borderRadius: 5,
  },
  ticker: {
    color: "#95969a",
    fontWeight: "600",
    fontSize: "13px",
  },
});

export const Cards = (props) => {
  const { huo, root, bdy, paper, ticker } = useStyles();
  const cards = props.cards;

  // useEffect(() => {
  //   const socket = new WebSocket(
  //     "ws://" + window.location.host + "/ws/prices/"
  //   );
  //   socket.onmessage = (event) => {
  //     const data = JSON.parse(event.data);
  //     console.log(data);
  //     const postsOnPage = [];
  //   };
  // }, []);

  // modal
  const [isModal, setIsModal] = useState(false);
  const [idForModal, setIdForModal] = useState(null);
  const openModal = (id) => {
    setIsModal(true);
    setIdForModal(id);
  };
  const closeModal = () => {
    setIsModal(false);
    setIdForModal(null);
  };
  // endModal
  const skeletonArr = new Array(8).fill("skelet");
  return (
    <Grid container justifyContent="center">
      {cards.length > 0
        ? cards.map((e, inx) => {
            return (
              <Grid
                item
                key={inx}
                className={huo}
                style={{ position: "relative" }}
              >
                <Card className={root} style={{ position: "relative" }}>
                  <Box className={bdy} justifyContent="center" style={{}}>
                    <Box component="div" display="inline" p={1} m={1}>
                      <Typography
                        variant="h6"
                        style={{
                          fontFamily: "Quicksand, sans-serif",
                        }}
                      >
                        {e.coinName}
                      </Typography>
                      <div className={ticker}>{e.ticker}</div>
                    </Box>
                    <Box component="div" display="inline" p={1} m={1}>
                      <img src={e.img_link} alt={e.name} />
                    </Box>
                  </Box>
                  <CardContent>
                    <Typography
                      variant="body1"
                      component="p"
                      style={{ fontFamily: "Quicksand, sans-serif" }}
                    >
                      {e.message}
                    </Typography>
                  </CardContent>
                  <Grid container spacing={3} style={{ padding: 10 }}>
                    <Grid item xs={4}>
                      <Paper className={paper} elevation={0} square>
                        before: {e.price}$
                      </Paper>
                    </Grid>
                    <Grid item xs={4}>
                      <Paper
                        className={paper}
                        style={
                          e.change > 0
                            ? { color: "#27d030" }
                            : { color: "#f50057" }
                        }
                        elevation={0}
                        square
                      >
                        {e.change}%
                      </Paper>
                    </Grid>
                    <Grid item xs={4}>
                      <Paper className={paper} elevation={0} square>
                        after: {e.currPrice || cards.currPrice}$
                      </Paper>
                    </Grid>
                  </Grid>
                  <CardActions className={bdy}>
                    <a href={e.cg_link}>
                      <img
                        style={{ width: 40 }}
                        alt="Qries"
                        src="https://static.coingecko.com/s/thumbnail-007177f3eca19695592f0b8b0eabbdae282b54154e1be912285c9034ea6cbaf2.png"
                      />
                    </a>
                    <a href={e.tg_link}>
                      <img
                        style={{ width: 40 }}
                        alt="Qries"
                        src="https://upload.wikimedia.org/wikipedia/commons/thumb/8/82/Telegram_logo.svg/240px-Telegram_logo.svg.png"
                      />
                    </a>
                    <InfoOutlinedIcon
                      onClick={() => openModal(e.id)}
                      style={{ width: 42, height: 42, cursor: "pointer" }}
                    >
                      info
                    </InfoOutlinedIcon>
                  </CardActions>
                  <Box className={bdy} style={{ padding: 10 }}>
                    <Typography style={{ fontFamily: "Quicksand, sans-serif" }}>
                      {e.date}
                    </Typography>
                    <Typography style={{ fontFamily: "Quicksand, sans-serif" }}>
                      {e.tags}
                    </Typography>
                  </Box>
                </Card>
              </Grid>
            );
          })
        : skeletonArr.map((e, inx) => {
            return (
              <Grid
                item
                key={inx}
                className={huo}
                style={{ position: "relative" }}
              >
                <Card className={root} style={{ position: "relative" }}>
                  <Box className={bdy} justifyContent="center" style={{}}>
                    <Box component="div" display="inline" p={1} m={1}>
                      <Typography
                        variant="h6"
                        style={{
                          fontFamily: "Quicksand, sans-serif",
                        }}
                      >
                        <Skeleton
                          style={{ background: "#ffeddb14" }}
                          variant="rect"
                          width={100}
                          height={31}
                        />
                      </Typography>
                      <div className={ticker}>
                        <Skeleton
                          style={{ background: "#ffeddb14", marginTop: "5px" }}
                          variant="rect"
                          width={50}
                          height={16}
                        />
                      </div>
                    </Box>
                    <Box component="div" display="inline" p={1} m={1}>
                      <Skeleton
                        style={{ background: "#ffeddb14" }}
                        variant="circle"
                        width={50}
                        height={50}
                      />
                    </Box>
                  </Box>
                  <CardContent>
                    <Typography
                      variant="body1"
                      component="p"
                      style={{ fontFamily: "Quicksand, sans-serif" }}
                    >
                      <Skeleton
                        style={{ background: "#ffeddb14" }}
                        variant="text"
                      />
                      <Skeleton
                        style={{ background: "#ffeddb14" }}
                        variant="text"
                      />
                    </Typography>
                  </CardContent>
                  <Grid container spacing={3} style={{ padding: 10 }}>
                    <Grid item xs={4}>
                      <Paper className={paper} elevation={0} square>
                        <Skeleton
                          style={{ background: "#ffeddb14" }}
                          variant="rect"
                          width={110}
                          height={24}
                        />
                      </Paper>
                    </Grid>
                    <Grid item xs={4}>
                      <Paper className={paper} elevation={0} square>
                        <Skeleton
                          style={{ background: "#ffeddb14" }}
                          variant="rect"
                          width={110}
                          height={24}
                        />
                      </Paper>
                    </Grid>
                    <Grid item xs={4}>
                      <Paper className={paper} elevation={0} square>
                        <Skeleton
                          style={{ background: "#ffeddb14" }}
                          variant="rect"
                          width={110}
                          height={24}
                        />
                      </Paper>
                    </Grid>
                  </Grid>
                  <CardActions className={bdy}>
                    <Skeleton
                      style={{ background: "#ffeddb14" }}
                      variant="circle"
                      width={40}
                      height={40}
                    />
                    <Skeleton
                      style={{ background: "#ffeddb14" }}
                      variant="circle"
                      width={40}
                      height={40}
                    />
                    <Skeleton
                      style={{ background: "#ffeddb14" }}
                      variant="circle"
                      width={40}
                      height={40}
                    />
                  </CardActions>
                  <Box className={bdy} style={{ padding: 10 }}>
                    <Skeleton
                      style={{ background: "#ffeddb14" }}
                      variant="text"
                      width={50}
                    />
                    <Skeleton
                      style={{ background: "#ffeddb14" }}
                      variant="text"
                      width={50}
                    />
                  </Box>
                </Card>
              </Grid>
            );
          })}

      <PostModal postId={idForModal} isOpen={isModal} close={closeModal} />
    </Grid>
  );
};
