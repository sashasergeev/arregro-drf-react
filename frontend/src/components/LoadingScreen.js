import React from "react";
import { Backdrop, CircularProgress, Typography } from "@mui/material";

export const Loading = () => {
  return (
    <Backdrop
      sx={{
        color: "#95969a",
        background: "#0e1114",
        flexDirection: "column",
        gap: "30px",
      }}
      open={true}
    >
      <CircularProgress sx={{ color: "#2ecd2d" }} size={50} />
      <Typography>Loading...</Typography>
    </Backdrop>
  );
};

export default Loading;
