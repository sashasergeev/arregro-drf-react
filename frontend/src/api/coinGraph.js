import axios from "axios";

export const getCommitsData = async ({ queryKey: github }) => {
  const url = `api/coins/gh_plot_data/${github[1]}/`;
  return await axios.get(url);
};

export const getDatePriceVolume = async ({ queryKey: cg_id }) => {
  const url = `https://api.coingecko.com/api/v3/coins/${cg_id[1]}/market_chart?vs_currency=usd&days=365&interval=daily`;
  return await axios.get(url);
};
