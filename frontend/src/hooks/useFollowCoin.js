import useSnackbarAlert from "../components/other/useSnackbarAlert";
import axios from "axios";

const useFollowCoin = () => {
  const snackbar = useSnackbarAlert();
  const follow = (token, coin_id, coins, setData, inx = null) => {
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

    axios
      .post("api/coins/following/", data, {
        headers: { Authorization: `Token ${token}` },
      })
      .then((res) => {
        if (inx !== null) {
          setData(items);
        } else {
          setData(!coins);
        }
        return snackbar.showSuccess(`You've ${res.data.status} the coin!`);
      })
      .catch((err) =>
        snackbar.showError("Some error has happend. Reload the page!")
      );
  };

  return { follow };
};

export default useFollowCoin;
