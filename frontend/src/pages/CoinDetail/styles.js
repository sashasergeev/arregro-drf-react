import makeStyles from "@mui/styles/makeStyles";
import { Box } from "@mui/material";

import { styled } from "@mui/material/styles";

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

export const useCoinStyles = makeStyles(() => ({
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
  backBtn: {
    fontWeight: "600",
    color: "black",
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
