import React from "react";

import { TextField } from "@mui/material";
import { styled } from "@mui/material/styles";

const Field = styled((props) => (
  <TextField variant="outlined" fullWidth margin="normal" required {...props} />
))(({ theme }) => ({
  "& label.Mui-focused": {
    color: "#adadad",
  },
  "& .MuiInputLabel-root": {
    color: "white",
  },
  "& .MuiOutlinedInput-input": {
    color: "#ceb3ff",
  },

  "& .MuiOutlinedInput-root": {
    transition: "0.2s",
    "& fieldset": {
      borderColor: "rgb(103 58 183 / 65%)",
    },
    "&:hover fieldset": {
      borderColor: "rgb(103 58 183)",
    },
    "&.Mui-focused fieldset": {
      borderColor: "#673ab7",
    },
  },
}));

export default Field;
