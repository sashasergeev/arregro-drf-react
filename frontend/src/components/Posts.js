import React, { Component } from "react";
import { Cards } from "./Layout/Cards";
import axios from "axios";
import PostModal from "./Layout/PostModal";
import { PageNav } from "./Layout/PageNav";

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
    let cardData;
    let numOfPages;

    axios.get(`api/posts/?page=${this.state.page}`).then((res) => {
      numOfPages = Math.ceil(res.data.count / 8);

      cardData = res.data.results.map((e) => ({
        id: e.id,
        coinName: e.coin.name,
        ticker: e.coin.ticker,
        tg_link: e.coin.tg_link,
        cg_link: e.coin.cg_link,
        img_link: e.coin.img_link,
        date: e.date_added,
        message: truncate(e.message),
        currPrice: e.coin.currPrice,
        price: e.price,
        change: ((e.coin.currPrice / e.price - 1) * 100).toFixed(2),
        tags: e.tag.join(", "),
      }));
      this.setState({
        posts: [...cardData],
        numOfPages: numOfPages,
      });
    });
  }

  handlePageChange(event, value) {
    this.setState(
      {
        page: value,
      },
      () => {
        this.getCardsData();
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
