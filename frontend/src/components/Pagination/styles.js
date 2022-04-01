import makeStyles from "@mui/styles/makeStyles";

export const useStyles = makeStyles(() => ({
  root: {
    "& ul > li:not(:first-child):not(:last-child) > button:not(.Mui-selected)":
      {
        backgroundColor: "#151c29",
        color: "#abababb5",
      },
    "& .Mui-selected": {
      backgroundColor: "#121723",
      color: "#2ecd2d",
    },
    "& .MuiPaginationItem-outlined": {
      border: "1px solid rgba(0, 0, 0, 0.23)",
    },
    "& .MuiSvgIcon-root": {
      fill: "#0e4bc3",
    },
  },
}));
