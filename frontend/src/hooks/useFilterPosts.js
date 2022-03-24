import { useState } from "react";

const useFilterPosts = (setPage) => {
  /* 
    Hook for filtering posts.
    Now used on main and feed pages.
  */

  const [filter, setFilter] = useState({
    tag: false,
    from: null,
    to: null,
  });

  const clearFilter = () =>
    setFilter({
      tag: false,
      from: null,
      to: null,
    });

  const handleFilter = (chosenTag, chosenFrom, chosenTo) => {
    const { tag, to, from } = filter;
    if (tag !== chosenTag || from !== chosenFrom || to !== chosenTo) {
      setFilter({
        tag: chosenTag,
        from: chosenFrom && chosenFrom.toJSON().split("T")[0],
        to: chosenTo && chosenTo.toJSON().split("T")[0],
      });
      setPage(1);
    }
  };

  return { filter, handleFilter, clearFilter };
};

export default useFilterPosts;
