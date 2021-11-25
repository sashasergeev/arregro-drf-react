import React, { useState } from "react";
import { useQuery } from "react-query";

import { Box } from "@mui/material";
import {
  FilterBox,
  TagListBox,
  TagContainer,
  TagBox,
  TagTitleBox,
  TagDataBox,
  TagDataRow,
  TagChangeBox,
  DateButton,
} from "./styles";

import { fetchTagStat } from "../../api/tags";

export const Tags = () => {
  const [dateFilter, setDateFilter] = useState("ALL TIME");

  const { data: tags } = useQuery(["tagStat", dateFilter], fetchTagStat, {
    select: (data) => data.data,
  });

  const changeFilter = (e) => setDateFilter(e.target.outerText);

  return (
    <TagContainer>
      <FilterBox>
        <DateButton
          onClick={changeFilter}
          iscurr={dateFilter === "TODAY" ? "true" : "false"}
        >
          TODAY
        </DateButton>
        <DateButton
          onClick={changeFilter}
          iscurr={dateFilter === "MONTH" ? "true" : "false"}
        >
          MONTH
        </DateButton>
        <DateButton
          onClick={changeFilter}
          iscurr={dateFilter === "YEAR" ? "true" : "false"}
        >
          YEAR
        </DateButton>
        <DateButton
          onClick={changeFilter}
          iscurr={dateFilter === "ALL TIME" ? "true" : "false"}
        >
          ALL TIME
        </DateButton>
      </FilterBox>
      <TagListBox>
        {tags &&
          tags.map((e) => {
            return (
              <TagBox key={e.tag}>
                <TagTitleBox>{e.tag}</TagTitleBox>
                <TagDataBox>
                  <TagDataRow>
                    <Box>Post count</Box>
                    <Box>{e.count}</Box>
                  </TagDataRow>
                  <TagDataRow>
                    <Box>1 Hour Average</Box>
                    <TagChangeBox side={e.oneHrChangeAvg > 0 ? "+" : "-"}>
                      {e.oneHrChangeAvg?.toFixed(2)}%
                    </TagChangeBox>
                  </TagDataRow>
                  <TagDataRow>
                    <Box>2 Hours Average</Box>
                    <TagChangeBox side={e.twoHrChangeAvg > 0 ? "+" : "-"}>
                      {e.twoHrChangeAvg?.toFixed(2)}%
                    </TagChangeBox>
                  </TagDataRow>
                </TagDataBox>
              </TagBox>
            );
          })}
      </TagListBox>
    </TagContainer>
  );
};

export default Tags;
