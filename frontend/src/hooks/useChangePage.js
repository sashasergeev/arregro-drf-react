import { useState } from "react";
import { useHistory } from "react-router-dom";

const useChangePage = () => {
  /*
    Hook for managing paginated pages.
  */

  const history = useHistory();
  const [pageNum, setPageNum] = useState(1);

  const [page, setPage] = useState(history.location.state?.page ?? 1);

  const handlePage = (e, val) => setPage(val);

  return { page, setPage, handlePage, pageNum, setPageNum };
};

export default useChangePage;
