import axios from "axios";

export const fetchTagStat = async ({ queryKey }) => {
  const [_, dateFilter] = queryKey;
  const url =
    dateFilter !== "ALL TIME"
      ? `api/tags/stat/?date=${dateFilter}`
      : "api/tags/stat/";
  const data = await axios.get(url);
  return data;
};
