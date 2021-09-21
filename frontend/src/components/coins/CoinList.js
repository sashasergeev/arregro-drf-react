import React, { Component } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";

import { Card, Typography, Grid, Box, Button } from "@material-ui/core";
import SearchIcon from "@material-ui/icons/Search";
import Skeleton from "@material-ui/lab/Skeleton";

import { PageNav } from "../Layout/PageNav";
import { FetchCoinData } from "../other/FetchCoinData";
import axios from "axios";

export class CoinList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      coins: [],
      page: 1,
      numOfPages: null,
    };

    this.handlePageChange = this.handlePageChange.bind(this);
    this.getCoinData = this.getCoinData.bind(this);
    this.followUnfollowMain = this.followUnfollowMain.bind(this);
  }

  componentDidMount() {
    this.getCoinData();
  }

  getCoinData() {
    FetchCoinData(
      `api/coins/?page=${this.state.page}`,
      this.props.isAuth,
      this.props.token
    ).then((res) => {
      this.setState({
        coins: res.coins,
        numOfPages: res.numOfPages,
      });
    });
  }

  followUnfollowMain(coin_id, e) {
    let items = [...this.state.coins];
    let item = { ...items[e] };
    let data = {
      coin_id: coin_id,
      action: item.doesUserFollow ? "unfollow" : "follow",
    };
    item.doesUserFollow = !item.doesUserFollow;
    items[e] = item;
    this.setState({
      coins: items,
    });
    axios
      .post("api/coins/following/", data, {
        headers: { Authorization: `Token ${this.props.token}` },
      })
      .catch((err) => console.log(err));
  }

  handlePageChange(event, value) {
    this.setState(
      {
        page: value,
      },
      () => {
        this.getCoinData();
        window.scrollTo(0, 0);
      }
    );
  }

  render() {
    const containerVariants = {
      hidden: {
        opacity: 0,
      },
      visible: {
        opacity: 1,
      },
      exit: {
        x: "-100vh",
        opacity: 0,
      },
    };
    const unFollowStyles = {
      background: "#c21d5112",
      color: "#c21d51",
      border: "1px solid #c21d51",
      padding: "2px 4px",
    };
    const followStyles = {
      padding: "2px 4px",
      background: "#32cd3212",
      color: "#32cd32",
      border: "1px solid #52b788",
    };

    const { coins, page, numOfPages } = this.state;
    const { isAuth } = this.props;
    const skeletonArr = new Array(8).fill("skelet");
    return (
      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        exit="exit"
      >
        <Grid
          container
          justifyContent="center"
          spacing={2}
          style={{ paddingTop: 25, paddingBottom: 15 }}
        >
          {coins.length > 0
            ? coins.map((e, inx) => {
                return (
                  <Grid key={inx} item>
                    <Card
                      style={{
                        width: 350,
                        backgroundColor: "#040d1b6b",
                        color: "white",
                        padding: "13px",
                      }}
                      elevation={0}
                    >
                      <Grid
                        container
                        justifyContent="space-between"
                        direction="row"
                        alignItems="center"
                      >
                        <Link
                          to={`coins/coin?id=${e.id}`}
                          style={{ color: "white", textDecoration: "none" }}
                        >
                          <Box component="div" display="inline">
                            <Typography
                              variant="h6"
                              style={{
                                display: "inline-block",
                                fontFamily: "Quicksand, sans-serif",
                              }}
                            >
                              {e.name}
                            </Typography>
                            <div
                              style={{
                                color: "#95969a",
                                fontWeight: "600",
                                fontSize: "13px",
                              }}
                            >
                              {e.ticker}
                            </div>
                          </Box>
                        </Link>
                        {isAuth && (
                          <Button
                            variant="outlined"
                            style={
                              e.doesUserFollow ? unFollowStyles : followStyles
                            }
                            onClick={() => this.followUnfollowMain(e.id, inx)}
                          >
                            {e.doesUserFollow ? "Unfollow" : "Follow"}
                          </Button>
                        )}
                        <Box component="div" display="inline">
                          <img src={e.img_link} alt={e.name} />
                        </Box>
                      </Grid>
                    </Card>
                  </Grid>
                );
              })
            : skeletonArr.map((e, inx) => {
                return (
                  <Grid key={inx} item>
                    <Card
                      style={{
                        width: 350,
                        backgroundColor: "#040d1b6b",
                        color: "white",
                        padding: "13px",
                      }}
                      elevation={0}
                    >
                      <Grid
                        container
                        justifyContent="space-between"
                        direction="row"
                        alignItems="center"
                      >
                        <Box component="div" display="inline">
                          <Typography
                            variant="h6"
                            style={{
                              display: "inline-block",
                              fontFamily: "Quicksand, sans-serif",
                            }}
                          >
                            <Skeleton variant="rect" width={120} height={32} />
                          </Typography>
                          <div
                            style={{
                              color: "#95969a",
                              fontWeight: "600",
                              fontSize: "13px",
                            }}
                          >
                            <Skeleton
                              variant="rect"
                              width={70}
                              height={20}
                              style={{ marginTop: "5px" }}
                            />
                          </div>
                        </Box>

                        <Box component="div" display="inline">
                          <Skeleton variant="circle" width={50} height={50} />
                        </Box>
                      </Grid>
                    </Card>
                  </Grid>
                );
              })}
        </Grid>
        <PageNav
          page={page}
          numOfPages={numOfPages}
          onChange={this.handlePageChange}
        />
      </motion.div>
    );
  }
}

export default CoinList;
