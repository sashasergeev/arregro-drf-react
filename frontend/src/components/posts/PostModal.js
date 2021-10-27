import React, { useEffect, useState } from "react";
import Modal from "react-modal";
import {
  Box,
  Typography,
  TableContainer,
  Table,
  TableHead,
  TableRow,
  TableBody,
} from "@mui/material";
import Skeleton from "@mui/material/Skeleton";
import CancelIcon from "@mui/icons-material/Cancel";
import axios from "axios";
import PropTypes from "prop-types";

import { StyledTableCell, usePostModalStyles, modalStyles } from "./styles";

Modal.setAppElement("#app");

// styles

// function to calculate changes in price
const calculateChange = (prev, curr) => ((curr / prev - 1) * 100).toFixed(2);

export const PostModal = (props) => {
  const [data, setData] = useState({});
  const classes = usePostModalStyles();
  useEffect(() => {
    if (props.postId) {
      axios.get(`api/posts/${props.postId}`).then((res) => {
        setData(res.data);
      });
    }
  }, [props.postId]);

  const closeModal = () => {
    setData({});
    props.close();
  };

  return (
    <div>
      <Modal
        isOpen={props.isOpen}
        onRequestClose={closeModal}
        style={modalStyles}
        contentLabel="Post Information"
      >
        <div className={classes.text}>
          <Box className={classes.mainBlock}>
            {/* Container for general info */}
            <Box style={{ maxWidth: "400px" }}>
              {/* coin name and logo */}
              <Box className={classes.nameLogoBlock}>
                <Box>
                  <Typography variant="h4" className={classes.text}>
                    {data.coin?.name || (
                      <Skeleton variant="rectangular" width={225} height={25} />
                    )}
                  </Typography>
                  <div className={classes.ticker}>
                    {data.coin?.ticker || (
                      <Skeleton
                        variant="rectangular"
                        style={{ marginTop: "5px" }}
                        width={50}
                        height={20}
                      />
                    )}
                  </div>
                </Box>
                <Box sx={{ display: "flex" }}>
                  {data.coin?.img_link ? (
                    <img src={data.coin.img_link} alt={data.coin.name} />
                  ) : (
                    <Skeleton variant="circular" width={50} height={50} />
                  )}
                </Box>
              </Box>
              {/* link to socials */}
              <Box className={classes.linksBlock}>
                {data.coin?.cg_link ? (
                  <a href={data.coin.cg_link}>
                    <img
                      style={{ width: 40 }}
                      alt="Coingecko"
                      src="https://static.coingecko.com/s/thumbnail-007177f3eca19695592f0b8b0eabbdae282b54154e1be912285c9034ea6cbaf2.png"
                    />
                  </a>
                ) : (
                  <Skeleton variant="circular" width={40} height={40} />
                )}
                {data.coin?.tg_link ? (
                  <a href={data.coin.tg_link}>
                    <img
                      style={{ width: 40 }}
                      alt="Telegram"
                      src="https://upload.wikimedia.org/wikipedia/commons/thumb/8/82/Telegram_logo.svg/240px-Telegram_logo.svg.png"
                    />
                  </a>
                ) : (
                  <Skeleton variant="circular" width={40} height={40} />
                )}
              </Box>
              {/* price table */}
              <Box sx={{ mb: "10px" }}>
                <TableContainer>
                  {data.price ? (
                    <Table size="small">
                      <TableHead>
                        <TableRow>
                          <StyledTableCell align="center">
                            0 point
                          </StyledTableCell>
                          <StyledTableCell align="center">1 hr</StyledTableCell>
                          <StyledTableCell align="center">2 hr</StyledTableCell>
                          <StyledTableCell align="center">
                            current
                          </StyledTableCell>
                        </TableRow>
                      </TableHead>
                      <TableBody>
                        <TableRow>
                          <StyledTableCell align="center">
                            {data.price}
                          </StyledTableCell>
                          <StyledTableCell align="center">
                            {data.price1hr}
                          </StyledTableCell>
                          <StyledTableCell align="center">
                            {data.price2hr}
                          </StyledTableCell>
                          <StyledTableCell align="center">
                            {data.coin.currPrice}
                          </StyledTableCell>
                        </TableRow>
                        <TableRow>
                          <StyledTableCell align="center">
                            Change
                          </StyledTableCell>
                          <StyledTableCell align="center">
                            {data.price1hr && (
                              <span
                                style={
                                  calculateChange(data.price, data.price1hr) > 0
                                    ? { color: "#27d030" }
                                    : { color: "#f50057" }
                                }
                              >
                                {calculateChange(data.price, data.price1hr)}
                              </span>
                            )}
                          </StyledTableCell>
                          <StyledTableCell align="center">
                            {data.price2hr && (
                              <span
                                style={
                                  calculateChange(data.price, data.price2hr) > 0
                                    ? { color: "#27d030" }
                                    : { color: "#f50057" }
                                }
                              >
                                {calculateChange(data.price, data.price2hr)}
                              </span>
                            )}
                          </StyledTableCell>
                          <StyledTableCell align="center">
                            <span
                              style={
                                calculateChange(
                                  data.price,
                                  data.coin.currPrice
                                ) > 0
                                  ? { color: "#27d030" }
                                  : { color: "#f50057" }
                              }
                            >
                              {calculateChange(data.price, data.coin.currPrice)}
                            </span>
                          </StyledTableCell>
                        </TableRow>
                      </TableBody>
                    </Table>
                  ) : (
                    <Skeleton variant="rectangular" width={340} height={110} />
                  )}
                </TableContainer>
              </Box>
            </Box>
            {/* Container for text and tags */}
            <Box style={{ maxWidth: "400px" }}>
              <Box className={classes.titleField}>Tags</Box>
              <Box className={classes.textField}>
                {data.tag ? data.tag.join(",") : <Skeleton figure="text" />}
              </Box>
              <Box className={classes.titleField}>Message</Box>
              <Box className={classes.textField}>
                {data.message || (
                  <Skeleton figure="rect" width={340} height={60} />
                )}
              </Box>
            </Box>
          </Box>
        </div>
        <CancelIcon
          style={{ cursor: "pointer" }}
          fontSize="large"
          onClick={closeModal}
        />
      </Modal>
    </div>
  );
};

PostModal.propTypes = {
  postId: PropTypes.number,
  isOpen: PropTypes.bool,
  close: PropTypes.func.isRequired,
};

export default PostModal;
