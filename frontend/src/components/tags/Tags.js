import React, { useEffect, useState } from "react";
import axios from "axios";
import { Grid, Typography, Box, Button } from "@mui/material";
import {
  FilterBox,
  TagBox,
  TagTitleBox,
  TagDataBox,
  DateButton,
} from "./styles";

export const Tags = () => {
  const [tags, setTags] = useState([]);
  const [dateFilter, setDateFilter] = useState("ALL TIME");

  useEffect(() => {
    let url =
      dateFilter !== "ALL TIME"
        ? `api/tags/stat/?date=${dateFilter}`
        : "api/tags/stat/";
    axios.get(url).then((res) => setTags(res.data));
  }, [dateFilter]);

  const changeFilter = (e) => setDateFilter(e.target.outerText);

  return (
    <div style={{ padding: 15 }}>
      <FilterBox>
        {/* <Typography>FILTER</Typography> */}
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
      <Grid container justifyContent="center" spacing={2}>
        {tags.map((e) => {
          return (
            <TagBox key={e.tag}>
              <TagTitleBox>{e.tag}</TagTitleBox>
              <TagDataBox>
                <Box>Post count: {e.count}</Box>
                <Box>1 Hour Average: {e.oneHrChangeAvg?.toFixed(2)}%</Box>
                <Box>2 Hours Average: {e.twoHrChangeAvg?.toFixed(2)}%</Box>
              </TagDataBox>
            </TagBox>
          );
        })}
      </Grid>
    </div>
  );
};

export default Tags;
