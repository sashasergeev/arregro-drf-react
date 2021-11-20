import { useEffect } from "react";

const useChangePage = (fetchFunc, skeletFunc, setPage, depList) => ({
  useEffect: useEffect(() => {
    if (depList.hasOwnProperty("isLoaded")) {
      // case when it need to have to know is user is auth
      if (depList.isLoaded) {
        fetchFunc();
      }
    } else {
      // case when it doesn't need to have to know whether user is auth or not
      fetchFunc();
    }
    return () => {
      // cleaning
      skeletFunc();
      window.scroll(0, 0);
    };
  }, [...Object.values(depList)]),
  handlePageChange: (e, val) => setPage(val),
});

export default useChangePage;
