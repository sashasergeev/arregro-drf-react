import axios from "axios";

export const fetchCoinList = async ({ queryKey }) => {
  const [_, page, token, isAuth] = queryKey;
  const headers = { headers: { Authorization: `Token ${token}` } };
  const url = `api/coins/?page=${page}`;
  const data = await axios.get(url, isAuth && headers);
  return data;
};

export const fetchCoinDetail = async ({ queryKey }) => {
  const [_, idOfCoin, token, isAuth] = queryKey;
  const headers = { headers: { Authorization: `Token ${token}` } };
  const url = `api/coins/${idOfCoin}/`;
  const data = await axios.get(url, isAuth && headers);
  return data;
};
