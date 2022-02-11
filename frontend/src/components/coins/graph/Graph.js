import React from "react";
import Plot from "react-plotly.js";
import * as dayjs from "dayjs";

import { Box, Skeleton } from "@mui/material";

import axios from "axios";

import { useQuery } from "react-query";

const Graph = ({ github, cg_id }) => {
  // get github activity
  const getCommitsData = async () => {
    const url = `api/coins/gh_plot_data/${github}/`;
    return await axios.get(url);
  };
  const { isSuccess, data: commitsData } = useQuery(
    ["commits", github],
    getCommitsData,
    {
      enabled: !!github,
      retry: false,
    }
  );

  // date, price, volume
  const getDatePriceVolume = async () => {
    const url = `https://api.coingecko.com/api/v3/coins/${cg_id}/market_chart?vs_currency=usd&days=365&interval=daily`;
    return await axios.get(url);
  };
  const { data: datePriceVolume, isLoading: isPriceLoading } = useQuery(
    ["histPrices", cg_id],
    getDatePriceVolume
  );

  const dateData = datePriceVolume?.data.prices.map((e) =>
    dayjs(e[0]).format("YYYY-MM-DD")
  );
  const priceData = datePriceVolume?.data.prices.map((e) => e[1]);
  const volumeData = datePriceVolume?.data.total_volumes.map((e) => e[1]);

  const layout = {
    autosize: true,
    margin: {
      t: 20,
      b: 50,
      r: 20,
      l: 20,
    },
    font: { color: "#95969a" },
    yaxis: { domain: [0.35, 1] },
    xaxis: { anchor: "y3" },
    yaxis2: { domain: [0.2, 0.35] },
    yaxis3: { domain: [0, 0.2] },
    grid: {
      rows: 3,
      columns: 1,
    },
    paper_bgcolor: "#181b22",
    plot_bgcolor: "#121419",
    autosize: true,
    legend: {
      bgcolor: "black",
      orientation: "h",
    },
    xaxisTitle: "Date",
    hovermode: "x unified",
    showLegend: true,
  };

  const data = [
    {
      type: "scatter",
      name: "Price, $",
      x: dateData,
      y: priceData,
      mode: "lines&markers",
      marker: { color: "#2ecd2d" },
    },
    {
      type: "bar",
      name: "Volume, $",
      x: dateData,
      y: volumeData,
      xaxis: "x",
      yaxis: "y2",
      marker: { color: "#c21d51" },
    },
  ];

  if (isSuccess) {
    data[2] = {
      type: "bar",
      name: "Github Activity",
      x: Object.keys(commitsData.data),
      y: Object.values(commitsData.data),
      xaxis: "x",
      yaxis: "y3",
      marker: { color: "#31324c" },
    };
  }

  return (
    <Box
      display={"flex"}
      m={2}
      justifyContent={"center"}
      alignItems={"center"}
      style={{ width: "auto" }}
    >
      {!isPriceLoading ? (
        <Plot
          data={data}
          useResizeHandler={true}
          style={{ width: "100%", height: "100%", maxWidth: "900px" }}
          layout={layout}
        />
      ) : (
        <Skeleton
          sx={{ bgcolor: "black.200" }}
          variant="rectangular"
          animation="wave"
          style={{ width: "100%", maxWidth: "900px" }}
          height={450}
        />
      )}
    </Box>
  );
};

export default Graph;
