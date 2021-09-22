import React, { Component } from "react";
import { Cards } from "../posts/Cards";
import { PageNav } from "../Layout/PageNav";
import { FetchDataForCards } from "../other/FetchDataForCards";

function truncate(str, max = 50) {
  return str.length > max ? str.substr(0, max - 1) + "…" : str;
}

export class Posts extends Component {
  constructor(props) {
    super(props);

    this.getCardsData = this.getCardsData.bind(this);
    this.handlePageChange = this.handlePageChange.bind(this);

    this.state = {
      posts: new Array(8).fill("skelet"),
      page: 1,
      numOfPages: null,
    };
  }

  componentDidMount() {
    this.getCardsData();
  }

  getCardsData() {
    FetchDataForCards(`api/posts/?page=${this.state.page}`).then((res) =>
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

export default Posts;
