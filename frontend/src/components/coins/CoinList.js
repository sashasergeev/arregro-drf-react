import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import PropTypes from "prop-types";

import { motion } from "framer-motion";
import { Card, Typography, Grid, Box, Button } from "@material-ui/core";
import Skeleton from "@material-ui/lab/Skeleton";
import AddIcon from "@material-ui/icons/Add";

import PageNav from "../Layout/PageNav";
import Search from "./Search";
import CoinSubmitModal from "./CoinSubmitModal";
import { FetchCoinData } from "../other/FetchCoinData";
import { useStateValue } from "../../context";

// styles
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
const skeletonArr = new Array(8).fill("skelet");

export const CoinList = () => {
  // states
  const [coins, setCoins] = useState([]);
  const [page, setPage] = useState(1);
  const [numOfPages, setNumOfPages] = useState(1);
  const [coinSubmitModal, setCoinSubmitModal] = useState(false);

  // get auth data
  const [{ token, isAuth }] = useStateValue();

  // HANDLE DATA FETCH AND CHANGE OF PAGE
  useEffect(() => {
    setCoins([]);
    getCoinData();
    window.scrollTo(0, 0);
  }, [page, token]);
  const getCoinData = () => {
    FetchCoinData(`api/coins/?page=${page}`, isAuth, token).then((res) => {
      setCoins(res.coins);
      setNumOfPages(res.numOfPages);
    });
  };
  const handlePageChange = (e, val) => setPage(val);

  const followUnfollowMain = (coin_id, e) => {
    let items = [...coins];
    let item = { ...items[e] };
    let data = {
      coin_id: coin_id,
      action: item.doesUserFollow ? "unfollow" : "follow",
    };
    item.doesUserFollow = !item.doesUserFollow;
    items[e] = item;
    setCoins(items);
    axios
      .post("api/coins/following/", data, {
        headers: { Authorization: `Token ${token}` },
      })
      .catch((err) => console.log(err));
  };
  const handleModal = () => setCoinSubmitModal(!coinSubmitModal);

  return (
    <motion.div
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      exit="exit"
    >
      <CoinSubmitModal isOpen={coinSubmitModal} handleModal={handleModal} />
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
        }}
      >
        <AddIcon
          style={{ width: "50px", height: "auto", cursor: "pointer" }}
          onClick={handleModal}
        />
        <Search />
      </Box>
      <Grid
        container
        justifyContent="center"
        spacing={1}
        style={{ paddingTop: 25, paddingBottom: 15 }}
      >
        {coins.length > 0
          ? coins.map((e, inx) => {
              return (
                <Grid key={inx} item>
                  <Card
                    style={{
                      width: 335,
                      backgroundColor: "#040d1b6b",
                      color: "white",
                      padding: "11px",
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
                          onClick={() => followUnfollowMain(e.id, inx)}
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
        onChange={handlePageChange}
      />
    </motion.div>
  );
};

// export class CoinList extends Component {
//   constructor(props) {
//     super(props);
// this.state = {
//   coins: [],
//   page: 1,
//   numOfPages: 1,
//   coinSubmitModal: false,
// };

// this.handlePageChange = this.handlePageChange.bind(this);
// this.getCoinData = this.getCoinData.bind(this);
// this.followUnfollowMain = this.followUnfollowMain.bind(this);
// this.handleModal = this.handleModal.bind(this);
// }

// componentDidMount() {
//   this.getCoinData();
// }
// getCoinData() {
//   const { isAuth, token } = this.props;
//   FetchCoinData(`api/coins/?page=${this.state.page}`, isAuth, token).then(
//     (res) => {
//       this.setState({
//         coins: res.coins,
//         numOfPages: res.numOfPages,
//       });
//     }
//   );
// }
// followUnfollowMain(coin_id, e) {
//   let items = [...this.state.coins];
//   let item = { ...items[e] };
//   let data = {
//     coin_id: coin_id,
//     action: item.doesUserFollow ? "unfollow" : "follow",
//   };
//   item.doesUserFollow = !item.doesUserFollow;
//   items[e] = item;
//   this.setState({
//     coins: items,
//   });
//   axios
//     .post("api/coins/following/", data, {
//       headers: { Authorization: `Token ${this.props.token}` },
//     })
//     .catch((err) => console.log(err));
// }
// handlePageChange(event, value) {
//   this.setState(
//     {
//       page: value,
//     },
//     () => {
//       this.getCoinData();
//       this.setState({
//         coins: [],
//       });
//       window.scrollTo(0, 0);
//     }
//   );
// }

// handleModal() {
//   this.setState({
//     coinSubmitModal: !this.state.coinSubmitModal,
//   });
//   console.log("hello");
// }

//   render() {
//     const containerVariants = {
//       hidden: {
//         opacity: 0,
//       },
//       visible: {
//         opacity: 1,
//       },
//       exit: {
//         x: "-100vh",
//         opacity: 0,
//       },
//     };
//     const unFollowStyles = {
//       background: "#c21d5112",
//       color: "#c21d51",
//       border: "1px solid #c21d51",
//       padding: "2px 4px",
//     };
//     const followStyles = {
//       padding: "2px 4px",
//       background: "#32cd3212",
//       color: "#32cd32",
//       border: "1px solid #52b788",
//     };

//     const { coins, page, numOfPages } = this.state;
//     const { isAuth } = this.props;
//     const skeletonArr = new Array(8).fill("skelet");
//     return (
//       <motion.div
//         variants={containerVariants}
//         initial="hidden"
//         animate="visible"
//         exit="exit"
//       >
//         <CoinSubmitModal
//           isOpen={this.state.coinSubmitModal}
//           handleModal={this.handleModal}
//         />
//         <Box
//           sx={{
//             display: "flex",
//             justifyContent: "center",
//           }}
//         >
//           <AddIcon
//             style={{ width: "50px", height: "auto", cursor: "pointer" }}
//             onClick={this.handleModal}
//           />
//           <Search />
//         </Box>
//         <Grid
//           container
//           justifyContent="center"
//           spacing={1}
//           style={{ paddingTop: 25, paddingBottom: 15 }}
//         >
//           {coins.length > 0
//             ? coins.map((e, inx) => {
//                 return (
//                   <Grid key={inx} item>
//                     <Card
//                       style={{
//                         width: 335,
//                         backgroundColor: "#040d1b6b",
//                         color: "white",
//                         padding: "11px",
//                       }}
//                       elevation={0}
//                     >
//                       <Grid
//                         container
//                         justifyContent="space-between"
//                         direction="row"
//                         alignItems="center"
//                       >
//                         <Link
//                           to={`coins/coin?id=${e.id}`}
//                           style={{ color: "white", textDecoration: "none" }}
//                         >
//                           <Box component="div" display="inline">
//                             <Typography
//                               variant="h6"
//                               style={{
//                                 display: "inline-block",
//                               }}
//                             >
//                               {e.name}
//                             </Typography>
//                             <div
//                               style={{
//                                 color: "#95969a",
//                                 fontWeight: "600",
//                                 fontSize: "13px",
//                               }}
//                             >
//                               {e.ticker}
//                             </div>
//                           </Box>
//                         </Link>
//                         {isAuth && (
//                           <Button
//                             variant="outlined"
//                             style={
//                               e.doesUserFollow ? unFollowStyles : followStyles
//                             }
//                             onClick={() => this.followUnfollowMain(e.id, inx)}
//                           >
//                             {e.doesUserFollow ? "Unfollow" : "Follow"}
//                           </Button>
//                         )}
//                         <Box component="div" display="inline">
//                           <img src={e.img_link} alt={e.name} />
//                         </Box>
//                       </Grid>
//                     </Card>
//                   </Grid>
//                 );
//               })
//             : skeletonArr.map((e, inx) => {
//                 return (
//                   <Grid key={inx} item>
//                     <Card
//                       style={{
//                         width: 350,
//                         backgroundColor: "#040d1b6b",
//                         color: "white",
//                         padding: "13px",
//                       }}
//                       elevation={0}
//                     >
//                       <Grid
//                         container
//                         justifyContent="space-between"
//                         direction="row"
//                         alignItems="center"
//                       >
//                         <Box component="div" display="inline">
//                           <Typography
//                             variant="h6"
//                             style={{
//                               display: "inline-block",
//                             }}
//                           >
//                             <Skeleton variant="rect" width={120} height={32} />
//                           </Typography>
//                           <div
//                             style={{
//                               color: "#95969a",
//                               fontWeight: "600",
//                               fontSize: "13px",
//                             }}
//                           >
//                             <Skeleton
//                               variant="rect"
//                               width={70}
//                               height={20}
//                               style={{ marginTop: "5px" }}
//                             />
//                           </div>
//                         </Box>

//                         <Box component="div" display="inline">
//                           <Skeleton variant="circle" width={50} height={50} />
//                         </Box>
//                       </Grid>
//                     </Card>
//                   </Grid>
//                 );
//               })}
//         </Grid>
//         <PageNav
//           page={page}
//           numOfPages={numOfPages}
//           onChange={this.handlePageChange}
//         />
//       </motion.div>
//     );
//   }
// }

CoinList.propTypes = {
  isAuth: PropTypes.bool,
  token: PropTypes.string,
};

export default CoinList;
