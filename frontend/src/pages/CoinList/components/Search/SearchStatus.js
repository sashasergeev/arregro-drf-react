import React from "react";

const divStyle = {
  textAlign: "center",
  color: "white",
  borderTop: "1px solid",
  padding: "10px 5px",
};

const SearchStatus = ({ resultLength, input, isLoaded, isError }) => {
  // conditions
  const isResultsMore20 = resultLength > 20;
  const isInputEmpty = input === "";
  const isResultsEmpty =
    !isInputEmpty && resultLength === 0 && isLoaded && !isError;

  return (
    <div style={divStyle}>
      {/* Long query */}
      {isResultsMore20 && (
        <>{resultLength - 20} more coins. Type in to filter it for you!!!</>
      )}
      {/* Empty search input */}
      {isInputEmpty && <>Start typing to search coins!</>}
      {/* Didnt't find a match */}
      {isResultsEmpty && <>Couldn't find anything. Change query!</>}
      {/* Some fetch Error */}
      {isError && (
        <>Some error has happend. Please reload the page if it persists.</>
      )}
    </div>
  );
};

export default SearchStatus;
