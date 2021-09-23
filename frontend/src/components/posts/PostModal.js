import React, { useEffect, useState } from "react";
import Modal from "react-modal";
import {
  withStyles,
  Box,
  Typography,
  TableContainer,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
} from "@material-ui/core";
import Skeleton from "@material-ui/lab/Skeleton";
import CancelIcon from "@material-ui/icons/Cancel";
import axios from "axios";
import PropTypes from "prop-types";

Modal.setAppElement("#app");

// overriding classic TableCell component
const StyledTableCell = withStyles(() => ({
  head: {
    backgroundColor: "#6547a1",
    color: "#fff",
    fontFamily: "Quicksand, sans-serif",
  },
  body: {
    backgroundColor: "#6547a1",
    fontFamily: "Quicksand, sans-serif",
    fontSize: 16,
    color: "#fff",
  },
  sizeSmall: {
    padding: "6px 6px 6px 6px",
  },
}))(TableCell);

// styles
const customStyles = {
  content: {
    top: "50%",
    left: "50%",
    right: "auto",
    bottom: "auto",
    marginRight: "-50%",
    transform: "translate(-50%, -50%)",
    backgroundColor: "#8d77b7",
    border: "none",
    fontFamily: "Quicksand, sans-serif",
    borderRadius: "7px",
  },
  overlay: {
    backgroundColor: "#6d4cadeb",
  },
  text: {
    color: "#e6e6e6",
    fontFamily: "Quicksand, sans-serif",
  },
  titleField: {
    bgcolor: "#3f51b5",
    borderRadius: "10px 10px 0px 0px",
    fontSize: "18px",
    p: "7px",
  },
  textField: {
    bgcolor: "#0096885e",
    borderRadius: "0px 0px 10px 10px",
    p: "7px",
    fontSize: "18px",
    mb: "10px",
    wordBreak: "break-word",
    maxHeight: "200px",
    overflow: "auto",
  },
  mainBlock: {
    display: "flex",
    gap: "20px",
    flexWrap: "wrap",
    justifyContent: "center",
    alignItems: "center",
  },
  nameLogoBlock: {
    bgcolor: "#683bc1",
    p: "5px 10px",
    borderRadius: "10px",
    boxShadow: "7px 7px 11px 5px #181b2247",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    gap: "20px",
    mb: "20px",
  },
  linksBlock: {
    display: "flex",
    gap: "20px",
    justifyContent: "center",
    mb: "10px",
  },
  ticker: {
    color: "#95969a",
    fontWeight: "600",
    fontSize: "15px",
  },
};

// function to calculate changes in price
const calculateChange = (prev, curr) => ((curr / prev - 1) * 100).toFixed(2);

export const PostModal = (props) => {
  const [data, setData] = useState({});

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
        style={customStyles}
        contentLabel="Post Information"
      >
        <div style={customStyles.text}>
          <Box sx={customStyles.mainBlock}>
            {/* Container for general info */}
            <Box style={{ maxWidth: "400px" }}>
              {/* coin name and logo */}
              <Box sx={customStyles.nameLogoBlock}>
                <Box>
                  <Typography variant="h4" style={customStyles.text}>
                    {(data.coin && data.coin.name) || (
                      <Skeleton variant="rect" width={225} height={25} />
                    )}
                  </Typography>
                  <div style={customStyles.ticker}>
                    {(data.coin && data.coin.ticker) || (
                      <Skeleton
                        variant="rect"
                        style={{ marginTop: "5px" }}
                        width={50}
                        height={20}
                      />
                    )}
                  </div>
                </Box>
                <Box sx={{ display: "flex" }}>
                  {data.coin && data.coin.img_link ? (
                    <img src={data.coin.img_link} alt={data.coin.name} />
                  ) : (
                    <Skeleton variant="circle" width={50} height={50} />
                  )}
                </Box>
              </Box>
              {/* link to socials */}
              <Box sx={customStyles.linksBlock}>
                {data.coin && data.coin.cg_link ? (
                  <a href={data.coin.cg_link}>
                    <img
                      style={{ width: 40 }}
                      alt="Coingecko"
                      src="https://static.coingecko.com/s/thumbnail-007177f3eca19695592f0b8b0eabbdae282b54154e1be912285c9034ea6cbaf2.png"
                    />
                  </a>
                ) : (
                  <Skeleton variant="circle" width={40} height={40} />
                )}
                {data.coin && data.coin.tg_link ? (
                  <a href={data.coin.tg_link}>
                    <img
                      style={{ width: 40 }}
                      alt="Telegram"
                      src="https://upload.wikimedia.org/wikipedia/commons/thumb/8/82/Telegram_logo.svg/240px-Telegram_logo.svg.png"
                    />
                  </a>
                ) : (
                  <Skeleton variant="circle" width={40} height={40} />
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
                    <Skeleton variant="rect" width={340} height={110} />
                  )}
                </TableContainer>
              </Box>
            </Box>
            {/* Container for text and tags */}
            <Box style={{ maxWidth: "400px" }}>
              <Box sx={customStyles.titleField}>Tags</Box>
              <Box sx={customStyles.textField}>
                {data.tag ? data.tag.join(",") : <Skeleton figure="text" />}
              </Box>
              <Box sx={customStyles.titleField}>Message</Box>
              <Box sx={customStyles.textField}>
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
