import React, { Component, Fragment } from 'react';
import axios from 'axios';
import { Grid, Typography, Card, Box } from '@material-ui/core';
import PostsByTag from './PostsByTag';

function truncate(str, max=50) {
    return str.length > max ? str.substr(0, max-1) + '…' : str;
  }

export class Tags extends Component {
    constructor (props) {
        super(props);
        this.state = {
            tags: [],
            currentTag: null,
            posts: []
        }
    };

    componentDidMount () {
        axios.get('api/tags')
        .then((res) => this.setState({tags: res.data}))
    };
    shouldComponentUpdate (nextProps, nextState) {
        return nextState.tags.length > this.state.tags ? true 
                : nextState.currentTag != this.state.currentTag ? true
                : false;
    };
    displayPosts (id) {
        if (this.state.currentTag && this.state.currentTag[0].id === id) {
            this.setState({
                posts: [],
                currentTag: null
            })
            return
        };
        let cardData;
        axios.get(`api/tags/${id}`)
            .then(res => {
                cardData = res.data.post_set.map(e => ({
                    coinName: e.coin.name,
                    tg_link: e.coin.tg_link,
                    cg_link: e.coin.cg_link,
                    img_link: e.coin.img_link,
                    date: e.date_added,
                    message: truncate(e.message),
                    currPrice: e.coin.currPrice,
                    price: e.price,
                    change: (((e.coin.currPrice / e.price) - 1) * 100).toFixed(2),
                    tags: e.tag.join(', ')
                }));
                this.setState({
                    posts: cardData,
                    currentTag: this.state.tags.filter(e => e.id === id)
                });
            })
    };

    render() {
        const {tags, posts} = this.state;
        const currentTag = this.state.currentTag && this.state.currentTag[0].tag
        return (
            <div style={{padding: 15}}>
                <Grid container justifyContent="center" spacing={2} >
                    {tags.map((e) => { 
                        return (
                            <Grid key={e.id} style={{cursor: 'pointer'}} item onClick={this.displayPosts.bind(this, e.id)}>
                                <Card  style={{ width: 350, backgroundColor: currentTag == e.tag ? 'white' : '#040d1b6b'}} elevation={0}>
                                    <Grid  container justifyContent="space-between" direction="row" alignItems="center" style={{color: 'gray'}}>
                                        <Box component="div" display="inline" p={1} m={1}>
                                            <Typography variant="body1" style={{display: 'inline-block', fontFamily: "Quicksand, sans-serif"}}> 
                                                {e.tag}
                                            </Typography>                                    
                                        </Box>
                                        <Box component="div" display="inline" p={1} m={1} style={{fontSize: 20, padding: '5px'}}>
                                            {e.tag_count}               
                                        </Box>
                                    </Grid>
                                </Card>
                            </Grid>
                    )})}
                </Grid>
                <div style={{paddingTop:30}}>
                    <PostsByTag cards={posts}/>
                </div>
            </div>
        )
    };
}
export default Tags
