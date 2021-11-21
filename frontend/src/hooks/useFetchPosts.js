import axios from "axios";

const useFetchPosts = () => {
  return async (url, token) => {
    let numOfPages;
    const headers = { headers: { Authorization: `Token ${token}` } };

    const data = await axios.get(url, token && headers).then((res) => {
      numOfPages = Math.ceil(res.data.count / 8);
      return { cards: res.data.results, numOfPages };
    });
    return data;
  };
};

export default useFetchPosts;
