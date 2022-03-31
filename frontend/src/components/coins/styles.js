import makeStyles from "@mui/styles/makeStyles";
import React from "react";
import { Button, Tabs, Tab, Box } from "@mui/material";

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

export const NoPostBox = styled(Box)({
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  gap: "10px",
  fontSize: "20px",
  padding: "20px",
  backgroundColor: "#00000094",
  color: "#9d9d9d",
});

export const useSearchStyles = makeStyles((theme) => ({
  root: {
    "& .MuiOutlinedInput-root": {
      margin: theme.spacing(1),
      width: "250px",
    },
    "& .MuiInputBase-input": {
      color: "#dadada",
    },
    "& .MuiInputBase-root": {},
    "& .MuiOutlinedInput-notchedOutline": {
      borderColor: "#ffffff30",
    },
    "& .MuiFormLabel-root": {
      color: "rgb(91 117 128)",
    },
    display: "flex",
    justifyContent: "center",
    position: "relative",
  },
  dropdown: {
    "& a": {
      color: "white",
      display: "block",
      textDecoration: "none",
      padding: "5px 5px",
      "&:hover": {
        backgroundColor: "#a7a7a72e",
      },
    },
    position: "absolute",
    width: "107%",
    maxHeight: "200px",
    background: "#0e131c",
    zIndex: 100,
    top: "79px",
    right: "-9px",
    border: "1px solid rgb(139 0 239 / 33%)",
    overflow: "auto",
  },
}));

export const FollowBtnStyled = styled(Button)(({ follow }) =>
  follow
    ? {
        background: "#c21d5112",
        color: "#c21d51",
        border: "1px solid #c21d51",
        "&:hover": {
          borderColor: "#f50852",
          color: "#f50852",
          backgroundColor: "#f508521f",
        },
      }
    : {
        background: "#32cd3212",
        color: "#32cd32e0",
        border: "1px solid #52b788",
        "&:hover": {
          borderColor: "#32cd32",
          color: "#32cd32",
          backgroundColor: "#294e293b",
        },
      }
);

export const useCoinStyles = makeStyles((theme) => ({
  headerElements: {
    flexBasis: "100%",
    display: "flex",
    justifyContent: "center",
    margin: "10px 0",
  },
  secondaryDetails: {
    color: "#95969a",
    fontWeight: "600",
    fontSize: "13px",
  },
  socialImg: {
    width: 40,
  },
  coinCard: {
    width: 335,
    backgroundColor: "#040d1b6b",
    color: "white",
    padding: "11px",
  },
  coinLink: {
    color: "white",
    textDecoration: "none",
  },
  addBtn: {
    width: "50px",
    height: "auto",
    cursor: "pointer",
  },
  backBtn: {
    fontWeight: "600",
    color: "black",
  },
  StatsBox: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    flexWrap: "wrap",
  },
}));

// animation
export const containerVariants = {
  hidden: {
    opacity: 0,
  },
  visible: {
    opacity: 1,
  },
  exit: {
    x: "100vh",
    transition: { ease: "easeInOut" },
  },
  addBtn: {
    width: "50px",
    height: "auto",
    cursor: "pointer",
  },
};
export const containerVariantsEnter = {
  hidden: {
    opacity: 0,
  },
  visible: {
    opacity: 1,
  },
  exit: {
    x: "-100vh",
    transition: { ease: "easeInOut" },
  },
};

export const modalStyles = {
  content: {
    top: "50%",
    left: "50%",
    right: "auto",
    bottom: "auto",
    marginRight: "-50%",
    transform: "translate(-50%, -50%)",
    backgroundColor: "rgb(42, 43, 68)",
    border: "none",
    borderRadius: "7px",
  },
  overlay: {
    backgroundColor: "rgba(15, 7, 30, 0.93)",
  },
};

export const useCoinModalStyles = makeStyles((theme) => ({
  submitForm: {
    "& > *": {
      margin: "10px 0px",
    },
    "& .MuiOutlinedInput-root": {
      "& fieldset": {
        borderColor: "#fffefe",
      },
      "&:hover fieldset": {
        borderColor: "#a8bdb4",
      },
      "&.Mui-focused fieldset": {
        borderColor: "#7cd6ffb8",
      },
    },
    "& .MuiInputLabel-root": {
      color: "#ffffff",
    },
  },
  submitBtn: {
    backgroundColor: "#ffffff17",
    "&:hover": { backgroundColor: "#ffffff17" },
  },
}));
