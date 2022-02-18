import React, { useState } from "react";
import { Redirect } from "react-router-dom";

import PageNav from "../Layout/PageNav";
import Cards from "./Cards";
import Filter from "./Filter";

import useFilterPosts from "../../hooks/useFilterPosts";
import { useStateValue } from "../../contextAuth";
import useChangePage from "../../hooks/useChangePage";
import { fetchFeedPosts } from "../../api/posts";
import { useQuery } from "react-query";

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
    <div>
      {!isAuth && isLoaded && <Redirect to="/" />}
      <Cards isDataLoaded={!isFetching && isLoaded} page={page} cards={posts} />
      <PageNav page={page} numOfPages={pageNum} onChange={handlePage} />
      <Filter handleFilter={handleFilter} />
    </div>
  );
};

export default UserFeed;
