import { styled } from "@mui/system";
import { Box, Button } from "@mui/material";

export const DateButton = styled(Button)(({ iscurr }) => ({
  fontWeight: "700",
  background: iscurr === "true" ? "#4642b9b3" : "#5d58a24a",
  color: "#ffffffd4",
  letterSpacing: "1px",
  "&:hover": {
    backgroundColor: "#3f588b1a",
    color: "white",
  },
}));

export const FilterBox = styled(Box)({
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  gap: "10px",
  margin: "0px 10px 20px",
});

export const TagBox = styled(Box)({
  display: "flex",
  flexDirection: "column",
  backgroundColor: "#5d58a2",
  borderRadius: "10px",
  margin: "10px",
});

export const TagDataBox = styled(Box)({
  padding: "10px",
  backgroundColor: "#0000ff40",
  borderRadius: "10px",
});

export const TagTitleBox = styled(Box)({
  textAlign: "center",
  margin: "10px",
});
