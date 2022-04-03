import React from "react";
import PropTypes from "prop-types";

import PaginationMUI from "@mui/material/Pagination";
import { Grid } from "@mui/material";

import { useStyles } from "./styles";

const Pagination = ({ numOfPages, page, onChange }) => {
  const { root } = useStyles();
  return (
    <div>
      <Grid item xs={12} container>
        <div style={{ margin: "auto", textAlign: "center", padding: 5 }}>
          <PaginationMUI
            className={root}
            count={numOfPages}
            page={page}
            variant="outlined"
            shape="rounded"
            onChange={onChange}
            color="standard"
            size="large"
          />
        </div>
      </Grid>
    </div>
  );
};

Pagination.propTypes = {
  page: PropTypes.number,
  numOfPages: PropTypes.number,
  onChange: PropTypes.func,
};

export default Pagination;
