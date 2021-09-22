import React, { Component } from "react";
import { FetchDataForCards } from "../other/FetchDataForCards";

import { Redirect } from "react-router-dom";
import { PageNav } from "../Layout/PageNav";
import { Cards } from "./Cards";

function truncate(str, max = 50) {
  return str.length > max ? str.substr(0, max - 1) + "…" : str;
}

export class UserFeed extends Component {
  constructor(props) {
    super(props);

    this.state = {
      posts: new Array(8).fill("skelet"),
      page: 1,
      numOfPages: null,
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

export default UserFeed;
