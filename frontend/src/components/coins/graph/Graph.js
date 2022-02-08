import React from "react";
import Plot from "react-plotly.js";
import * as dayjs from "dayjs";
import { Box } from "@mui/material";
import axios from "axios";

import useCommitsData from "./useCommitsData";

import { useQuery } from "react-query";

const Graph = ({ github, cg_id }) => {
  // get github activity
  const { isLoading, isError, commitsData } = useCommitsData(github);

  // date, price, volume
  // testcase - fontcommunity token
  const getDatePriceVolume = async () => {
    const url = `https://api.coingecko.com/api/v3/coins/${cg_id}/market_chart?vs_currency=usd&days=365&interval=daily`;
    return await axios.get(url);
  };
  const { data: datePriceVolume } = useQuery(
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
      t: 50,
      b: 50,
      r: 50,
      l: 50,
    },
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

  if (!isLoading && !isError) {
    data[2] = {
      type: "bar",
      name: "Github Activity",
      x: Object.keys(commitsData),
      y: Object.values(commitsData),
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
      <Plot
        data={data}
        useResizeHandler={true}
        style={{ width: "100%", height: "100%", maxWidth: "900px" }}
        layout={layout}
      />
    </Box>
  );
};

export default Graph;
