import React, { useState } from "react";
import { Redirect } from "react-router-dom";
import axios from "axios";

import PageNav from "../Layout/PageNav";
import Cards from "./Cards";

import { useStateValue } from "../../contextAuth";
import useChangePage from "../../hooks/useChangePage";
import { useQuery } from "react-query";

const UserFeed = () => {
  const [posts, setPosts] = useState(new Array(8).fill("skelet"));
  const [page, setPage] = useState(1);
  const [numOfPages, setNumOfPages] = useState(1);

  // get auth data
  const [{ token, isAuth, isLoaded }] = useStateValue();

  // HANDLE DATA FETCH AND CHANGE OF PAGE
  const fetchFeedPosts = async () => {
    const headers = { headers: { Authorization: `Token ${token}` } };
    const url = `api/feed/?page=${page}`;
    const data = await axios.get(url, token && headers);
    return data;
  };

  const { isFetched } = useQuery(["postsFeed", page], fetchFeedPosts, {
    onSuccess: (data) => {
      window.scroll(0, 0);
      setPosts(data.data.results);
      setNumOfPages(Math.ceil(data.data.count / 8));
    },
    enabled: isLoaded,
  });
  const { handlePageChange } = useChangePage(setPage);
  return (
    <div>
      {!isAuth && isLoaded && <Redirect to="/" />}
      <Cards isDataLoaded={isFetched} cards={posts} />
      <PageNav
        page={page}
        numOfPages={numOfPages}
        onChange={handlePageChange}
      />
    </div>
  );
};

export default UserFeed;
