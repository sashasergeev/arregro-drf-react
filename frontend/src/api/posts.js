import axios from "axios";

const getUrlWithFilters = () => {};

export const fetchPosts = async ({ queryKey }) => {
  const [_, page, filter] = queryKey;
  const url = `api/posts/?page=${page}${
    filter?.tag ? "&tag=" + filter.tag : ""
  }${filter?.from ? "&from=" + filter.from : ""}${
    filter?.to ? "&to=" + filter.to : ""
  }`;
  const data = await axios.get(url);
  return data;
};

export const fetchFeedPosts = async ({ queryKey }) => {
  const [_, page, token, filter] = queryKey;

  const headers = { headers: { Authorization: `Token ${token}` } };
  const url = `api/feed/?page=${page}${
    filter?.tag ? "&tag=" + filter.tag : ""
  }${filter?.from ? "&from=" + filter.from : ""}${
    filter?.to ? "&to=" + filter.to : ""
  }`;
  const data = await axios.get(url, token && headers);
  return data;
};

export const fetchPostModal = async ({ queryKey }) => {
  const [_, postId] = queryKey;
  const url = `api/posts/${postId}/`;
  const data = await axios.get(url);
  return data;
};
