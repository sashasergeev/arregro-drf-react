import React, { useState, useEffect } from "react";
import Cards from "../posts/Cards";
import PageNav from "../Layout/PageNav";
import Filter from "./Filter";
import { NewPostAlert } from "./styles";

import useChangePage from "../../hooks/useChangePage";
import { fetchPosts } from "../../api/posts";

import { useQuery } from "react-query";
import useFilterPosts from "../../hooks/useFilterPosts";

const Posts = () => {
  const [posts, setPosts] = useState(new Array(8).fill("skelet"));
  const [newPost, setNewPost] = useState(0);
  const { page, setPage, handlePage, pageNum, setPageNum } = useChangePage();

  // filter state
  const { filter, clearFilter, handleFilter } = useFilterPosts(setPage);

  useEffect(() => {
    const newPostWS = new WebSocket(
      (window.location.protocol === "http:" ? "ws://" : "wss://") +
        window.location.host +
        "/ws/new-post/"
    );
    newPostWS.onmessage = (e) => setNewPost(newPost + 1);
    return () => newPostWS.close();
  }, []);

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
    setNewPost(0);

    if (page === 1) refetch();
    else setPage(1);
  };

  return (
    <div>
      {newPost > 0 && (
        <NewPostAlert onClick={refresh}>
          {newPost} new {newPost > 1 ? "posts" : "post"}. Tap to refresh.
        </NewPostAlert>
      )}

      <Cards isDataLoaded={!isFetching} cards={posts} page={page} />
      <PageNav page={page} numOfPages={pageNum} onChange={handlePage} />
      <Filter handleFilter={handleFilter} />
    </div>
  );
};

export default Posts;
