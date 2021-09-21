import React, { Component } from "react";
import axios from "axios";
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
    let cardData;
    let numOfPages;
    axios
      .get(`api/feed/?page=${this.state.page}`, {
        headers: { Authorization: `Token ${this.props.token}` },
      })
      .then((res) => {
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
          posts: cardData,
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
