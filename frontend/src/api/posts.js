import axios from "axios";

export const fetchPosts = async ({ queryKey }) => {
  const [_, page, filter, fromDate, toDate] = queryKey;
  const url = `api/posts/?page=${page}${filter ? "&tag=" + filter : ""}${
    fromDate ? "&from=" + fromDate : ""
  }${toDate ? "&to=" + toDate : ""}`;
  const data = await axios.get(url);
  return data;
};

export const fetchFeedPosts = async ({ queryKey }) => {
  const [_, page, token] = queryKey;

  const headers = { headers: { Authorization: `Token ${token}` } };
  const url = `api/feed/?page=${page}`;
  const data = await axios.get(url, token && headers);
  return data;
};

export const fetchPostModal = async ({ queryKey }) => {
  const [_, postId] = queryKey;
  const url = `api/posts/${postId}/`;
  const data = await axios.get(url);
  return data;
};
