import React, { useState, useRef } from "react";
import { Link } from "react-router-dom";
import axios from "axios";

import TextField from "@mui/material/TextField";
import { useSearchStyles } from "./styles";
import SearchStatus from "./SearchStatus";

const Search = () => {
  const classes = useSearchStyles();

  const searchRef = useRef("");
  const [show, setShow] = useState(false);
  const [results, setResults] = useState([]);
  const [isLoaded, setIsLoaded] = useState(true);
  const [isError, setIsError] = useState(false);

  const debounce = (cb, d) => {
    let timer;
    return (...args) => {
      if (timer) clearTimeout(timer);
      timer = setTimeout(() => {
        cb(args);
      }, d);
    };
  };

  const inputOnChange = debounce(async () => {
    const val = searchRef.current.value;
    setIsLoaded(true);
    try {
      if (val !== "") {
        const res = await axios.get(`api/coinsearch?query=${val}`);
        setIsError(false);
        setResults(res.data);
      } else {
        setResults([]);
      }
    } catch (error) {
      setIsError(true);
      console.log(error);
    } finally {
      setIsLoaded(true);
    }
  }, 1000);

  const inputOnFocus = () => setShow(true);

  const inputOnBlur = (e) => {
    if (!e.relatedTarget) {
      setShow(false);
      if (searchRef.current.value === "") setResults([]);
    }
  };

  return (
    <div className={classes.root}>
      <TextField
        onFocus={inputOnFocus}
        label="search"
        id="search"
        margin="normal"
        variant="outlined"
        onChange={inputOnChange}
        inputRef={searchRef}
        onBlur={inputOnBlur}
        autoComplete="off"
      />
      {show && (
        <div tabIndex="0" className={classes.dropdown}>
          {results.slice(0, 20).map((e) => {
            return (
              <Link key={e.id} to={`coins/coin?id=${e.id}`}>
                {e.name} - {e.ticker}
              </Link>
            );
          })}

          {/* Status block */}
          <SearchStatus
            resultLength={results.length}
            input={searchRef.current.value}
            isLoaded={isLoaded}
            isError={isError}
          />
        </div>
      )}
    </div>
  );
};

export default Search;
