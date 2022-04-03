import axios from "axios";

const getHeaders = (token) => ({
  headers: {
    Authorization: `Token ${token}`,
  },
});

export const fetchCoinList = async ({ queryKey }) => {
  const [_, page, token, isAuth] = queryKey;
  const url = `api/coins/?page=${page}`;
  const data = await axios.get(url, isAuth && getHeaders(token));
  return data;
};

export const fetchCoinDetail = async ({ queryKey }) => {
  const [_, idOfCoin, token, isAuth] = queryKey;
  const url = `api/coins/${idOfCoin}/`;
  const data = await axios.get(url, isAuth && getHeaders(token));
  return data;
};

export const followRequest = async (data, token) => {
  const url = "api/coins/following/";
  const postFollow = await axios.post(url, data, getHeaders(token));
  return postFollow;
};

export const submitCoin = async (data) => {
  const url = "api/submit-coin/";
  const req = await axios.post(url, data);
  return req;
};
