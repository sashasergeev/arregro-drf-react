import React, { Component } from 'react';
import axios from 'axios';
import { Grid, Box, Typography, Button } from '@material-ui/core';
import { Link } from 'react-router-dom';
import { Cards } from './Cards';
import { motion } from 'framer-motion';

export class CoinDetail extends Component {
    constructor(props) {
        super(props);
        this.state = {
            idOfCoin: props.location.search.split('=')[1],
            coinInfo: null,
            follow: false
        };
        this.followUnfollow = this.followUnfollow.bind(this);
    };
    componentDidMount() {
        this.getCoinDetails()
    };
/*     shouldComponentUpdate(nextProps, nextState) {
        return nextState.idOfCoin !== this.state.idOfCoin ? true
             : nextState.coinInfo !== this.state.coinInfo ? true
             : nextState.follow !== this.state.follow ? true
             : nextProps.isAuth !== this.props.isAuth ? true
             : false;
    }; */
    getCoinDetails () {
    if (this.props.isAuth) {
        let token = this.props.token;
        let headers = {headers: {Authorization: `Token ${token}`}};
        axios.get(`api/coins/${this.state.idOfCoin}`, headers)
        .then((res) => { 
            this.setState({
                coinInfo: res.data,
                follow : res.data.doesUserFollow
            })
        });
        return true;
    }

    axios.get(`api/coins/${this.state.idOfCoin}`)
        .then(res => {
            this.setState({
                coinInfo: res.data,
            })
        })
    }

    followUnfollow () {
        const { follow } = this.state;
        let data = {coin_id: this.state.idOfCoin, action: follow ? "unfollow" : "follow"};
        axios.post('api/coins/following/',
            data,
            {headers: {Authorization: `Token ${this.props.token}`}}
        ).then(res => this.setState({follow: !follow})).catch(err => console.log(err))
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
              x: "100vh",
              transition: { ease: 'easeInOut' }
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
        const { coinInfo, follow } = this.state
        const { isAuth } = this.props
        return (
            <motion.div
                variants={containerVariants}
                initial="hidden"
                animate="visible"
                exit="exit"
            >
                {coinInfo &&
                    <Grid 
                        container
                        justifyContent="space-evenly"
                        direction="row"
                        alignItems="center"
                        style={{backgroundColor: '#03040478 '}}
                    >
                        <Box xs={4} p={2} m={1}>
                            <Link to='/coins' style={{ textDecoration: "none"}}>
                                <Button variant="contained" style={{color:'black', fontWeight: 600, fontFamily: "Quicksand, sans-serif"}}>Back</Button>
                            </Link> 
                        </Box>

                        <Box xs={8} component="div" display="inline" p={2} m={1} >
                            <Typography variant="h5" style={{display: 'inline-block', fontFamily: "Quicksand, sans-serif"}}> 
                                {coinInfo.name}
                            </Typography>                        
                        </Box>
                        <Box xs={4} component="div" display="inline" p={2} m={1}>
                            <img src={coinInfo.img_link} alt={coinInfo.name} />                
                        </Box>

                        <Grid container justifyContent="space-evenly">
                            <a href={ coinInfo.cg_link }>
                                <img style={{width: 40}} alt="Qries" src="https://static.coingecko.com/s/thumbnail-007177f3eca19695592f0b8b0eabbdae282b54154e1be912285c9034ea6cbaf2.png"/>
                            </a>
                            {isAuth && <Button
                                    variant="outlined"
                                    style={follow ? unFollowStyles : followStyles}
                                    onClick={this.followUnfollow}
                            >
                                {follow ? 'Unfollow' : 'Follow'}
                            </Button>}
                            <a href={ coinInfo.tg_link }>
                                <img style={{width: 40}} alt="Qries" src="https://upload.wikimedia.org/wikipedia/commons/thumb/8/82/Telegram_logo.svg/240px-Telegram_logo.svg.png"/>
                            </a>
                        </Grid>
                        <Box 
                            m={5}
                            bgcolor="#8894afbd"
                        >
                            <Cards cards={coinInfo.posts}/>
                        </Box>
                    </Grid>
                }
            </motion.div>

        );
    };
}

export default CoinDetail
