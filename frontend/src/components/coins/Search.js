import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import axios from "axios";

import TextField from "@material-ui/core/TextField";
import { useSearchStyles } from "./styles";

const Search = () => {
  const classes = useSearchStyles();
  const [input, setInput] = useState("");
  const [show, setShow] = useState(false);

  const [coins, setCoins] = useState([]);
  const [results, setResults] = useState([]);

  useEffect(() => {
    if (input.length === 0) {
      setResults(coins);
    } else {
      const regex = new RegExp(input, "i");
      setResults(
        coins.filter((e) => regex.test(e.name) || regex.test(e.ticker))
      );
      setShow(true);
    }
  }, [input]);

  const inputOnChange = (e) => setInput(e.target.value);
  const inputOnFocus = () => {
    if (coins.length === 0) {
      axios.get("api/coinsearch/").then((res) => {
        setCoins(res.data);
      });
    }
  };
  const inputOnBlur = (e) => {
    if (!e.relatedTarget) {
      setShow(false);
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
        value={input}
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
