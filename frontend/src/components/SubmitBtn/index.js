import React from "react";
import { LoadingButton } from "@mui/lab";
import { styled } from "@mui/material/styles";

const SumbitBtn = styled((props) => (
  <LoadingButton type="submit" fullWidth margin="normal" {...props} />
))(({ theme, loading }) => ({
  margin: theme.spacing(3, 0, 2),
  background: !loading ? "#673ab7" : "#9c27b096",
  color: "white",
  "&:hover": {
    backgroundColor: "#9c27b096",
  },
  "& .MuiLoadingButton-loadingIndicator": {
    color: "#ffffffb8",
  },
}));

export default SumbitBtn;
