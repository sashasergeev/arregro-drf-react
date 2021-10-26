import React, { useState, useEffect } from "react";
import { FetchDataForCards } from "../other/FetchDataForCards";

import { Redirect } from "react-router-dom";
import PageNav from "../Layout/PageNav";
import Cards from "./Cards";
import { useStateValue } from "../../context";

const skelet = new Array(8).fill("skelet");

const UserFeed = () => {
  const [posts, setPosts] = useState(skelet);
  const [page, setPage] = useState(1);
  const [numOfPages, setNumOfPages] = useState(1);

  // get auth data
  const [{ token, isAuth, isLoaded }] = useStateValue();

  useEffect(() => {
    console.log("mount");
    if (isLoaded) {
      setPosts(skelet);
      getCardsData();
      window.scrollTo(0, 0);
    }
  }, [page, isLoaded]);
  const getCardsData = () => {
    FetchDataForCards(`api/feed/?page=${page}`, token).then((res) => {
      setPosts(res.cards);
      setNumOfPages(res.numOfPages);
    });
  };
  const handlePageChange = (e, val) => setPage(val);

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
