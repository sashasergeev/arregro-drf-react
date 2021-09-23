import React, { Component } from "react";
import { Box } from "@material-ui/core";
import Cards from "../posts/Cards";
import PropTypes from "prop-types";

export class PostsByTag extends Component {
  render() {
    let postsWindow = {
      boxShadow: "#c8ecbd 0px 0px 10px",
      backgroundColor: "#3e4148",
    };
    return (
      <Box style={postsWindow}>
        <Box>
          <Cards cards={this.props.cards} />
        </Box>
      </Box>
    );
  }
}
PostsByTag.propTypes = {
  cards: PropTypes.array,
};

export default PostsByTag;
