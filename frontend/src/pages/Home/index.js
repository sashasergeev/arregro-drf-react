import React, { useState } from "react";
import { useQuery } from "react-query";

import Cards from "../../components/posts/Cards";
import Pagination from "../../components/Pagination";
import Filter from "../../components/posts/Filter";
import NewPostAlert from "./components/NewPostAlert";

import { fetchPosts } from "../../api/posts";

import useFilterPosts from "../../hooks/useFilterPosts";
import useChangePage from "../../hooks/useChangePage";

const Posts = () => {
  const [posts, setPosts] = useState(new Array(8).fill("skelet"));
  const { page, setPage, handlePage, pageNum, setPageNum } = useChangePage();

  // filter state
  const { filter, clearFilter, handleFilter } = useFilterPosts(setPage);

  const { isFetching, refetch } = useQuery(
    ["posts", page, filter],
    fetchPosts,
    {
      onSuccess: (data) => {
        window.scroll(0, 0);
        setPosts(data.data.results);
        setPageNum(Math.ceil(data.data.count / 8));
      },
    }
  );

  const refresh = () => {
    clearFilter();
    if (page === 1) refetch();
    else setPage(1);
  };

  return (
    <>
      <NewPostAlert refresh={refresh} />

      <Cards isDataLoaded={!isFetching} cards={posts} page={page} />
      <Pagination page={page} numOfPages={pageNum} onChange={handlePage} />
      <Filter handleFilter={handleFilter} />
    </>
  );
};

export default Posts;
