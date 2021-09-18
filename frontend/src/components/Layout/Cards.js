import React, { useState } from "react";
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
    padding: "20px",
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
});

export const Cards = (props) => {
  const { huo, root, bdy, paper } = useStyles();
  const cards = props.cards;

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
  return (
    <Grid container justifyContent="center">
      {cards &&
        cards.map((e, inx) => {
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
                        display: "inline-block",
                        fontFamily: "Quicksand, sans-serif",
                      }}
                    >
                      {e.coinName}
                    </Typography>
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
                      after: {e.currPrice}$
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
        })}
      <PostModal postId={idForModal} isOpen={isModal} close={closeModal} />
    </Grid>
  );
};
