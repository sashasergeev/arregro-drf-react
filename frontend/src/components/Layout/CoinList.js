import React, { Component } from 'react';
import { Card, Typography, Grid, Box, Button } from '@material-ui/core';
import SearchIcon from '@material-ui/icons/Search'
import { Link } from 'react-router-dom';


import { motion } from 'framer-motion';
import axios from 'axios';

import { PageNav } from './PageNav';

export class CoinList extends Component {
    constructor(props) {
        super(props);
        this.state = {
            coins: [],
            page: 1,
            numOfPages: null
        };

        this.handlePageChange = this.handlePageChange.bind(this);
        this.getCoinData = this.getCoinData.bind(this);
        this.followUnfollowMain = this.followUnfollowMain.bind(this);
    };


    componentDidMount () {
        this.getCoinData()
    };
    
    
    
    getCoinData () {
        // IF USER IS AUTH< THEN TAKE TOKEN 
        if (this.props.isAuth) {
            let token = this.props.token;
            let headers = {headers: {Authorization: `Token ${token}`}}
            axios.get(`api/coins/?page=${this.state.page}`, headers)
            .then((res) => {
                this.setState({
                    coins: res.data.results,
                    numOfPages: Math.ceil(res.data.count / 8)
                })
            });
            return true;
        }
        axios.get(`api/coins/?page=${this.state.page}`)
        .then((res) => {
            this.setState({
                coins: res.data.results,
                numOfPages: Math.ceil(res.data.count / 8)
            })
        });
    };

    followUnfollowMain (e) {
        let items = [...this.state.coins];
        let item = {...items[e-1]};
        let data = {coin_id: e, action: item.doesUserFollow ? "unfollow" : "follow"};
        item.doesUserFollow = !item.doesUserFollow;
        items[e-1] = item
        this.setState({
            coins: items
        })
        axios.post('api/coins/following/',
            data,
            {headers: {Authorization: `Token ${this.props.token}`}}
        ).catch(err => console.log(err))
    }

    handlePageChange(event, value) {
        this.setState(
          {
            page: value,
          },
          () => {
            this.getCoinData();
          }
        );
    };


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

            }
          };
        const unFollowStyles = {
            background: '#c21d5112',
            color: '#c21d51',
            border: '1px solid #c21d51',
        };
        const followStyles = {
            background: '#32cd3212',
            color: '#32cd32',
            border: '1px solid #52b788',
        };

        const { coins, page, numOfPages } = this.state;
        const { isAuth } = this.props
        return (
            <motion.div
                variants={containerVariants}
                initial="hidden"
                animate="visible"
                exit="exit"
            >
                <Grid container justifyContent="center" spacing={2} style={{paddingTop:25, paddingBottom: 15}}>
                    {coins && coins.map((e, inx) => {
                        return (
                            <Grid key={inx} item>
                                <Card  style={{ width: 400, backgroundColor: '#040d1b6b', color: 'white'}} elevation={0}>
                                    <Grid  container justifyContent="space-between" direction="row" alignItems="center">
                                        <Link to={`coins/coin?id=${e.id}`} style={{color: 'white'}}>
                                        <Box component="div" display="inline" p={1} m={1}>
                                            <Typography variant="h6" style={{display: 'inline-block', fontFamily: "Quicksand, sans-serif"}}> 
                                                {e.name}
                                            </Typography>                                    
                                        </Box>
                                        </Link>
                                        { isAuth && <Button
                                            variant="outlined"
                                            sx={{padding: 2}}
                                            style={e.doesUserFollow ? unFollowStyles : followStyles}
                                            onClick={() => this.followUnfollowMain(e.id)}
                                        >
                                            {e.doesUserFollow ? 'Unfollow' : 'Follow'}
                                        </Button>}
                                        <Box component="div" display="inline" p={1} m={1}>
                                            <img src={e.img_link} alt={e.name} />                
                                        </Box>
                                    </Grid>
                                </Card>
                            </Grid>
                            )
                        })}
                </Grid>
                <PageNav page={page} numOfPages={numOfPages} onChange={this.handlePageChange}/>
            </motion.div>
        )
    }
}

export default CoinList
