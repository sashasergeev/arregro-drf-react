import React, { Component } from 'react'
import { Box } from '@material-ui/core';
import {Cards} from './Layout/Cards'

export class PostsByTag extends Component {
    render() {
        let postsWindow = {
            boxShadow: '#c8ecbd 0px 0px 10px',
            backgroundColor: '#3e4148'
        };
        return (
            <Box style={postsWindow}>
                <Box>
                    <Cards cards={this.props.cards}/>
                </Box>
            </Box>
        )
    }
}

export default PostsByTag
