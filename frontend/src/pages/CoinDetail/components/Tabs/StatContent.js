import React from "react";
import { TagStatBox } from "../../../../components/Tag";
import { StatsBox } from "./styles";

import { useQuery } from "react-query";
import { fetchTagStat } from "../../../../api/tags";

const StatContent = ({ idOfCoin }) => {
  const { data: tagStat } = useQuery(
    ["tagStatByCoin", idOfCoin],
    fetchTagStat,
    {
      staleTime: 360 * 1000, // time the data is considered actual
    }
  );

  return (
    <StatsBox>
      {tagStat?.data.map((e) => (
        <TagStatBox key={e.tag} tag={e} />
      ))}
    </StatsBox>
  );
};

export default StatContent;
