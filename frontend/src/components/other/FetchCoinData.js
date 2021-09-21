import axios from "axios";

export const FetchCoinData = async (url, isAuth, token, idOfCoin) => {
  const headers = { headers: { Authorization: `Token ${token}` } };

  const data = await axios.get(url, isAuth && headers).then((res) => {
    if (!idOfCoin) {
      return {
        coins: res.data.results,
        numOfPages: Math.ceil(res.data.count / 8),
      };
    } else {
      return isAuth
        ? { coinInfo: res.data, follow: res.data.doesUserFollow }
        : { coinInfo: res.data };
    }
  });
  return data;
};
