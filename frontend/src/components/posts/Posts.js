import React, { Component } from "react";
import Cards from "../posts/Cards";
import PageNav from "../Layout/PageNav";
import { FetchDataForCards } from "../other/FetchDataForCards";
import Filter from "./Filter";

export class Posts extends Component {
  constructor(props) {
    super(props);

    this.getCardsData = this.getCardsData.bind(this);
    this.skeletRender = this.skeletRender.bind(this);
    this.handlePageChange = this.handlePageChange.bind(this);
    this.handleFilter = this.handleFilter.bind(this);

    this.state = {
      posts: new Array(8).fill("skelet"),
      page: 1,
      numOfPages: 1,
      filter: null,
    };
  }
  componentDidMount() {
    this.getCardsData();
  }
  getCardsData() {
    FetchDataForCards(
      `api/posts/?page=${this.state.page}${
        this.state.filter ? "&tag=" + this.state.filter : ""
      }`
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
        this.skeletRender();
        window.scrollTo(0, 0);
      }
    );
  }
  handleFilter(filter) {
    if (this.state.filter !== filter) {
      this.skeletRender();
      this.setState(
        {
          filter: filter,
        },
        () => {
          this.getCardsData();
        }
      );
    }
  }
  skeletRender() {
    this.setState({
      posts: new Array(8).fill("skelet"),
    });
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
        <Filter handleFilter={this.handleFilter} />
      </div>
    );
  }
}

export default Posts;
