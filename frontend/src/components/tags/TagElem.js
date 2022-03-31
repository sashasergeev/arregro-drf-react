import React from "react";
import { Box } from "@mui/material";

import {
  TagBox,
  TagTitleBox,
  TagDataBox,
  TagDataRow,
  TagChangeBox,
} from "./styles";

const TagElem = ({ tag }) => {
  return (
    <TagBox>
      <TagTitleBox>{tag.tag}</TagTitleBox>
      <TagDataBox>
        <TagDataRow>
          <Box>Post count</Box>
          <Box>{tag.count}</Box>
        </TagDataRow>
        <TagDataRow>
          <Box>1 Hour Average</Box>
          <TagChangeBox side={tag.oneHrChangeAvg > 0 ? "+" : "-"}>
            {tag.oneHrChangeAvg?.toFixed(2)}%
          </TagChangeBox>
        </TagDataRow>
        <TagDataRow>
          <Box>2 Hours Average</Box>
          <TagChangeBox side={tag.twoHrChangeAvg > 0 ? "+" : "-"}>
            {tag.twoHrChangeAvg?.toFixed(2)}%
          </TagChangeBox>
        </TagDataRow>
      </TagDataBox>
    </TagBox>
  );
};

export default TagElem;
