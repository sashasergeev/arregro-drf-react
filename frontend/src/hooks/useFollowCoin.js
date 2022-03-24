import useSnackbarAlert from "../components/other/useSnackbarAlert";
import { followRequest } from "../api/coins";

const useFollowCoin = (setData, coins, token) => {
  /*
    Hook to allow follow/unfollow functionality on coinlist and 
      coindetal page
  */

  const snackbar = useSnackbarAlert();

  // const

  const makeFollow = async (data, items, inx) => {
    try {
      const res = await followRequest(data, token);
      if (inx !== null) {
        setData(items);
      } else {
        setData(!coins);
      }
      return snackbar.showSuccess(`You've ${res.data.status} the coin!`);
    } catch {
      return snackbar.showError("Some error has happend. Reload the page!");
    }
  };

  const follow = (coin_id, inx = null) => {
    // case for list
    let items, item, data;
    if (inx !== null) {
      // coinlist
      items = [...coins];
      item = { ...items[inx] };
      data = {
        coin_id: coin_id,
        action: item.doesUserFollow ? "unfollow" : "follow",
      };
      item.doesUserFollow = !item.doesUserFollow;
      items[inx] = item;
    } else {
      // coin detail
      data = {
        coin_id: coin_id,
        action: coins ? "unfollow" : "follow",
      };
    }

    // making request and set follow status of coin
    makeFollow(data, items, inx);
  };

  return follow;
};

export default useFollowCoin;
