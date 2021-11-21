import React, { useState } from "react";
import { Redirect } from "react-router-dom";

import PageNav from "../Layout/PageNav";
import Cards from "./Cards";

import { useStateValue } from "../../contextAuth";
import useChangePage from "../../hooks/useChangePage";
import useFetchData from "../../hooks/useFetchData";

const skelet = new Array(8).fill("skelet");

const UserFeed = () => {
  const [posts, setPosts] = useState(skelet);
  const [page, setPage] = useState(1);
  const [numOfPages, setNumOfPages] = useState(1);

  // get auth data
  const [{ token, isAuth, isLoaded }] = useStateValue();

  const skeletRender = () => setPosts(skelet);
  const getCardsData = useFetchData(
    `api/feed/?page=${page}`,
    "post",
    setPosts,
    setNumOfPages,
    { token }
  );
  // HANDLE DATA FETCH AND CHANGE OF PAGE
  const { handlePageChange } = useChangePage(
    getCardsData,
    skeletRender,
    setPage,
    {
      page,
      isLoaded,
    }
  );
  return (
    <div>
      {!isAuth && isLoaded && <Redirect to="/" />}
      <Cards cards={posts} />
      <PageNav
        page={page}
        numOfPages={numOfPages}
        onChange={handlePageChange}
      />
    </div>
  );
};

export default UserFeed;
