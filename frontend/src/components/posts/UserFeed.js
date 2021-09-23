import React, { Component } from "react";
import { FetchDataForCards } from "../other/FetchDataForCards";

import { Redirect } from "react-router-dom";
import PageNav from "../Layout/PageNav";
import Cards from "./Cards";
import PropTypes from "prop-types";

export class UserFeed extends Component {
  constructor(props) {
    super(props);

    this.state = {
      posts: new Array(8).fill("skelet"),
      page: 1,
      numOfPages: 1,
    };

    this.getCardsData = this.getCardsData.bind(this);
    this.handlePageChange = this.handlePageChange.bind(this);
  }
  componentDidMount() {
    this.getCardsData();
  }
  getCardsData() {
    FetchDataForCards(
      `api/feed/?page=${this.state.page}`,
      this.props.token
    ).then((res) =>
      this.setState({
        posts: res.cards,
        numOfPages: res.numOfPages,
      })
    );
  }
  handlePageChange(event, value) {
    this.setState(
      {
        page: value,
      },
      () => {
        this.getCardsData();
        this.setState({
          posts: new Array(8).fill("skelet"),
        });
        window.scrollTo(0, 0);
      }
    );
  }

  render() {
    const { posts, page, numOfPages } = this.state;
    return (
      <div>
        {!this.props.isAuth && <Redirect to="/" />}
        <Cards cards={posts} />
        <PageNav
          page={page}
          numOfPages={numOfPages}
          onChange={this.handlePageChange}
        />
      </div>
    );
  }
}

UserFeed.propTypes = {
  isAuth: PropTypes.bool.isRequired,
  token: PropTypes.string.isRequired,
};

export default UserFeed;
