import axios from "axios";

export const fetchTagStat = async ({ queryKey }) => {
  const [key, param] = queryKey;
  let url = "api/tags/stat/";
  if (key === "tagStatByCoin") {
    url += `?coinid=${param}`;
  } else {
    url += param !== "ALL TIME" ? `?date=${param}` : "";
  }
  const data = await axios.get(url);
  return data;
};
