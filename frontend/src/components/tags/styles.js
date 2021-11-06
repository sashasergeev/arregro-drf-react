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

export const TagContainer = styled(Box)({
  padding: 5,
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
});
export const TagListBox = styled(Box)({
  display: "flex",
  justifyContent: "center",
  flexWrap: "wrap",
  maxWidth: "1150px",
});

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
  width: "250px",
  backgroundColor: "#5d58a263",
  borderRadius: "10px",
  margin: "15px",
});

export const TagDataBox = styled(Box)({
  padding: "5px",
  backgroundColor: "#2a2b44db",
  borderRadius: "10px",
});
export const TagDataRow = styled(Box)({
  display: "flex",
  justifyContent: "space-between",
  padding: "5px 5px",
  backgroundColor: "#15181d54",
  borderRadius: "10px",
  margin: "7px 0px",
  color: "#dbdbda",
});

export const TagChangeBox = styled(Box)(({ side }) => ({
  fontWeight: "600",
  color: side === "+" ? "limegreen" : "rgb(245, 0, 87)",
}));

export const TagTitleBox = styled(Box)({
  textAlign: "center",
  margin: "10px",
  color: "#dbdbda",
});
