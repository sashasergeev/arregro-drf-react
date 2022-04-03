import React from "react";
import { Skeleton } from "@mui/material";

const PlotSkelet = () => {
  return (
    <Skeleton
      sx={{ bgcolor: "black.200" }}
      variant="rectangular"
      animation="wave"
      style={{ width: "100%", maxWidth: "900px" }}
      height={450}
    />
  );
};

export default PlotSkelet;
