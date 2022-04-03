import React, { lazy } from "react";
import { Route } from "react-router-dom";

const Tags = lazy(() => import("../pages/Tags"));
const Home = lazy(() => import("../pages/Home"));
const UserFeed = lazy(() => import("../pages/Feed"));
const Trending = lazy(() => import("../pages/Trending"));

export default [
  <Route key="home_page" exact path="/" component={Home} />,
  <Route key="trending_page" path="/trending" component={Trending} />,
  <Route key="tags_page" path="/tags" component={Tags} />,
  <Route key="feed_page" path="/feed" component={UserFeed} />,
];
