import React, { useState } from "react";

import QueryStatsIcon from "@mui/icons-material/QueryStats";
import FilterNoneOutlinedIcon from "@mui/icons-material/FilterNoneOutlined";

import Cards from "../../../../components/posts/Cards";
import { DetailTabs, DetailTab } from "./styles";

import StatContent from "./StatContent";

const Tabs = ({ isFetched, posts, idOfCoin }) => {
  const [tab, setTab] = useState(0);

  const handleTabChange = (_, newValue) => {
    setTab(newValue);
  };

  return (
    <>
      {/* Case when there is posts - show them and its stats */}
      <DetailTabs
        variant="fullWidth"
        value={tab}
        onChange={handleTabChange}
        centered
      >
        <DetailTab icon={<FilterNoneOutlinedIcon />} label="POSTS" />
        <DetailTab icon={<QueryStatsIcon />} label="STATS" />
      </DetailTabs>
      {tab === 0 ? (
        <Cards isDataLoaded={isFetched} cards={posts} />
      ) : (
        <StatContent idOfCoin={idOfCoin} />
      )}
    </>
  );
};

export default Tabs;
