import axios from "axios";

export const fetchMovers = async () => await axios.get(`api/trending/`);
