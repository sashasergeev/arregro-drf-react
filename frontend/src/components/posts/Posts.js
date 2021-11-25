import React, { useState, useEffect } from "react";
import Cards from "../posts/Cards";
import PageNav from "../Layout/PageNav";
import Filter from "./Filter";
import { NewPostAlert } from "./styles";

import useChangePage from "../../hooks/useChangePage";
import { fetchPosts } from "../../api/posts";

import { useQuery } from "react-query";

const Posts = () => {
  const [posts, setPosts] = useState(new Array(8).fill("skelet"));
  const [page, setPage] = useState(1);
  const [numOfPages, setNumOfPages] = useState(1);
  // filter states
  const [filter, setFilter] = useState(false);
  const [fromDate, setFromDate] = useState(null);
  const [toDate, setToDate] = useState(null);
  const [newPost, setNewPost] = useState(0);

  useEffect(() => {
    const newPostWS = new WebSocket(
      (window.location.protocol === "http:" ? "ws://" : "wss://") +
        window.location.host +
        "/ws/new-post/"
    );
    newPostWS.onmessage = (e) => setNewPost(setNewPost + 1);
    return () => newPostWS.close();
  }, []);

  const { isFetching } = useQuery(
    ["posts", page, filter, fromDate, toDate],
    fetchPosts,
    {
      onSuccess: (data) => {
        window.scroll(0, 0);
        setPosts(data.data.results);
        setNumOfPages(Math.ceil(data.data.count / 8));
      },
    }
  );

  const handleFilter = (parfilter, parFromDate, parToDate) => {
    if (
      filter !== parfilter ||
      fromDate !== parFromDate ||
      toDate !== parToDate
    ) {
      setFilter(parfilter);
      setFromDate(parFromDate ? parFromDate.toJSON().split("T")[0] : null);
      setToDate(parToDate ? parToDate.toJSON().split("T")[0] : null);
      setPage(1);
    }
  };

  const refresh = () => {
    setFilter(false);
    setFromDate(null);
    setToDate(null);
    setNewPost(0);
    setPage(1);
  };

  // handle page change
  const { handlePageChange } = useChangePage(setPage);

  return (
    <div>
      {newPost > 0 && (
        <NewPostAlert onClick={refresh}>New post. Tap to refresh.</NewPostAlert>
      )}

      <Cards isDataLoaded={!isFetching} cards={posts} />
      <PageNav
        page={page}
        numOfPages={numOfPages}
        onChange={handlePageChange}
      />
      <Filter handleFilter={handleFilter} />
    </div>
  );
};

export default Posts;
