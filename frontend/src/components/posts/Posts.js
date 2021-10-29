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
      // filter related states
      filter: false,
      fromDate: null,
      toDate: null,
    };
  }
  componentDidMount() {
    this.getCardsData();
  }
  getCardsData() {
    const { filter, page, fromDate, toDate } = this.state;
    let url = `api/posts/?page=${page}${filter ? "&tag=" + filter : ""}${
      fromDate ? "&from=" + fromDate : ""
    }${toDate ? "&to=" + toDate : ""}`;
    FetchDataForCards(url).then((res) =>
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
  handleFilter(parfilter, parFromDate, parToDate) {
    const { filter, fromDate, toDate } = this.state;
    if (
      filter !== parfilter ||
      fromDate !== parFromDate ||
      toDate !== parToDate
    ) {
      this.skeletRender();
      this.setState(
        {
          filter: parfilter,
          // .toJSON() converts time to UTC
          fromDate: parFromDate ? parFromDate.toJSON().split("T")[0] : null,
          toDate: parToDate ? parToDate.toJSON().split("T")[0] : null,
          page: 1,
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
