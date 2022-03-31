import React, { useState } from "react";
import { useQuery } from "react-query";
import TagElem from "./TagElem";

import { FilterBox, TagListBox, TagContainer, DateButton } from "./styles";

import { fetchTagStat } from "../../api/tags";

export const Tags = () => {
  const periods = ["TODAY", "MONTH", "YEAR", "ALL TIME"];
  const [dateFilter, setDateFilter] = useState("ALL TIME");

  const { data: tags } = useQuery(["tagStat", dateFilter], fetchTagStat, {
    select: (data) => data.data,
  });

  const changeFilter = (e) => setDateFilter(e.target.outerText);

  return (
    <TagContainer>
      <FilterBox>
        {periods.map((e) => (
          <DateButton
            key={e}
            onClick={changeFilter}
            iscurr={dateFilter === e ? "true" : "false"}
          >
            {e}
          </DateButton>
        ))}
      </FilterBox>
      <TagListBox>
        {tags &&
          tags.map((e) => {
            return <TagElem key={e.tag} tag={e} />;
          })}
      </TagListBox>
    </TagContainer>
  );
};

export default Tags;
