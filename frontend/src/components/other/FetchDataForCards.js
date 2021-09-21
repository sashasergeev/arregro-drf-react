import axios from "axios";

const truncate = (str, max = 50) => {
  return str.length > max ? str.substr(0, max - 1) + "…" : str;
};

export const FetchDataForCards = async (url, token) => {
  let cardData;
  let numOfPages;
  const headers = { headers: { Authorization: `Token ${token}` } };

  const data = await axios
    .get(url, token && headers)
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
    })
    .then(() => {
      return { cards: cardData, numOfPages };
    });
  return data;
};
