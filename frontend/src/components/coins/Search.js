import React, { useState, useEffect } from "react";
import { makeStyles } from "@material-ui/core/styles";
import TextField from "@material-ui/core/TextField";
import { Link } from "react-router-dom";
import axios from "axios";

const useStyles = makeStyles((theme) => ({
  root: {
    "& .MuiOutlinedInput-root": {
      margin: theme.spacing(1),
      width: "40vw",
    },
    "& .MuiInputBase-input": {
      color: "#dadada",
      fontFamily: "Quicksand, sans-serif",
    },
    "& .MuiInputBase-root": {
      fontFamily: "Quicksand, sans-serif",
    },
    "& .MuiOutlinedInput-notchedOutline": {
      borderColor: "rgb(139 0 239 / 33%)",
    },
    "& .MuiFormLabel-root": {
      color: "rgb(91 117 128)",
      fontFamily: "Quicksand, sans-serif",
    },
    display: "block",
    margin: "0 auto",
    fontFamily: "Quicksand, sans-serif",
    position: "relative",
  },
  dropdown: {
    "& a": {
      color: "white",
      display: "block",
      textDecoration: "none",
      padding: "5px 5px",
      "&:hover": {
        backgroundColor: "#a7a7a72e",
      },
    },
    position: "absolute",
    width: "100%",
    maxHeight: "200px",
    background: "#0e131c",
    zIndex: 100,
    top: "79px",
    right: "-9px",
    border: "1px solid rgb(139 0 239 / 33%)",
    overflow: "auto",
  },
}));

const Search = () => {
  const classes = useStyles();
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

  const inputOnChange = (e) => {
    setInput(e.target.value);
  };
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
    <div className={classes.root} style={{ width: "40vw" }}>
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
