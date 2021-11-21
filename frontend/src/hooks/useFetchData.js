import axios from "axios";

import useFetchPosts from "./useFetchPosts";
import useFetchCoins from "./useFetchCoins";

const useFetchData = (
  url,
  dataType,
  setData,
  setNumOfPages,
  argsObj,
  setFollow
) => {
  const fetchPosts = useFetchPosts();
  const fetchCoins = useFetchCoins();

  const fetchData = async () => {
    let res;
    switch (dataType) {
      case "coin":
        res = await fetchCoins(url, ...Object.values(argsObj));
        setData(res.coins ? res.coins : res.coinInfo);
        if (setNumOfPages) {
          // case when paginated
          setNumOfPages(res.numOfPages);
        } else if (setFollow) {
          // detail page
          setFollow(argsObj.isAuth ? res.follow : undefined);
        }
        break;
      case "post":
        res = await fetchPosts(url, argsObj && argsObj.token);
        setData(res.cards);
        if (setNumOfPages) {
          setNumOfPages(res.numOfPages);
        }
        break;
      case "postModal":
        res = await axios.get(url);
        setData(res.data);
        break;
    }
    return res;
  };
  return fetchData;
};

export default useFetchData;
