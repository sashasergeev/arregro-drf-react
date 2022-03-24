import React, { lazy, Suspense } from "react";
import { Box } from "@mui/material";

import PlotSkelet from "./PlotSkelet";
import useGraph from "../../../hooks/useGraph";

const Plot = lazy(() => import("react-plotly.js"));

const Graph = ({ github, cg_id }) => {
  const { isPriceLoading, layout, data } = useGraph(github, cg_id);
  return (
    <Box
      display={"flex"}
      m={2}
      justifyContent={"center"}
      alignItems={"center"}
      style={{ width: "auto" }}
    >
      <Suspense fallback={<PlotSkelet />}>
        {!isPriceLoading ? (
          <Plot
            data={data}
            useResizeHandler={true}
            style={{ width: "100%", height: "100%", maxWidth: "900px" }}
            layout={layout}
          />
        ) : (
          <PlotSkelet />
        )}
      </Suspense>
    </Box>
  );
};

export default Graph;
