import React, { useState } from "react";
import { Redirect } from "react-router-dom";
import { useQuery } from "react-query";

import Pagination from "../../components/Pagination";
import Cards from "../../components/posts/Cards";
import Filter from "../../components/posts/Filter";

import { fetchFeedPosts } from "../../api/posts";
import { useStateValue } from "../../contextAuth";

import useFilterPosts from "../../hooks/useFilterPosts";
import useChangePage from "../../hooks/useChangePage";

const UserFeed = () => {
  const [posts, setPosts] = useState(new Array(8).fill("skelet"));

  const { page, setPage, handlePage, pageNum, setPageNum } = useChangePage();

  const { filter, handleFilter } = useFilterPosts(setPage);

  // get auth data
  const [{ token, isAuth, isLoaded }] = useStateValue();

  // HANDLE DATA FETCH AND CHANGE OF PAGE
  const { isFetching } = useQuery(
    ["postsFeed", page, token, filter],
    fetchFeedPosts,
    {
      onSuccess: (data) => {
        window.scroll(0, 0);
        setPosts(data.data.results);
        setPageNum(Math.ceil(data.data.count / 8));
      },
      enabled: isLoaded,
    }
  );
  return (
    <>
      {!isAuth && isLoaded && <Redirect to="/" />}
      <Cards isDataLoaded={!isFetching && isLoaded} page={page} cards={posts} />
      <Pagination page={page} numOfPages={pageNum} onChange={handlePage} />
      <Filter handleFilter={handleFilter} />
    </>
  );
};

export default UserFeed;
