import React from "react";

import { Tabs, Tab, Box } from "@mui/material";

import { styled } from "@mui/material/styles";

export const DetailTabs = styled(Tabs)({
  margin: "20px",
  borderRadius: "0 0 10px 10px",
  background: "#15181d",
  boxShadow: "inset 0px 1px 0px 0px #31324c",
  "& .MuiTabs-indicator": {
    backgroundColor: "#9c27b0",
    height: "3px",
  },
});
export const DetailTab = styled((props) => <Tab disableRipple {...props} />)(
  ({ theme }) => ({
    textTransform: "none",
    minWidth: 0,
    [theme.breakpoints.up("sm")]: {
      minWidth: 0,
    },
    fontWeight: theme.typography.fontWeightLarge,
    marginRight: theme.spacing(5),
    marginLeft: theme.spacing(5),
    color: "#454c5a",
    fontSize: "20px",
    "&:hover": {
      color: "#afaeae",
      opacity: 1,
    },
    transition: "0.2s",
    "&.Mui-selected": {
      color: "#575987",
    },
    "&.Mui-focusVisible": {
      backgroundColor: "#d1eaff",
    },
  })
);

export const StatsBox = styled(Box)({
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  flexWrap: "wrap",
});
