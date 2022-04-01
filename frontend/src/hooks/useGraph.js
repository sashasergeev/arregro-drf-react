import { useQuery } from "react-query";
import { getCommitsData, getDatePriceVolume } from "../api/coinGraph";
import dayjs from "dayjs";

const useGraph = (github, cg_id) => {
  /* 
    Fetching plot-related data and configuring 
    it for the plot.
  */

  // get github activity
  const { isSuccess, data: commitsData } = useQuery(
    ["commits", github],
    getCommitsData,
    {
      enabled: !!github,
      retry: false,
    }
  );

  // date, price, volume
  const { data: datePriceVolume, isLoading: isPriceLoading } = useQuery(
    ["coingecko data", cg_id],
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

  return {
    isPriceLoading,
    layout,
    data,
  };
};

export default useGraph;
