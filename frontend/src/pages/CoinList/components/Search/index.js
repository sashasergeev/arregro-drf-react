import React, { useState, useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import axios from "axios";

import TextField from "@mui/material/TextField";
import { useSearchStyles } from "./styles";

const Search = () => {
  const classes = useSearchStyles();

  const searchRef = useRef("");
  const [show, setShow] = useState(false);
  const [results, setResults] = useState([]);

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
    try {
      if (val !== "") {
        const res = await axios.get(`api/coinsearch?query=${val}`);
        setResults(res.data);
      } else {
        setResults([]);
      }
    } catch (error) {}
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
          {results.length > 20 && (
            <div
              style={{
                textAlign: "center",
                color: "gray",
                borderTop: "1px solid",
              }}
            >
              There is {results.length - 20} other coins. Type in to filter it
              for you!!!
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default Search;
